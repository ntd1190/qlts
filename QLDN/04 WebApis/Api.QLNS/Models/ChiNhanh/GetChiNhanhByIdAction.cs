/*****************************************************************************
1. Create Date  : 2017.07.17
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/CHINHANH/LIST
4. Description  : THÔNG TIN CHI NHÁNH
5. History      : 2017.07.17 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.ChiNhanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.ChiNhanh
{
    public class GetChiNhanhByIdAction
    {
        #region PUBLIC
        public string fields { get; set; }
        public string ChiNhanhId { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _ChiNhanhId;
        private int _loginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            fields = Protector.String(fields, "");
            _ChiNhanhId = Protector.Int(ChiNhanhId, 0);
            _loginId = Protector.Int(loginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetChiNhanhByIdBiz(context);
                biz.FIELD = fields;
                biz.CHI_NHANH_ID = _ChiNhanhId;
                biz.LOGIN_ID = _loginId;

                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
    }
}
