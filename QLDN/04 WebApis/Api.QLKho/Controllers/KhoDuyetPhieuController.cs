/*****************************************************************************
1. Create Date  : 2017.06.09
2. Creator      : NGUYỄN NGỌC TÂN
3. Function     : Api.QLKHO/KHOPHIEUCHUYEN/
4. Description  : API PHIẾU NHẬP KHO
5. History      : 2017.06.09 (NGUYỄN NGỌC TÂN) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLKho.Models.KhoDuyetPhieu;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoDuyetPhieuController : BaseApiController
    {
        public KhoDuyetPhieuController() : base() { }

        #region phiếu duyet
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoDuyetPhieuByCriteria([FromBody]GetListKhoDuyetPhieuByCriteriaAction action)

        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
        #endregion
    }
}