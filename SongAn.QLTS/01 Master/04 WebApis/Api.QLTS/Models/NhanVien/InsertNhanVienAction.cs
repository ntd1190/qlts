
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NhanVien
{
    public class InsertNhanVienAction : SongAn.QLTS.Entity.QLTS.Entity.NhanVien
    {

        #region public
        /*public string MaNhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NhanVien = new SongAn.QLTS.Entity.QLTS.Entity.NhanVien();
                NhanVien.MaNhanVien = MaNhanVien;
                NhanVien.TenNhanVien = TenNhanVien;
                NhanVien.PhongBanId = PhongBanId;
                NhanVien.DienThoai = DienThoai;
                NhanVien.ChucDanh = ChucDanh;
                NhanVien.Email = Email;
                NhanVien.DiaChi = DiaChi;
                NhanVien.GhiChu = GhiChu;
                NhanVien.NguoiTao = NguoiTao;
                NhanVien.NgayTao = DateTime.Now;
                NhanVien.CtrVersion = 1;
                NhanVienRepository repo = new NhanVienRepository(context);
                await repo.Insert(NhanVien);

                return returnActionResult(HttpStatusCode.OK, NhanVien, null);
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

        private void init() { }

        private void validate()
        {
            if (string.IsNullOrEmpty(MaNhanVien))
            {
                throw new FormatException("MaNhanVien không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenNhanVien))
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
