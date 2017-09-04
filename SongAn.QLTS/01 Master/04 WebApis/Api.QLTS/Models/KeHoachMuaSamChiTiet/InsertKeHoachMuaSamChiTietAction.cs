
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSamChiTiet
{
    public class InsertKeHoachMuaSamChiTietAction : SongAn.QLTS.Entity.QLTS.Entity.KeHoachMuaSamChiTiet
    {

        #region public
        /*public string MaKeHoachMuaSamChiTiet { get; set; }
        public string TenKeHoachMuaSamChiTiet { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var KeHoachMuaSamChiTiet = new SongAn.QLTS.Entity.QLTS.Entity.KeHoachMuaSamChiTiet();
                KeHoachMuaSamChiTiet.MuaSamId = MuaSamId;
                KeHoachMuaSamChiTiet.TenTaiSan = TenTaiSan;
                KeHoachMuaSamChiTiet.LoaiId = LoaiId;
                KeHoachMuaSamChiTiet.PhuongThucId = PhuongThucId;
                KeHoachMuaSamChiTiet.DonViTinh = DonViTinh;
                KeHoachMuaSamChiTiet.MoTa = MoTa;
                KeHoachMuaSamChiTiet.Ngay = Ngay;
                KeHoachMuaSamChiTiet.SoLuong = SoLuong;
                KeHoachMuaSamChiTiet.DonGia = DonGia;
                KeHoachMuaSamChiTiet.HinhThucId = HinhThucId;
                KeHoachMuaSamChiTiet.DuToan = DuToan;
                KeHoachMuaSamChiTiet.GhiChu = GhiChu;
                KeHoachMuaSamChiTietRepository repo = new KeHoachMuaSamChiTietRepository(context);
                await repo.Insert(KeHoachMuaSamChiTiet);

                return returnActionResult(HttpStatusCode.OK, KeHoachMuaSamChiTiet, null);
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

        private void validate() {  }

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
