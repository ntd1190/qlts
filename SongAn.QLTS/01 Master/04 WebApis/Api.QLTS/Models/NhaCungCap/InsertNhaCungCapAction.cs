
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NhaCungCap
{
    public class InsertNhaCungCapAction : SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap
    {

        #region public
        /*public string MaNhaCungCap { get; set; }
        public string TenNhaCungCap { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NhaCungCap = new SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap();
                NhaCungCap.MaNhaCungCap = MaNhaCungCap;
                NhaCungCap.TenNhaCungCap = TenNhaCungCap;
                NhaCungCap.Nhom = Nhom;
                NhaCungCap.DaiDien = DaiDien;
                NhaCungCap.DienThoai = DienThoai;
                NhaCungCap.DiDong = DiDong;
                NhaCungCap.MaSoThue = MaSoThue;
                NhaCungCap.TKNganHang = TKNganHang;
                NhaCungCap.TenNganHang = TenNganHang;
                NhaCungCap.DiaChi = DiaChi;
                NhaCungCap.GhiChu = GhiChu;
                NhaCungCap.CoSoId = CoSoId;
                NhaCungCap.NguoiTao = NguoiTao;
                NhaCungCap.NgayTao = DateTime.Now;
                NhaCungCap.CtrVersion = 1;
                NhaCungCapRepository repo = new NhaCungCapRepository(context);
                await repo.Insert(NhaCungCap);

                return returnActionResult(HttpStatusCode.OK, NhaCungCap, null);
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
            if (string.IsNullOrEmpty(MaNhaCungCap))
            {
                throw new FormatException("MaNhaCungCap không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenNhaCungCap))
            {
                throw new FormatException("MaNhaCungCap không hợp lệ");
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
