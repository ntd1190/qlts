
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.KhachHang
{
    public class InsertKhachHangAction : SongAn.QLTS.Entity.QLTS.Entity.KhachHang
    {

        #region public
        /*public string MaKhachHang { get; set; }
        public string TenKhachHang { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var KhachHang = new SongAn.QLTS.Entity.QLTS.Entity.KhachHang();
                KhachHang.MaKhachHang = MaKhachHang;
                KhachHang.TenKhachHang = TenKhachHang;
                KhachHang.DienThoai = DienThoai;
                KhachHang.DiDong = DiDong;
                KhachHang.MaSoThue = MaSoThue;
                KhachHang.TKNganHang = TKNganHang;
                KhachHang.TenNganHang = TenNganHang;
                KhachHang.DiaChi = DiaChi;
                KhachHang.CoSoId = CoSoId;
                KhachHang.NguoiTao = NguoiTao;
                KhachHang.NgayTao = DateTime.Now;
                KhachHang.CtrVersion = 1;
                KhachHangRepository repo = new KhachHangRepository(context);
                await repo.Insert(KhachHang);

                return returnActionResult(HttpStatusCode.OK, KhachHang, null);
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
            if (string.IsNullOrEmpty(MaKhachHang))
            {
                throw new FormatException("MaKhachHang không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenKhachHang))
            {
                throw new FormatException("MaKhachHang không hợp lệ");
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
