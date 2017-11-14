
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Data.Repository.QLKD;

namespace  SongAn.QLKD.Api.QLKD.Models.NhomKinhDoanh
{
    public class InsertNhomKinhDoanhAction : SongAn.QLKD.Entity.QLKD.Entity.KDNhomKinhDoanh
    {

        #region public
        /*public string MaNhomKinhDoanh { get; set; }
        public string TenNhomKinhDoanh { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var NhomKinhDoanh = new SongAn.QLKD.Entity.QLKD.Entity.KDNhomKinhDoanh();
                NhomKinhDoanh.MaNhomKinhDoanh = MaNhomKinhDoanh;
                NhomKinhDoanh.TenNhomKinhDoanh = TenNhomKinhDoanh;
                NhomKinhDoanh.QuanLy = QuanLy;
                NhomKinhDoanh.SoLuongNhanVien = SoLuongNhanVien;
                NhomKinhDoanh.NguoiTao = NguoiTao;
                NhomKinhDoanh.NgayTao = DateTime.Now;
                NhomKinhDoanh.CtrVersion = 1;
                NhomKinhDoanhRepository repo = new NhomKinhDoanhRepository(context);
                await repo.Insert(NhomKinhDoanh);

                return returnActionResult(HttpStatusCode.OK, NhomKinhDoanh, null);
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
            if (string.IsNullOrEmpty(MaNhomKinhDoanh))
            {
                throw new FormatException("MaNhomKinhDoanh không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenNhomKinhDoanh))
            {
                throw new FormatException("MaNhomKinhDoanh không hợp lệ");
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
