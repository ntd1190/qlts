
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class GetNhanVienByIdAction
    {
        public string id { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                /* kiểm tra input */
                var _error = validate();

                if (_error.code > 0)
                {
                    return returnActionError(HttpStatusCode.BadRequest, _error.message);
                }

                /* convert input */
                var _id = Protector.Int(id);

                var repo = new NhanVienRepository(context);
                var nhanvien = await repo.GetById(_id);

                if (nhanvien == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NhanVienId '{0}'", _id));
                }

                return returnActionResult(HttpStatusCode.OK, nhanvien, null);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();
            _result.ReturnCode = code;

            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };

            return _result;
        }

        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }

        private dynamic validate()
        {
            dynamic _error = new System.Dynamic.ExpandoObject();

            _error.code = 0;
            _error.message = string.Empty;

            var _id = Protector.Int(id);

            if (_error.code == 0 && _id < 1)
            {
                _error.code = 1;
                _error.message = "NhanVienId is empty";
            }

            return _error;
        }
    }
}