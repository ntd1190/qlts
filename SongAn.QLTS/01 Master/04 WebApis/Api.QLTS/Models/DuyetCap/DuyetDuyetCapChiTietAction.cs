using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DuyetCap;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DuyetCap
{
    public class DuyetDuyetCapChiTietAction
    {
        public string DeNghiId { get; set; }
        public string DeNghiChiTietId { get; set; }
        public string DuyetId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            DuyetDuyetCapChiTietBiz biz = new DuyetDuyetCapChiTietBiz(context);
            var result = new ActionResultDto();
            try
            {
               
                biz.DeNghiId = DeNghiId;
                biz.DeNghiChiTietId = DeNghiChiTietId;
                biz.DuyetId = DuyetId;
                IEnumerable<dynamic> listDeNghi = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listDeNghi, _metaData);
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
