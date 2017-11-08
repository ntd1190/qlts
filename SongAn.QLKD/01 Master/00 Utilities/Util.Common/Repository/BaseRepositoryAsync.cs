/*****************************************************************************
1. Create Date : 2017.08.03
2. Creator     : Nguyễn Ngọc Tân
3. Description : Lop nen cho Repository co Async
4. History     : 2017.08.03(Nguyễn Ngọc Tân) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Util.Common.Repository
{
    /// <summary>
    /// Base class to call Dapper Async
    /// </summary>
    public abstract class BaseRepositoryAsync
    {
        private readonly string _ConnectionString;

        protected BaseRepositoryAsync(string connectionString)
        {
            _ConnectionString = connectionString;
        }

        protected async Task<T> WithConnection<T>(Func<IDbConnection, Task<T>> getData)
        {
            try
            {
                using (var connection = new SqlConnection(_ConnectionString))
                {
                    await connection.OpenAsync(); // Asynchronously open a connection to the database
                    return await getData(connection); // Asynchronously execute getData, which has been passed in as a Func<IDBConnection, Task<T>>
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
