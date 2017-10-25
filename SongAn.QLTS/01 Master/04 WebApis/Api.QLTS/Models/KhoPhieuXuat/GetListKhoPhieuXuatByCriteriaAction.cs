using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.KhoPhieuXuat;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.KhoPhieuXuat
{
    public class GetListKhoPhieuXuatByCriteriaAction
    {
        #region public
        public  string SEARCH { get; set; }
        public  string SOPHIEU { get; set; }
        public  string KHOPHIEUXUATID { get; set; }
        public  string COSOID { get; set; }
        public  string NHANVIENID { get; set; }

        public  string FIELD { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }

        public string COSO_ID { get; set; }
        public string NHANVIEN_ID { get; set; }
        public  string FUNCTIONCODE { get; set; }
        #endregion
        #region private
        private string _orderClause;
        #endregion
        #region init & validate
        private void init() {
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

                var biz = new GetListKhoPhieuXuatByCriteriaBiz(context);
                biz.COSOID = Protector.String(COSOID, "");
                biz.KHOPHIEUXUATID = Protector.String(KHOPHIEUXUATID, "");
                biz.NHANVIENID = Protector.String(NHANVIENID, "");
                biz.SEARCH = Protector.String(SEARCH, "");
                biz.SOPHIEU = Protector.String(SOPHIEU, "");

                biz.FIELD = Protector.String(FIELD, "");
                biz.ORDERCLAUSE = Protector.String(_orderClause, "");
                biz.SKIP = Protector.Int(start, 0);
                biz.TAKE = Protector.Int(length, 0);

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.COSO_ID = Protector.Int(COSO_ID);
                biz.FUNCTIONCODE = Protector.String(FUNCTIONCODE, "");

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = draw;
                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
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
