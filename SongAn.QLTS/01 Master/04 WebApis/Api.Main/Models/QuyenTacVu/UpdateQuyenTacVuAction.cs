/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : cập nhật chức năng
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Data.Repository.QLTS_MAIN;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLTS.Api.Main.Models.QuyenTacVu
{
    public class UpdateQuyenTacVuAction
    {
        public string ChucNangId { get; set; }
        public string DSQuyenTacVu { get; set; }
        public string VaiTroId { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                /* kiểm tra input */
                var _error = validate();

                if (_error.code > 0)
                {
                    return returnActionError(HttpStatusCode.BadRequest, _error.message);
                }

                /* convert input */
                var _chucNangId = Protector.Int(ChucNangId);

                var repo = new QuyenTacVuRepository(context);
                var fields = new string[] {
                    nameof(Entity.QLTS_MAIN.Entity.QuyenTacVu.DSQuyenTacVu),
                };

                var chucNang = new Entity.QLTS_MAIN.Entity.QuyenTacVu();
                chucNang.VaiTroId = Protector.Int(VaiTroId);
                chucNang.ChucNangId = _chucNangId;
                chucNang.DSQuyenTacVu = DSQuyenTacVu;
                chucNang = await repo.UpdatePartial(chucNang, fields);

                if (chucNang == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy QuyenTacVuId '{0}'", _chucNangId));
                }

                return returnActionResult(HttpStatusCode.OK, chucNang, null);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private dynamic validate()
        {
            dynamic _error = new System.Dynamic.ExpandoObject();

            _error.code = 0;
            _error.message = string.Empty;

            var _chucNangId = Protector.Int(ChucNangId);

            if (_error.code == 0 && _chucNangId < 1)
            {
                _error.code = 1;
                _error.message = "ChucNangId is empty";
            }

            return _error;
        }

        #region helpers
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
        #endregion

    }
}