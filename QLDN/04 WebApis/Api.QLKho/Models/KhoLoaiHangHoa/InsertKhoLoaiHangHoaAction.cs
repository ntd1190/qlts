using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLDN.Util.Common.Helper;

namespace SongAn.QLDN.Api.QLKho.Models.KhoLoaiHangHoa
{
    public class InsertKhoLoaiHangHoaAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoLoaiHangHoa
    {

        #region public
        /*public string MaKhoLoaiHangHoa { get; set; }
        public string TenKhoLoaiHangHoa { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        private void init() { }

        private void validate() { }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var loaihang = new Entity.MSSQL_QLDN_QLNS.Entity.KhoLoaiHangHoa();
                loaihang.MaLoai = MaLoai;
                loaihang.TenLoai = TenLoai;
                loaihang.MoTa = MoTa;
                loaihang.NguoiTao = NguoiTao;
                loaihang.NgayTao = DateTime.Now;
                loaihang.XoaYN = "N";
                KhoLoaiHangHoaRepository repo = new KhoLoaiHangHoaRepository(context);
                await repo.Insert(loaihang);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, loaihang, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region helpers
        #endregion
    }
}
