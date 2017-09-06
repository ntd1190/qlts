/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOHANGSANXUAT/LIST
4. Description  : CẬP NHẬT THÔNG TIN HÃNG SẢN XUẤT
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Biz.QLKho.KhoHangSanXuat;
using SongAn.QLDN.Util.Common.CustomException;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoHangSanXuat
{
    public class UpdateKhoHangSanXuatAction : Entity.MSSQL_QLDN_QLNS.Entity.KhoHangSanXuat
    {
        #region PUBLIC
        public string LoginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new FormatException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateKhoHangSanXuatBiz(context);
                biz.LOGIN_ID = _LoginId;
                biz.HANG_SAN_XUAT_ID = HangSanXuatId;
                biz.MA_HANG_SAN_XUAT = MaHangSanXuat;
                biz.TEN_HANG_SAN_XUAT = TenHangSanXuat;
                biz.MO_TA = MoTa;

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
