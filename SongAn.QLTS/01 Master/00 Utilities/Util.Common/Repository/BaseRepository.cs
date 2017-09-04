/*****************************************************************************
1. Create Date : 2017.08.03
2. Creator     : 2017.08.03
3. Description : Lop nen cho repository khong co Async
4. History     : 2017.08.03(2017.08.03) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Util.Common.Repository
{
    /// <summary>
    /// Base class to call Dapper
    /// </summary>
    public abstract class BaseRepository
    {
        private readonly string _ConnectionString;

        protected BaseRepository(string connectionString)
        {
            _ConnectionString = connectionString;
        }

        protected T WithConnection<T>(Func<IDbConnection, T> getData)
        {
            try
            {
                using (var connection = new SqlConnection(_ConnectionString))
                {
                    connection.Open(); // open a connection to the database
                    return  getData(connection); // execute getData, which has been passed in as a Func<IDBConnection, Task<T>>
                }
            }
            catch (TimeoutException ex)
            {
                throw new Exception(String.Format("{0}.WithConnection() experienced a SQL timeout", GetType().FullName), ex);
            }
            catch (SqlException ex)
            {
                throw new Exception(String.Format("{0}.WithConnection() experienced a SQL exception (not a timeout)", GetType().FullName), ex);
            }
        }
    }
}

