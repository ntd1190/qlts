
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
    public class UpdateNhanVienAction
    {
        #region public
        public string NhanVienId { get; set; }
        public string Ma { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public string CtrVersion { get; set; }
        #endregion

        #region private

        private int _nhanVienId;
        private int _CtrVersion;

        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var repo = new NhanVienRepository(context);

                var nhanvien = new Entity.QLKD.Entity.NhanVien();
                nhanvien.NhanVienId = _nhanVienId;
                nhanvien.Ma = Ma;
                nhanvien.Ho = Ho;
                nhanvien.Ten = Ten;
                nhanvien.CtrVersion = _CtrVersion;
                nhanvien = await repo.UpdatePartial(nhanvien,
                 nameof(Entity.QLKD.Entity.NhanVien.Ma),
                 nameof(Entity.QLKD.Entity.NhanVien.Ho),
                 nameof(Entity.QLKD.Entity.NhanVien.Ten)
                  );

                return returnActionResult(nhanvien, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        private void validate()
        {
            var _id = Protector.Int(NhanVienId);

            if (_id < 1)
            {
                throw new FormatException("NhanVienId is empty");
            }
        }

        private void init()
        {
            _nhanVienId = Protector.Int(NhanVienId);
            _CtrVersion = Protector.Int(CtrVersion);
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

        private ActionResultDto returnActionResult(object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = HttpStatusCode.OK;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }

    }
}