/*****************************************************************************
1. Create Date  : 2017.08.10
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/NHANVIEN/EDIT
4. Description  : API CÔNG VIỆC TRƯỚC ĐÂY
5. History      : 2017.08.10 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.CongViecTruocDay;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class CongViecTruocDayController : BaseApiController
    {
        // GET: KhoLoaiHangHoa
        public CongViecTruocDayController() : base() { }

        public async Task<IHttpActionResult> InsertCongViecTruocDay([FromBody]InsertCongViecTruocDayAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateCongViecTruocDay([FromBody]UpdateCongViecTruocDayAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteCongViecTruocDay([FromBody]DeleteCongViecTruocDayAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListCongViecTruocDayById([FromBody]GetListCongViecTruocDayByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListCongViecTruocDayByCriteria([FromBody]GetListCongViecTruocDayByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}