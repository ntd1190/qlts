using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DuyetMua;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DuyetMua
{
    public class DuyetDuyetMuaChiTietAction
    {
        public string MuaSamId { get; set; }
        public string MuaSamChiTietId { get; set; }
        public string DuyetId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            DuyetDuyetMuaChiTietBiz biz = new DuyetDuyetMuaChiTietBiz(context);
            var result = new ActionResultDto();
            try
            {
               
                biz.MuaSamId = MuaSamId;
                biz.MuaSamChiTietId = MuaSamChiTietId;
                biz.DuyetId = DuyetId;
                IEnumerable<dynamic> listMuaSam = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listMuaSam, _metaData);
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
