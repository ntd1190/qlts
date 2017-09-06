/*****************************************************************************
1. Create Date  : 2017.06.19
2. Creator      : NGUYỄN NGOC TÂN
3. Function     : QLDNKHO/KHOPHIEUCHUYEN/LIST
4. Description  : CHI TIẾT PHIẾU NHẬP
5. History      : 2017.06.19 (NGUYỄN NGOC TÂN) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLKho.KhoPhieuChuyen;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuChuyen
{
    public class DeleteListChiTietByPhieuChuyenIdAction
    {

        #region PUBLIC
        public string phieuNhapId { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        private int _phieuNhapId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _phieuNhapId = Protector.Int(phieuNhapId, 0);
            _LoginId = Protector.Int(loginId, 0);

        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new BaseException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new DeleteListChiTietByPhieuChuyenIdBiz(context);
                biz.PHIEUCHUYENID = _phieuNhapId;
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
