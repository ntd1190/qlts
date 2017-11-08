using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Util.Common.Dto
{
    public class ActionResultDto
    {
        public HttpStatusCode ReturnCode { get; set; }

        public object ReturnData { get; set; }

        public ActionResultDto()
        {

        }
    }
}
