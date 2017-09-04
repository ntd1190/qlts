
using SongAn.QLTS.Data.QLNS.Menu;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
namespace SongAn.QLTS.Api.Main.Models.Menu
{
    public class GetListMenuAction
    {

        public string UserId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {

                /* convert input */
                
                GetListMenuDac biz = new GetListMenuDac(context);
                biz.UserId = UserId;
                var Menu = await biz.Execute();
               
                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = Menu
                };

                return _result;
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }


    }
}
