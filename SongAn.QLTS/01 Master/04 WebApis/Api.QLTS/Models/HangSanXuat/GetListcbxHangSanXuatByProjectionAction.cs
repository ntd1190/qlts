using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.HangSanXuat;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.HangSanXuat
{
    public class GetListcbxHangSanXuatByProjectionAction
    {

        public string Search { get; set; }
        public int HangSanXuatId { get; set; }
        public string MaHangSanXuat { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxHangSanXuatByCriteriaBiz biz = new GetListcbxHangSanXuatByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.HangSanXuatId = HangSanXuatId;
                biz.MaHangSanXuat = MaHangSanXuat;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                IEnumerable<dynamic> listHangSanXuat = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK,listHangSanXuat, _metaData);
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
