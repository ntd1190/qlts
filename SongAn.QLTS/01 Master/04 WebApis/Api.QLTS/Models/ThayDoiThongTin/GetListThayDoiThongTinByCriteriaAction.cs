/*****************************************************************************
1. Create Date : 2017.09.13
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.13 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.ThayDoiThongTin;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.ThayDoiThongTin
{
    public class GetListThayDoiThongTinByCriteriaAction
    {

        #region public
        public string Search { get; set; }
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
        private void init()
        {
            Search = Protector.String(Search, "");
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

                var biz = new GetListThayDoiThongTinByCriteriaBiz(context);
                biz.Search = Search;
                biz.OrderClause = _orderClause;
                biz.Skip = start;
                biz.Take = length;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = draw;
                _metaData.total = result.Count() > 0 ? result.FirstOrDefault().MAXCNT : 0;

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
