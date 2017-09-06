/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOHANGSANXUAT/LIST
4. Description  : XÓA THÔNG TIN HÃNG SẢN XUẤT
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLKho.KhoHangSanXuat;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoHangSanXuat
{
    public class DeleteKhoHangSanXuatAction
    {
        #region public
        public string HangSanXuatId { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private int _HangSanXuatId;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _HangSanXuatId = Protector.Int(HangSanXuatId, 0);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();


                var biz = new DeleteKhoHangSanXuatBiz(context);

                biz.HANG_SAN_XUAT_ID = _HangSanXuatId;

                var result = await biz.Execute();

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "KhoHangSanXuat", _HangSanXuatId, "Delete", _LoginId);

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
