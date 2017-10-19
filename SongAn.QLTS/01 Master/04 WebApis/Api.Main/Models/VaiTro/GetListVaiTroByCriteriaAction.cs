/*****************************************************************************
1. Create Date : 2017.10.18
2. Creator     : NGUYEN THANH BINH
3. Description : 
4. History     : 2017.10.18 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Biz.Main.VaiTro;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.Main.Models.VaiTro
{
    public class GetListVaiTroByCriteriaAction
    {
        #region PUBLIC
        public string VaiTroId { get; set; }
        public string MaVaiTro { get; set; }
        public string CoSoId { get; set; }
        public string Search { get; set; }
        public string NHANVIEN_ID { get; set; }
        public string COSO_ID { get; set; }

        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        #endregion PUBLIC

        #region private
        private string _orderClause;
        #endregion

        private void init()
        {
            _orderClause = sortName + " " + sortDir;
        }

        private void validate() { }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();


                var biz = new GetListVaiTroByCriteriaBiz(context);
                biz.VAITROIDS = Protector.String(VaiTroId, "");
                biz.MAVAITRO = Protector.String(MaVaiTro, "");
                biz.COSOIDS = Protector.String(CoSoId, "");
                biz.SEARCH = Protector.String(Search, "");

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID, 0);
                biz.COSO_ID = Protector.Int(COSO_ID, 0);

                biz.ORDERCLAUSE = _orderClause;
                biz.SKIP = Protector.Int(start, 0);
                biz.TAKE = Protector.Int(length, 0);

                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = Protector.Int(draw, 0);
                _metaData.total = result.Count() > 0 ? result.FirstOrDefault().MAXCNT : 0;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
    }
}