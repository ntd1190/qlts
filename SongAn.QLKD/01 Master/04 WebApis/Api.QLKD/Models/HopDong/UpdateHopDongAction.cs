using Newtonsoft.Json;
using SongAn.QLKD.Biz.QLKD.HopDong;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.HopDong
{
    public class UpdateHopDongAction 
    {
        #region public
        public virtual string USER_ID { get; set; }
        public virtual string NHANVIEN_ID { get; set; }
        public string phieuHopDong{ get; set; }
        public string listChiTiet { get; set; }
        #endregion

        #region private
        private Entity.QLKD.Entity.KDHopDong _phieuHopDong;
        private List<Entity.QLKD.Entity.KDHopDongChiTiet> _listChiTiet;
        #endregion

        #region init & validate
        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                var biz = new UpdateHopDongBiz(context);

                biz.HopDong = new Entity.QLKD.Entity.KDHopDong();
                biz.HopDong.HopDongId = Protector.Int(_phieuHopDong.HopDongId, 0);
                biz.HopDong.SoHopDong = Protector.String(_phieuHopDong.SoHopDong, "");
                biz.HopDong.TenHopDong = Protector.String(_phieuHopDong.TenHopDong, "");
                biz.HopDong.LoaiHopDongId = Protector.Int(_phieuHopDong.LoaiHopDongId, 0);
                biz.HopDong.NhanVienId = Protector.Int(_phieuHopDong.NhanVienId, 0);
                biz.HopDong.KhachHangId = Protector.Int(_phieuHopDong.KhachHangId, 0);
                biz.HopDong.NgayHopDong = Protector.DateTime(_phieuHopDong.NgayHopDong);
                biz.HopDong.NgayThanhLy = Protector.DateTime(_phieuHopDong.NgayThanhLy, true);
                biz.HopDong.SoTien = Protector.Decimal(_phieuHopDong.SoTien, 0);
                biz.HopDong.SoHoaDon = Protector.String(_phieuHopDong.SoHoaDon, "");
                biz.HopDong.NgayHoaDon = Protector.DateTime(_phieuHopDong.NgayHoaDon);
                biz.HopDong.ThanhToan = Protector.Int(_phieuHopDong.ThanhToan, 0);
                biz.HopDong.TyLe = Protector.Decimal(_phieuHopDong.TyLe, 0);
                biz.HopDong.Chi = Protector.String(_phieuHopDong.Chi, "");
                biz.HopDong.DuLieuId = Protector.Int(_phieuHopDong.DuLieuId, 0);
                biz.HopDong.NgayTao = Protector.DateTime(_phieuHopDong.NgayTao, true);
                biz.HopDong.CtrVersion = Protector.Int(_phieuHopDong.CtrVersion, 0);

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.USER_ID = Protector.Int(USER_ID);

                var result = await biz.Execute();
                var bizde = new DeleteHopDongChiTietBiz(context);
                bizde.HopDongId = _phieuHopDong.HopDongId.ToString();
                bizde.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                bizde.USER_ID = Protector.Int(USER_ID);
                await bizde.Execute();
                foreach (var item in _listChiTiet)
                {
                    var bizct = new InsertHopDongChiTietBiz(context);

                    bizct.HopDongChiTiet = new Entity.QLKD.Entity.KDHopDongChiTiet();
                    bizct.HopDongChiTiet.HopDongId = _phieuHopDong.HopDongId;
                    bizct.HopDongChiTiet.HangHoaId = item.HangHoaId;
                    bizct.HopDongChiTiet.LoaiHangHoa = item.LoaiHangHoa;
                    bizct.HopDongChiTiet.SoLuong = item.SoLuong;
                    bizct.HopDongChiTiet.DonGia = item.DonGia;
                    bizct.HopDongChiTiet.DaTrienKhai = item.DaTrienKhai;
                    bizct.HopDongChiTiet.NguoiGiao = item.NguoiGiao;
                    bizct.HopDongChiTiet.NguoiNhan = item.NguoiNhan;
                    bizct.HopDongChiTiet.NgayThucHien = item.NgayThucHien;
                    bizct.HopDongChiTiet.NgayKetThuc = item.NgayKetThuc;
                    bizct.HopDongChiTiet.GhiChu = item.GhiChu;
                    await bizct.Execute();
                }
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

        private void init()
        {
            var __phieuHopDong = JsonConvert.DeserializeObject<dynamic>(phieuHopDong);

            phieuHopDong = JsonConvert.SerializeObject(__phieuHopDong);
            _phieuHopDong = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDHopDong>(phieuHopDong);

            //////////////////////////////////////////////////////////////////////////

            var __phieuKiemKeChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuKiemKeChiTiet)
            {
                if (item.NgayThucHien != null && item.NgayThucHien != "") item.NgayThucHien = DateTime.ParseExact(item.NgayThucHien.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                if (item.NgayKetThuc != null && item.NgayKetThuc != "") item.NgayKetThuc = DateTime.ParseExact(item.NgayKetThuc.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            }

            listChiTiet = JsonConvert.SerializeObject(__phieuKiemKeChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.KDHopDongChiTiet>>(listChiTiet);



        }
    }
}
