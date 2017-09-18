using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Util.Common.Dto
{
    public class ContextDto
    {
        public string dbMainConnection { get; set; }

        public string dbQLTSConnection { get; set; }

        public CustomPrincipal User { get; set; }

        public ContextDto()
        {

        }

    }
}
