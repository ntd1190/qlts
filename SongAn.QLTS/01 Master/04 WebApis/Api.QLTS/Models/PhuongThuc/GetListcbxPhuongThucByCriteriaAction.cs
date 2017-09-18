using SongAn.QLTS.Biz.QLTS.PhuongThuc;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.PhuongThuc
{
    public class GetListcbxPhuongThucByCriteriaAction
    {

        public string Search { get; set; }
        public int PhuongThucId { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var biz = new GetListcbxPhuongThucByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.PhuongThucId = PhuongThucId;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var listPhongBan = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK,listPhongBan, _metaData);
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
