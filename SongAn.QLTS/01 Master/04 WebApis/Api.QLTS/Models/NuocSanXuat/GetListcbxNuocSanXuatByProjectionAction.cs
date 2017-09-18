using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.NuocSanXuat;
using SongAn.QLTS.Data.Repository.QLTS;

namespace SongAn.QLTS.Api.QLTS.Models.NuocSanXuat
{
    public class GetListcbxNuocSanXuatByProjectionAction
    {

        public string Search { get; set; }
        public int NuocSanXuatId { get; set; }
        public string MaNuocSanXuat { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxNuocSanXuatByCriteriaBiz biz = new GetListcbxNuocSanXuatByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.NuocSanXuatId = NuocSanXuatId;
                biz.MaNuocSanXuat = MaNuocSanXuat;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var listNuocSanXuat = await biz.Execute();
                var _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNuocSanXuat, _metaData);
            }
            catch (Exception ex)
            {
                result.ReturnCode = HttpStatusCode.InternalServerError;
                result.ReturnData = new
                {
                    error = new
                    {
                        code = HttpStatusCode.InternalServerError,
                        type = HttpStatusCode.InternalServerError.ToString(),
                        message = ex.InnerException != null ? ex.InnerException.Message : ex.Message
                    }
                };
                return result;
            }

        }
    }
}
