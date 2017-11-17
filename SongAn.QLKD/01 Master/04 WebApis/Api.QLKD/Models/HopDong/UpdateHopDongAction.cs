using SongAn.QLKD.Biz.QLKD.HopDong;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.HopDong
{
    public class UpdateHopDongAction : Entity.QLKD.Entity.KDHopDong
    {
        #region public
        public virtual string USER_ID { get; set; }
        public virtual string NHANVIEN_ID { get; set; }
        public virtual string FUNCTIONCODE { get; set; }
        #endregion

        #region private
        #endregion

        #region init & validate
        private void init() { }
        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var biz = new UpdateHopDongBiz(context);

                biz.HopDong = new Entity.QLKD.Entity.KDHopDong();
                biz.HopDong.HopDongId = Protector.Int(HopDongId, 0);
                biz.HopDong.SoHopDong = Protector.String(SoHopDong, "");
                biz.HopDong.TenHopDong = Protector.String(TenHopDong, "");
                biz.HopDong.LoaiHopDongId = Protector.Int(LoaiHopDongId, 0);
                biz.HopDong.NhanVienId = Protector.Int(NhanVienId, 0);
                biz.HopDong.KhachHangId = Protector.Int(KhachHangId, 0);
                biz.HopDong.NgayHopDong = Protector.DateTime(NgayHopDong);
                biz.HopDong.NgayThanhLy = Protector.DateTime(NgayThanhLy, true);
                biz.HopDong.SoTien = Protector.Decimal(SoTien, 0);
                biz.HopDong.SoHoaDon = Protector.String(SoHoaDon, "");
                biz.HopDong.NgayHoaDon = Protector.DateTime(NgayHoaDon);
                biz.HopDong.ThanhToan = Protector.Int(ThanhToan, 0);
                biz.HopDong.TyLe = Protector.Decimal(TyLe, 0);
                biz.HopDong.Chi = Protector.String(Chi, "");
                biz.HopDong.DuLieuId = Protector.Int(DuLieuId, 0);
                biz.HopDong.NgayTao = Protector.DateTime(NgayTao, true);
                biz.HopDong.CtrVersion = Protector.Int(CtrVersion, 0);

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.USER_ID = Protector.Int(USER_ID);
                biz.FUNCTIONCODE = Protector.String(FUNCTIONCODE, "");

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }

        }
    }
}
