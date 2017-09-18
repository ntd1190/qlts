using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using SongAn.QLTS.Util.Common.Helper;
using System.Globalization;
using SongAn.QLTS.Data.Repository.QLTS_MAIN;

namespace SongAn.QLTS.Api.QLTS.Models.NguoiDung
{
    public class InsertNguoiDungAction
    {
        public string MaNguoiDung { get; set; }
        public string HoTen { get; set; }
        public string VaiTroId { get; set; }
        public string NhanVienId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string DienThoai { get; set; }
        public string NguoiTao { get; set; }
        public int CoSoId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var nguoidung = new Entity.QLTS_MAIN.Entity.NguoiDung();
                nguoidung.MaNguoiDung = MaNguoiDung;
                nguoidung.HoTen = HoTen;
                nguoidung.VaiTroId = Protector.Int(VaiTroId);
                nguoidung.NhanVienId = Protector.Int(NhanVienId);
                nguoidung.Email = Email;
                nguoidung.PasswordHash = HashHelper.getHashSha256(PasswordHash);
                nguoidung.DienThoai = DienThoai;
                nguoidung.CoSoId = CoSoId;
                nguoidung.NguoiTao = NguoiTao;
                nguoidung.NgayTao = DateTime.Now;
                nguoidung.CtrVersion = 1;
                nguoidung.UserName = Email;
                NguoiDungRepository repo = new NguoiDungRepository(context);
                repo.Insert(nguoidung);

                return returnActionResult(HttpStatusCode.OK, nguoidung, null);
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
