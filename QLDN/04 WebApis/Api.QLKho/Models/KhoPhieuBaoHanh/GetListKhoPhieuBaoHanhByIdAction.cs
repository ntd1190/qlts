/*****************************************************************************
1. Create Date  : 2017.07.27
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUBAOHANH/LIST
4. Description  : DANH SÁCH PHIẾU BẢO HÀNH
5. History      : 2017.07.27 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLKho.KhoPhieuBaoHanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuBaoHanh
{
    public class GetListKhoPhieuBaoHanhByIdAction
    {

        #region PUBLIC
        public string phieuBaoHanhId { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        private int _phieuBaoHanhId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(loginId, 0);
            _phieuBaoHanhId = Protector.Int(phieuBaoHanhId, 0);
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

                var biz = new GetListKhoPhieuBaoHanhByIdBiz(context);
                biz.PHIEUBAOHANH_IDS = _phieuBaoHanhId.ToString();
                biz.LOGIN_ID = _LoginId;

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

        #region HELPERS

        #endregion
    }
}
