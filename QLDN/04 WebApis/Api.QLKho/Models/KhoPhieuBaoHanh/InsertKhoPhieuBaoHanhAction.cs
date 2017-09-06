/*****************************************************************************
1. Create Date  : 2017.07.27
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUBAOHANH/LIST
4. Description  : DANH SÁCH PHIẾU BẢO HÀNH
5. History      : 2017.07.27 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
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
    public class InsertKhoPhieuBaoHanhAction : Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuBaoHanh
    {

        #region PUBLIC
        public string loginId { get; set; }
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
            _LoginId = Protector.Int(loginId, 0);
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

                var biz = new InsertKhoPhieuBaoHanhBiz(context);
                biz.SeriesNo = SeriesNo;
                biz.SoPhieu = SoPhieu;
                biz.TenKhachHang = TenKhachHang;
                biz.DienThoai = DienThoai;
                biz.TenThietBi = TenThietBi;
                biz.HangSanXuat = HangSanXuat;
                biz.NgayHen = NgayHen;
                biz.ChuanDoan = ChuanDoan;
                biz.YeuCauKhachHang = YeuCauKhachHang;
                biz.PhuKienKemTheo = PhuKienKemTheo;
                biz.TrangThaiTiepNhan = TrangThaiTiepNhan;
                biz.SanPhamCty = SanPhamCty;
                biz.LOGIN_ID = _LoginId;

                var result = await biz.Execute();
                if (String.IsNullOrEmpty(biz.MESSAGE))
                {
                    var ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoPhieuBaoHanh", result.FirstOrDefault().PhieuBaoHanhId, "Insert", _LoginId);
                }
                else
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
