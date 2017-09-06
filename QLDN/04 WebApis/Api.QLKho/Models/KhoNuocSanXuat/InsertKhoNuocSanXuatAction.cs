using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoNuocSanXuat
{
    public class InsertKhoNuocSanXuatAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoNuocSanXuat
    {

        #region public
        /*public string MaKhoNuocSanXuat { get; set; }
        public string TenKhoNuocSanXuat { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var nuocsx = new Entity.MSSQL_QLDN_QLNS.Entity.KhoNuocSanXuat();
                nuocsx.MaNuoc = MaNuoc;
                nuocsx.TenNuoc = TenNuoc;
                nuocsx.MoTa = MoTa;
                nuocsx.NguoiTao = NguoiTao;
                nuocsx.NgayTao = DateTime.Now;
                nuocsx.XoaYN = "N";
                KhoNuocSanXuatRepository repo = new KhoNuocSanXuatRepository(context);
                await repo.Insert(nuocsx);

                return returnActionResult(HttpStatusCode.OK, nuocsx, null);
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
