/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : API nhân viên
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.ChucVu;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class ChucVuController : BaseApiController
    {
        public ChucVuController() : base()
        {
        }

       [HttpPost]
        public async Task<IHttpActionResult> GetListChucVuByCriteria([FromBody] GetListChucVuByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        
        [HttpPost]
        public async Task<IHttpActionResult> GetChucVuById([FromBody]GetChucVuByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
     
        /// <summary>
        /// InsertChucVu
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> InsertChucVu([FromBody]InsertChucVuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
        /// <summary>
        /// UpdateChucVu
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> UpdateChucVu([FromBody]UpdateChucVuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListChucVu([FromBody]UpdateXoaListChucVuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /*
        /// <summary>
        /// 
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListChucVu([FromBody]DeleteListChucVuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// <summary>
        /// GetAll
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetAllChucVu([FromBody]GetAllChucVuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        */
    }
}
