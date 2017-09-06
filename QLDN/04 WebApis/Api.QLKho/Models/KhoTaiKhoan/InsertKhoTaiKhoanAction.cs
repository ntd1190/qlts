using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoTaiKhoan
{
    public class InsertKhoTaiKhoanAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoTaiKhoan
    {

        #region public
        /*public string MaKhoTaiKhoan { get; set; }
        public string TenKhoTaiKhoan { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var taikhoan = new Entity.MSSQL_QLDN_QLNS.Entity.KhoTaiKhoan();
                taikhoan.TenTaiKhoan = TenTaiKhoan;
                taikhoan.MaTaiKhoan = MaTaiKhoan;
                taikhoan.GhiChu = GhiChu;
                taikhoan.NguoiTao = NguoiTao;
                taikhoan.NgayTao = DateTime.Now;
                taikhoan.XoaYN = "N";
                taikhoan.CtrVersion = 1;
                KhoTaiKhoanRepository repo = new KhoTaiKhoanRepository(context);
                await repo.Insert(taikhoan);

                return returnActionResult(HttpStatusCode.OK, taikhoan, null);
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
