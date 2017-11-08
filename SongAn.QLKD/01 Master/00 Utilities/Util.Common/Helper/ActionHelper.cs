/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Nguyen Ngoc Tan
3. Function     :
4. Description  : Mot so ham helper dung trong action class
5. History      : 2017.04.15(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Net;
using System.Security.Cryptography;
using System.Text;
namespace SongAn.QLKD.Util.Common.Helper
{
    public class ActionHelper
    {
        public static ActionResultDto returnActionError(HttpStatusCode code, string message)
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
        public static ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
    }
}
