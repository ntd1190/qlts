/*****************************************************************************
1. Create Date  : 2017.07.31
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : 
5. History      : 2017.07.31 (NGUYỄN THANH BÌNH) - Tao moi
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
    public class DeleteChiTietAction
    {

        #region PUBLIC
        public virtual string PhieuBaoHanhChiTietId { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _PhieuBaoHanhChiTietId;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _PhieuBaoHanhChiTietId = Protector.Int(PhieuBaoHanhChiTietId, 0);
            _LoginId = Protector.Int(loginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_PhieuBaoHanhChiTietId == 0)
            {
                throw new BaseException("Không tìm thấy chi tiết phiếu bảo hành");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new DeleteChiTietBiz(context);
                biz.PhieuBaoHanhChiTietId = _PhieuBaoHanhChiTietId;
                biz.LOGIN_ID = _LoginId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

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
