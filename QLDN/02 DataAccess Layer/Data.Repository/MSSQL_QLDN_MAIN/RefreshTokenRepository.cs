/*****************************************************************************
1. Create Date : 2017.04.08
2. Creator     : Tran Quoc Hung
3. Description : RefreshToken Repository
4. History     : 2017.04.08(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using Dapper.FastCrud;
using SongAn.QLDN.Entity.MSSQL_QLDN_MAIN.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN
{
    public class RefreshTokenRepository : BaseRepository
    {
        public RefreshTokenRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public RefreshToken GetById(string id)
        {
            return WithConnection( c => {

                var obj =  c.Get<RefreshToken>(new RefreshToken { RefreshTokenId = id });

                return obj;
            });
        }

        public RefreshToken Insert(RefreshToken RefreshToken)
        {
            return WithConnection( c =>
            {
                c.InsertAsync(RefreshToken);

                if (RefreshToken.RefreshTokenId.Equals(""))
                {
                    throw new Exception("Insert Fail");
                }

                return RefreshToken;
            });

        }

        public RefreshToken Update(RefreshToken RefreshToken)
        {
            return WithConnection( c =>
            {
                RefreshToken obj =  c.Get(RefreshToken);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", RefreshToken.RefreshTokenId));
                }

                if (obj.CtrVersion != RefreshToken.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , RefreshToken.RefreshTokenId));
                }

                RefreshToken.CtrVersion += 1;

                var result = c.Update(RefreshToken);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return RefreshToken;
            });
        }

        public RefreshToken UpdatePartial(RefreshToken RefreshToken, params string[] field)
        {
            return WithConnection( c =>
            {
                RefreshToken obj = c.Get(RefreshToken);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", RefreshToken.RefreshTokenId));
                }

                if (obj.CtrVersion != RefreshToken.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , RefreshToken.RefreshTokenId));
                }

                RefreshToken.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(RefreshToken.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<RefreshToken>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = c.Update(RefreshToken, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return RefreshToken;
            });
        }

        public bool Delete(string id)
        {
            return WithConnection( c =>
            {
                var result =  c.Delete<RefreshToken>(new RefreshToken { RefreshTokenId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
