/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : lấy thông tin chức năng
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Data.Repository.QLKD_MAIN;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.Main.Models.ChucNang
{
    public class GetChucNangByIdAction
    {
        #region public
        public string ChucNangId { get; set; }
        public string MaChucNang { get; set; }
        #endregion
        #region private
        private int _ChucNangId;
        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                init();
                validate();

                var repo = new ChucNangRepository(context);
                var chucNang = await repo.GetById(_ChucNangId);

                if (chucNang == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy ChucNangId '{0}'", _ChucNangId));
                }

                return returnActionResult(HttpStatusCode.OK, chucNang, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }


        private void init()
        {
            _ChucNangId = Protector.Int(ChucNangId);
        }

        private void validate()
        {
            if (_ChucNangId < 1)
            {
                throw new FormatException("ChucNangId không hợp lệ");
            }
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