/*****************************************************************************
1. Create Date : 2017.04.07
2. Creator     : Nguyen Thanh Binh
3. Description : ChucNangController
4. History     : 2017.04.07(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/

using SongAn.QLDN.Api.Main.Models.ChucNang;
using System.Threading.Tasks;
using System.Web.Http;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;

namespace SongAn.QLDN.Api.Main.Controllers
{
    public class ChucNangController : BaseApiController
    {
        public ChucNangController() :
            base()
        { }

        [HttpPost]
        public async Task<IHttpActionResult> InsertChucNang([FromBody]InsertChucNangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListChucNangByProjection([FromBody]GetListChucNangByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetChucNangById([FromBody]GetChucNangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateChucNang([FromBody]UpdateChucNangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListChucNang([FromBody]DeleteListChucNangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        //[HttpGet]
        //public async Task<IHttpActionResult> GetListChucNangBySearchString(string search = "", int start = 0, int length = 20)
        //{
        //    try
        //    {
        //        ChucNangRepository repo = new ChucNangRepository(_connectionString);

        //        var _whereClause = "";
        //        _whereClause += string.Format("MaChucNang LIKE '%{0}%' OR ", search);
        //        _whereClause += string.Format("TenChucNang LIKE '%{0}%' ", search);

        //        IEnumerable<ChucNang> listChucNang = await repo.SelectAllByCriteria(_whereClause, "", start, length);

        //        return Content(HttpStatusCode.OK, listChucNang);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(HttpStatusCode.InternalServerError, ex.ToString());
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetListChucNangByCriteria()
        //{
        //    ChucNangRepository repo = new ChucNangRepository(_connectionString);

        //    IEnumerable<ChucNang> listChucNang = await repo.SelectAllByCriteria("", "");

        //    return Content(HttpStatusCode.OK, listChucNang);
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetListChucNangByCriteriaCount()
        //{
        //    ChucNangRepository repo = new ChucNangRepository(_connectionString);

        //    int listChucNang = await repo.SelectAllByCriteriaCount("");

        //    return Ok(listChucNang);
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetListChucNangByProjection([FromBody] GetListChucNangByProjectionAction action)
        //{
        //    dynamic result = new System.Dynamic.ExpandoObject();

        //    try
        //    {
        //        var draw = Protector.Int(HttpContext.Current.Request.QueryString["draw"]);
        //        var start = Protector.Int(HttpContext.Current.Request.QueryString["start"]);
        //        var length = Protector.Int(HttpContext.Current.Request.QueryString["length"]);
        //        var search = Protector.String(HttpContext.Current.Request.QueryString["search"]);
        //        var sortName = Protector.String(HttpContext.Current.Request.QueryString["sortName"]);
        //        var sortDir = Protector.String(HttpContext.Current.Request.QueryString["sortDir"]);

        //        var fields = "ChucNangId,TenChucNang,MaChucNang,MoTa";
        //        var whereClause = string.Format("MaChucNang LIKE N'%{0}%' OR TenChucNang LIKE N'%{0}%'", search);
        //        var orderClause = sortName + " " + sortDir;
        //        var total = 0;

        //        ChucNangRepository repo = new ChucNangRepository(_connectionString);
        //        IEnumerable<dynamic> listChucNang = await repo.SelectAllByCriteriaProjection(fields, whereClause, orderClause, start, length);
        //        total = await repo.SelectAllByCriteriaCount(whereClause);

        //        result.total = total;
        //        result.draw = draw;
        //        result.rows = listChucNang;

        //        return Content(HttpStatusCode.OK, result);
        //    }
        //    catch (Exception ex)
        //    {
        //        result.error = new System.Dynamic.ExpandoObject();
        //        result.error.code = 1;
        //        result.error.message = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
        //        return Content(HttpStatusCode.InternalServerError, result);
        //    }
        //}

        //[HttpPost]
        //public async Task<IHttpActionResult> updateChucNang([FromBody]ChucNang chucnang)
        //{
        //    dynamic result = new System.Dynamic.ExpandoObject();
        //    try
        //    {
        //        ChucNangRepository repo = new ChucNangRepository(_connectionString);
        //        chucnang.NgaySuaDT = DateTime.Now;

        //        await repo.UpdatePartial(chucnang,
        //             nameof(ChucNang.MaChucNang),
        //             nameof(ChucNang.TenChucNang),
        //             nameof(ChucNang.MoTa),
        //             nameof(ChucNang.KhoaYN),
        //             nameof(ChucNang.NgaySuaDT)
        //              );
        //        result.result = chucnang;
        //        return Content(HttpStatusCode.OK, result);
        //    }
        //    catch (Exception ex)
        //    {
        //        result.error = new System.Dynamic.ExpandoObject();
        //        result.error.code = 1;
        //        result.error.message = ex.InnerException.Message;
        //        return Content(HttpStatusCode.InternalServerError, result);
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> deleteChucNang(int Id)
        //{
        //    ChucNangRepository repo = new ChucNangRepository(_connectionString);
        //    var result = await repo.Delete(Id);
        //    return Content(HttpStatusCode.OK, result);
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> deleteListChucNang(string Ids)
        //{
        //    dynamic result = new System.Dynamic.ExpandoObject();
        //    try
        //    {
        //        var listId = Ids.Split('|');
        //        var count = 0;

        //        var repo = new ChucNangRepository(_connectionString);

        //        for (int i = 0; i < listId.Length; i++)
        //        {
        //            var id = Protector.Int(listId[i]);
        //            if (id > 0 && await repo.Delete(id))
        //            {
        //                count++;
        //            }
        //        }
        //        result.rowAffected = count;

        //        return Content(HttpStatusCode.OK, result);
        //    }
        //    catch (Exception ex)
        //    {
        //        result.error = new System.Dynamic.ExpandoObject();
        //        result.error.code = 1;
        //        result.error.message = ex.InnerException.Message;
        //        return Content(HttpStatusCode.InternalServerError, result);
        //    }
        //}
    }
}
