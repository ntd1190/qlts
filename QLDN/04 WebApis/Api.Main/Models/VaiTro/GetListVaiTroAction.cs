/*****************************************************************************
1. Create Date : 2017.03.31
2. Creator     : 
3. Description : 
4. History     : 2017.03.31 () - Tao moi
                 2017.03.31 () - Tao moi

*****************************************************************************/
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN;
using SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SongAn.QLDN.Api.Main.Models.VaiTro
{
    public class GetListVaiTroAction
    {

        public GetListVaiTroAction()
        {

        }

        public async Task<IEnumerable<SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity.VaiTro>> Execute(string connectionString)
        {
            var repo = new VaiTroRepository(connectionString);

            var listVaiTro = await repo.SelectAll();

            return listVaiTro;
        }

    }
}