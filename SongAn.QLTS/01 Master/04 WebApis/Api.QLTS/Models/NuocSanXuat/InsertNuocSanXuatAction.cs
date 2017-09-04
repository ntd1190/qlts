
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NuocSanXuat
{
    public class InsertNuocSanXuatAction : SongAn.QLTS.Entity.QLTS.Entity.NuocSanXuat
    {

        #region public
        /*public string MaNuocSanXuat { get; set; }
        public string TenNuocSanXuat { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NuocSanXuat = new SongAn.QLTS.Entity.QLTS.Entity.NuocSanXuat();
                NuocSanXuat.MaNuocSanXuat = MaNuocSanXuat;
                NuocSanXuat.TenNuocSanXuat = TenNuocSanXuat;
                NuocSanXuat.GhiChu = GhiChu;
                NuocSanXuat.NguoiTao = NguoiTao;
                NuocSanXuat.NgayTao = DateTime.Now;
                NuocSanXuat.CtrVersion = 1;
                NuocSanXuatRepository repo = new NuocSanXuatRepository(context);
                await repo.Insert(NuocSanXuat);

                return returnActionResult(HttpStatusCode.OK, NuocSanXuat, null);
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
            if (string.IsNullOrEmpty(MaNuocSanXuat))
            {
                throw new FormatException("MaNuocSanXuat không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenNuocSanXuat))
            {
                throw new FormatException("MaNuocSanXuat không hợp lệ");
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
