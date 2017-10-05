using SongAn.QLTS.Biz.QLTS.TraCuuTaiSan;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.TraCuuTaiSan
{
    public class GetListTaiSanByCriteriaAction
    {
        public string NhanVienId { get; set; }
        public string PhongBanId { get; set; }
        public string CoSoId { get; set; }
        public string LoaiKeKhai { get; set; }
        public string Search { get; set; }
        public string NHANVIEN_ID { get; set; }
        public string COSO_ID { get; set; }

        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }

        #region private
        private int _NhanVienId;
        private int _PhongBanId;
        private int _CoSoId;
        private int _draw;
        private int _start;
        private int _length;
        private string _orderClause;
        #endregion

        private void init()
        {
            Search = Protector.String(Search, "");
            _NhanVienId = Protector.Int(NhanVienId, 0);
            _PhongBanId = Protector.Int(PhongBanId, 0);
            _CoSoId = Protector.Int(CoSoId, 0);

            _draw = Protector.Int(draw, 0);
            _start = Protector.Int(start, 0);
            _length = Protector.Int(length, 0);
            _orderClause = sortName + " " + sortDir;
        }

        private void validate() { }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();


                var biz = new GetListTaiSanByCriteriaBiz(context);
                biz.NHANVIENID = _NhanVienId;
                biz.COSOID = _CoSoId;
                biz.LOAIKEKHAI = Protector.String(LoaiKeKhai, "");
                biz.PHONGBANID = _PhongBanId;
                biz.SEARCH = Search;
                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDERCLAUSE = _orderClause;
                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID, 0);
                biz.COSO_ID = Protector.Int(COSO_ID, 0);

                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = result.Count() > 0 ? result.FirstOrDefault().MAXCNT : 0;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
