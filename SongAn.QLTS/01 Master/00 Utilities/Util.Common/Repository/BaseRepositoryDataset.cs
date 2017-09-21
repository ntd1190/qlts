/*****************************************************************************
1. Create Date : 2017.03.26
2. Creator     : Tran Quoc Hung
3. Description : Lop nen cho repository khong co Async
4. History     : 2017.03.26(Tran Quoc Hung) - Tao moi
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
    public abstract class BaseRepositoryDataset
    {
        private readonly string _ConnectionString;

        protected BaseRepositoryDataset(string connectionString)
        {
            _ConnectionString = connectionString;
        }

        protected DataSet getData(string commandtext, List<SqlParameter> arrParam)
        {
            try
            {
                DataSet ds = new DataSet();
                SqlDataAdapter adapter;
                SqlCommand command = new SqlCommand();
                var connection = new SqlConnection(_ConnectionString);
                connection.Open();
                command.Connection = connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = commandtext;
                command.Parameters.AddRange(arrParam.ToArray());
                adapter = new SqlDataAdapter(command);
                adapter.Fill(ds);
                return ds;
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

