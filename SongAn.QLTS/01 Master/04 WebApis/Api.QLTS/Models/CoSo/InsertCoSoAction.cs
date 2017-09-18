
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.CoSo
{
    public class InsertCoSoAction : SongAn.QLTS.Entity.QLTS.Entity.CoSo
    {

        #region public
        /*public string MaCoSo { get; set; }
        public string TenCoSo { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var CoSo = new SongAn.QLTS.Entity.QLTS.Entity.CoSo();
                CoSo.MaCoSo = MaCoSo;
                CoSo.TenCoSo = TenCoSo;
                CoSo.LoaiCoSoId = LoaiCoSoId;
                CoSo.TrucThuoc = TrucThuoc;
                CoSo.DienThoai = DienThoai;
                CoSo.DiaChi = DiaChi;
                CoSo.GhiChu = GhiChu;
                CoSo.CoSoId = CoSoId;
                CoSo.NguoiTao = NguoiTao;
                CoSo.NgayTao = DateTime.Now;
                CoSo.CtrVersion = 1;
                CoSoRepository repo = new CoSoRepository(context);
                await repo.Insert(CoSo);

                return returnActionResult(HttpStatusCode.OK, CoSo, null);
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
            if (string.IsNullOrEmpty(MaCoSo))
            {
                throw new FormatException("MaCoSo không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenCoSo))
            {
                throw new FormatException("MaCoSo không hợp lệ");
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
