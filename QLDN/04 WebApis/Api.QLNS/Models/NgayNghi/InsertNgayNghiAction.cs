using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLDN.Data.QLNS.NgayNghi;

namespace  SongAn.QLDN.Api.QLNS.Models.NgayNghi
{
    public class InsertNgayNghiAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.NgayNghi
    {

        #region public
        /*public string MaNgayNghi { get; set; }
        public string TenNgayNghi { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();
                InsertOneNgayNghiDac dac = new InsertOneNgayNghiDac(context);
                dac.Ngay = Ngay;
                dac.MoTa = MoTa;
                dac.NguoiTao = NguoiTao.ToString();
                dac.XoaYN = "N";
                dac.NgayTao = DateTime.Now;
                var ngaynghi = await dac.Execute();
                return returnActionResult(HttpStatusCode.OK, ngaynghi, null);
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
