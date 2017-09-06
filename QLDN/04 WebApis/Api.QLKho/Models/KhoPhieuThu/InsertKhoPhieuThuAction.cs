using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoPhieuThu
{
    public class InsertKhoPhieuThuAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu
    {

        #region public
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var PhieuThu = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu();
                PhieuThu.SoPhieu = SoPhieu;
                PhieuThu.KhachHangId = KhachHangId;
                PhieuThu.LyDo = LyDo;
                PhieuThu.NgayThu = NgayThu;
                PhieuThu.SoTien = SoTien;
                PhieuThu.SoTienBangChu = SoTienBangChu;
                PhieuThu.HinhThucThanhToan = HinhThucThanhToan;
                PhieuThu.NganHang = NganHang;
                PhieuThu.TaiKhoanCo = TaiKhoanCo;
                PhieuThu.TaiKhoanNo = TaiKhoanNo;
                PhieuThu.Hinh = Hinh;
                PhieuThu.GhiChu = GhiChu;
                PhieuThu.Hinh = Hinh;
                PhieuThu.NguoiNopTien = NguoiNopTien;
                PhieuThu.NguoiTao = NguoiTao;
                PhieuThu.NgayTao = DateTime.Now;
                PhieuThu.XoaYN = "N";
                PhieuThu.CtrVersion = 1;
                KhoPhieuThuRepository repo = new KhoPhieuThuRepository(context);
                await repo.Insert(PhieuThu);
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoPhieuThu", PhieuThu.PhieuThuId, "Insert", Protector.Int(NguoiTao));
                return returnActionResult(HttpStatusCode.OK, PhieuThu, null);
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
