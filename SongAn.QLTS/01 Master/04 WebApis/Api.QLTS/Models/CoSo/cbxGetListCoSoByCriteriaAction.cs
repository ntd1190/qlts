/*****************************************************************************
1. Create Date  : 2017.10.18
2. Creator      : NGUYEN THANH BINH
3. Function     : 
4. Description  : 
5. History      : 2017.10.18(NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Biz.QLTS.CoSo;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.CoSo
{
    public class cbxGetListCoSoByCriteriaAction
    {

        public string Search { get; set; }
        public string MaCoSo { get; set; }
        public string CoSoId { get; set; }
        public string CoSo_Id { get; set; }
        public string NhanVien_Id { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var biz = new cbxGetListCoSoByCriteriaBiz(context);
                biz.SEARCH = Protector.String(Search, string.Empty);
                biz.COSOIDS = Protector.String(CoSoId, string.Empty);
                biz.MACOSO = Protector.String(MaCoSo, string.Empty);
                biz.COSO_ID = Protector.Int(CoSo_Id, 0);
                biz.NHANVIEN_ID = Protector.Int(NhanVien_Id, 0);

                var result = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();

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
    }
}
