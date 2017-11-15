
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Data.Repository.QLKD;

namespace  SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class InsertNhanVienAction : SongAn.QLKD.Entity.QLKD.Entity.KDNhanVienChiTiet
    {

        #region public
        /*public string MaNhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NhanVien = new SongAn.QLKD.Entity.QLKD.Entity.KDNhanVienChiTiet();
                NhanVien.NhanVienId = NhanVienId;
                NhanVien.NhomKinhDoanhId = NhomKinhDoanhId;
                NhanVien.CachLamViec = CachLamViec;
                NhanVien.TinhCach = TinhCach;
                NhanVien.SoThich = SoThich;
                NhanVien.ThoiQuen = ThoiQuen;
                NhanVien.GhiChu = GhiChu;
                NhanVienChiTietRepository repo = new NhanVienChiTietRepository(context);
                await repo.Insert(NhanVien);

                return returnActionResult(HttpStatusCode.OK, NhanVien, null);
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
