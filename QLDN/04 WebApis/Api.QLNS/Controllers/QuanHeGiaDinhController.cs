using SongAn.QLDN.Api.QLNS.Models.QuanHeGiaDinh;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class QuanHeGiaDinhController :BaseApiController
    {
        public QuanHeGiaDinhController() : base() { }

        public async Task<IHttpActionResult> InsertQuanHeGiaDinh([FromBody]InsertQuanHeGiaDinhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateQuanHeGiaDinh([FromBody]UpdateQuanHeGiaDinhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteQuanHeGiaDinh([FromBody]DeleteQuanHeGiaDinhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListQuanHeGiaDinhById([FromBody]GetListQuanHeGiaDinhByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListQuanHeGiaDinhByCriteria([FromBody]GetListQuanHeGiaDinhByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
