using SongAn.QLDN.Biz.QLNS.PheDuyet;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.PheDuyet
{
    public class UpdatePheDuyetByProjectionAction
    {

        public string table { get; set; }
        public string field { get; set; }
        public string where { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            UpdatePheDuyetByCriteraBiz biz = new UpdatePheDuyetByCriteraBiz(context);
            biz.Table = table;
            biz.Field = field;
            biz.where = where;
            var result = new ActionResultDto();
            try
            {
                return ActionHelper.returnActionResult(HttpStatusCode.OK, await biz.Execute(), null);
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
