/*****************************************************************************
1. Create Date : 2017.09.05
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.05(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.TaiSan;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.NhomTaiSan
{
    public class GetListTaiSanByCriteriaAction
    {

        #region public
        public string Search { get; set; }
        public string MaTaiSan { get; set; }
        public string TenTaiSan { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        #endregion
        #region private
        private string _orderClause;
        #endregion
        #region init & validate
        private void init() {
            Search = Protector.String(Search, "");
            MaTaiSan = Protector.String(MaTaiSan, "");
            TenTaiSan = Protector.String(TenTaiSan, "");
            sortName = Protector.String(sortName, "MAXCNT");
            sortDir = Protector.String(sortDir, "asc");
            _orderClause = sortName + " " + sortDir;
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListTaiSanByCriteriaBiz(context);
                biz.SEARCH_STRING = Search;
                biz.SEARCH_MATAISAN = MaTaiSan;
                biz.SEARCH_TENTAISAN = TenTaiSan;
                biz.OrderClause = _orderClause;
                biz.SKIP = start;
                biz.TAKE = length;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = draw;
                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }
                return returnActionResult(HttpStatusCode.OK, result, _metaData);
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
