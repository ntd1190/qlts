
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.LoaiTaiSan
{
    public class InsertLoaiTaiSanAction : SongAn.QLTS.Entity.QLTS.Entity.LoaiTaiSan
    {

        #region public
        /*public string MaLoai { get; set; }
        public string TenLoai { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var LoaiTaiSan = new SongAn.QLTS.Entity.QLTS.Entity.LoaiTaiSan();
                LoaiTaiSan.MaLoai = MaLoai;
                LoaiTaiSan.TenLoai = TenLoai;
                LoaiTaiSan.GhiChu = GhiChu;
                LoaiTaiSan.NhomId = NhomId;
                LoaiTaiSan.NguoiTao = NguoiTao;
                LoaiTaiSan.NgayTao = DateTime.Now;
                LoaiTaiSan.CtrVersion = 1;
                LoaiTaiSanRepository repo = new LoaiTaiSanRepository(context);
                await repo.Insert(LoaiTaiSan);

                return returnActionResult(HttpStatusCode.OK, LoaiTaiSan, null);
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
            if (string.IsNullOrEmpty(MaLoai))
            {
                throw new FormatException("MaLoai không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenLoai))
            {
                throw new FormatException("MaLoai không hợp lệ");
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
