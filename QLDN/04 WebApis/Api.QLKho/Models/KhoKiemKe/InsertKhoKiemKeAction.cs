using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;

namespace SongAn.QLDN.Api.QLKho.Models.KhoKiemKe
{
    public class InsertKhoKiemKeAction : Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe
    {

        #region public
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var KiemKe = new Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe();
                KiemKe.TieuDe = TieuDe;
                KiemKe.KhoHangId = KhoHangId;
                KiemKe.Hinh = Hinh;
                KiemKe.TrangThai = TrangThai;
                KiemKe.NguoiTao = NguoiTao;
                KiemKe.NgayTao = NgayTao;
                KiemKe.XoaYN = "N";
                KiemKe.CtrlVersion   = 1;
                KiemKe.TruongBanTen = TruongBanTen;
                KiemKe.TruongBanChucVu = TruongBanChucVu;
                KiemKe.TruongBanDaiDien = TruongBanDaiDien;
                KiemKe.UyVienTen = UyVienTen;
                KiemKe.UyVienChucVu = UyVienChucVu;
                KiemKe.UyVienDaiDien = UyVienDaiDien;
                KiemKe.UyVienTen2 = UyVienTen2;
                KiemKe.UyVienChucVu2 = UyVienChucVu2;
                KiemKe.UyVienDaiDien2 = UyVienDaiDien2;

                KhoKiemKeRepository repo = new KhoKiemKeRepository(context);
                await repo.Insert(KiemKe);
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoKiemKe", KiemKe.KiemKeId, "Insert", int.Parse(KiemKe.NguoiTao.ToString()));
                return returnActionResult(HttpStatusCode.OK, KiemKe, null);
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
