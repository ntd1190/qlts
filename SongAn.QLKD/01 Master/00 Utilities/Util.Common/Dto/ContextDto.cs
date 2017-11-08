﻿using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Util.Common.Dto
{
    public class ContextDto
    {
        public string dbMainConnection { get; set; }

        public string dbQLKDConnection { get; set; }

        public CustomPrincipal User { get; set; }

        public ContextDto()
        {

        }

    }
}
