
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Biz.QLTS.NhanVien;
using Newtonsoft.Json;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;

namespace  SongAn.QLTS.Api.QLTS.Models.NhanVien
{
    public class InsertNhanVienAction
    {

        #region public
        public string nhanVien { get; set; }
        public string phongBanId { get; set; }
        public string coSoId { get; set; }
        #endregion

        #region private
        private Entity.QLTS.Entity.NhanVien _nhanVien;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizNhanVien = new InsertNhanVienBiz(context);

                bizNhanVien.MaNhanVien = Protector.String(_nhanVien.MaNhanVien);
                bizNhanVien.TenNhanVien = Protector.String(_nhanVien.TenNhanVien);
                bizNhanVien.DienThoai = Protector.String(_nhanVien.DienThoai);
                bizNhanVien.ChucDanh = Protector.String(_nhanVien.ChucDanh);
                bizNhanVien.Email = Protector.String(_nhanVien.Email);
                bizNhanVien.DiaChi = Protector.String(_nhanVien.DiaChi);
                bizNhanVien.GhiChu = Protector.String(_nhanVien.GhiChu);
                bizNhanVien.NguoiTao = Protector.Int(_nhanVien.NguoiTao);
                bizNhanVien.CoSoId = Protector.Int(coSoId);
                bizNhanVien.PhongBanId = Protector.String(phongBanId);

                IEnumerable<dynamic> NhanVienIdINum = await bizNhanVien.Execute();
                //var NhanVien = new SongAn.QLTS.Entity.QLTS.Entity.NhanVien();
                //NhanVien.MaNhanVien = MaNhanVien;
                //NhanVien.TenNhanVien = TenNhanVien;
                //NhanVien.PhongBanId = PhongBanId;
                //NhanVien.DienThoai = DienThoai;
                //NhanVien.ChucDanh = ChucDanh;
                //NhanVien.Email = Email;
                //NhanVien.DiaChi = DiaChi;
                //NhanVien.GhiChu = GhiChu;
                //NhanVien.NguoiTao = NguoiTao;
                //NhanVien.NgayTao = DateTime.Now;
                //NhanVien.CtrVersion = 1;
                //NhanVienRepository repo = new NhanVienRepository(context);
                //await repo.Insert(NhanVien);

                return returnActionResult(HttpStatusCode.OK, NhanVienIdINum, null);
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
            var __nhanvien = JsonConvert.DeserializeObject<dynamic>(nhanVien);
            nhanVien = JsonConvert.SerializeObject(__nhanvien);
            _nhanVien = JsonConvert.DeserializeObject<Entity.QLTS.Entity.NhanVien>(nhanVien);
        }

        private void validate()
        {
            if (string.IsNullOrEmpty(_nhanVien.MaNhanVien))
            {
                throw new FormatException("MaNhanVien không hợp lệ");
            }
            if (string.IsNullOrEmpty(_nhanVien.TenNhanVien))
            {
                throw new FormatException("MaNhanVien không hợp lệ");
            }
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
