/*****************************************************************************
1. Create Date : 2017.03.31
2. Creator     : 
3. Description : 
4. History     : 2017.03.31 () - Tao moi
                 2017.03.31 () - Tao moi

*****************************************************************************/
using SongAn.QLTS.Data.Repository.QLTS_MAIN;
using SongAn.QLTS.Entity.QLTS_MAIN.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SongAn.QLTS.Api.Main.Models.VaiTro
{
    public class GetListVaiTroAction
    {

        public GetListVaiTroAction()
        {

        }

        public async Task<IEnumerable<SongAn.QLTS.Entity.QLTS_MAIN.Entity.VaiTro>> Execute(string connectionString)
        {
            var repo = new VaiTroRepository(connectionString);

            var listVaiTro = await repo.SelectAll();

            return listVaiTro;
        }

    }
}