using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoPhieuChi
{
    public class InsertKhoPhieuChiAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi
    {

        #region public
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var PhieuChi = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi();
                PhieuChi.SoPhieu = SoPhieu;
                PhieuChi.KhachHangId = KhachHangId;
                PhieuChi.LyDo = LyDo;
                PhieuChi.NgayChi = NgayChi;
                PhieuChi.SoTien = SoTien;
                PhieuChi.SoTienBangChu = SoTienBangChu;
                PhieuChi.HinhThucThanhToan = HinhThucThanhToan;
                PhieuChi.NganHang = NganHang;
                PhieuChi.TaiKhoanCo = TaiKhoanCo;
                PhieuChi.TaiKhoanNo = TaiKhoanNo;
                PhieuChi.Hinh = Hinh;
                PhieuChi.GhiChu = GhiChu;
                PhieuChi.Hinh = Hinh;
                PhieuChi.NguoiNhanTien = NguoiNhanTien;
                PhieuChi.NguoiTao = NguoiTao;
                PhieuChi.NgayTao = DateTime.Now;
                PhieuChi.XoaYN = "N";
                PhieuChi.CtrVersion = 1;
                KhoPhieuChiRepository repo = new KhoPhieuChiRepository(context);
                await repo.Insert(PhieuChi);
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoPhieuChi", PhieuChi.PhieuChiId, "Insert", int.Parse(PhieuChi.NguoiTao.ToString()));
                return returnActionResult(HttpStatusCode.OK, PhieuChi, null);
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
