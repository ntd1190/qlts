using Newtonsoft.Json;
using SongAn.QLKD.Biz.QLKD.KhachHang;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.KhachHang
{
    public class InsertKhachHangAction
    {
        #region public
        public string khachHang { get; set; }
        public string userId { get; set; }
        #endregion

        #region private
        private Entity.QLKD.Entity.KDKhachHang _khachHang;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizKhachHang = new InsertKhachHangBiz(context);

                bizKhachHang.MaKhachHang = Protector.String(_khachHang.MaKhachHang);
                bizKhachHang.NhomKhachHangId = Protector.Int(_khachHang.NhomKhachHangId);
                bizKhachHang.TenKhachHang = Protector.String(_khachHang.TenKhachHang);
                bizKhachHang.NgaySinh = _khachHang.NgaySinh;
                bizKhachHang.GioiTinh = Protector.Int(_khachHang.GioiTinh);
                bizKhachHang.HinhAnh = Protector.String(_khachHang.HinhAnh);
                bizKhachHang.SoNha = Protector.String(_khachHang.SoNha);
                bizKhachHang.TinhThanhPhoId = _khachHang.TinhThanhPhoId;
                bizKhachHang.QuanHuyenId =_khachHang.QuanHuyenId;
                bizKhachHang.PhuongXaId = _khachHang.PhuongXaId;
                bizKhachHang.DienThoai = Protector.String(_khachHang.DienThoai);
                bizKhachHang.FaceBook = Protector.String(_khachHang.FaceBook);
                bizKhachHang.Email = Protector.String(_khachHang.Email);
                bizKhachHang.NgheNghiep = Protector.String(_khachHang.NgheNghiep);
                bizKhachHang.CoQuan = Protector.String(_khachHang.CoQuan);
                bizKhachHang.MaSoThue = Protector.String(_khachHang.MaSoThue);
                bizKhachHang.EmailCoQuan = Protector.String(_khachHang.EmailCoQuan);
                bizKhachHang.Fax = Protector.String(_khachHang.Fax);
                bizKhachHang.DiaChiCoQuan = Protector.String(_khachHang.DiaChiCoQuan);
                bizKhachHang.NgayThanhLap = _khachHang.NgayThanhLap;
                bizKhachHang.TheoDoi = Protector.String(_khachHang.TheoDoi);
                bizKhachHang.Khac = Protector.String(_khachHang.Khac);
                bizKhachHang.NguoiPhuTrach = Protector.String(_khachHang.NguoiPhuTrach);
                bizKhachHang.CachLamViec = Protector.String(_khachHang.CachLamViec);
                bizKhachHang.TinhCach = Protector.String(_khachHang.TinhCach);
                bizKhachHang.SoThich = Protector.String(_khachHang.SoThich);
                bizKhachHang.ThoiQuen = Protector.String(_khachHang.ThoiQuen);
                bizKhachHang.GhiChu = Protector.String(_khachHang.GhiChu);
                bizKhachHang.NguoiTao = Protector.String(_khachHang.NguoiTao);
                bizKhachHang.UserId = Protector.String(userId);
                

                IEnumerable<dynamic> KhachHangIdINum = await bizKhachHang.Execute();


                return returnActionResult(HttpStatusCode.OK, KhachHangIdINum, null);
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
            var __khachHang = JsonConvert.DeserializeObject<dynamic>(khachHang);
            __khachHang.NgaySinh = !String.IsNullOrEmpty(__khachHang.NgaySinh) ? DateTime.ParseExact(__khachHang.NgaySinh.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd"): __khachHang.NgaySinh;
            __khachHang.NgayThanhLap = !String.IsNullOrEmpty(__khachHang.NgayThanhLap) ? DateTime.ParseExact(__khachHang.NgayThanhLap.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd") : __khachHang.NgayThanhLap;
            khachHang = JsonConvert.SerializeObject(__khachHang);
            _khachHang = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDKhachHang>(khachHang);
        }

        private void validate()
        {

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
