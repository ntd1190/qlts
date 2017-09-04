/*****************************************************************************
1. Create Date : 2017.04.08
2. Creator     : Nguyen Ngoc Tan
3. Description : client Repository
4. History     : 2017.04.08(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper.FastCrud;
using SongAn.QLTS.Entity.QLTS_MAIN.Entity;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.Repository.QLTS_MAIN
{
    public class ClientRepository : BaseRepository
    {
        public ClientRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public Client GetById(string id)
        {
            return WithConnection( c => {

                var obj =  c.Get<Client>(new Client { ClientId = id });

                return obj;
            });
        }

        public Client Insert(Client client)
        {
            return WithConnection( c =>
            {
                c.InsertAsync(client);

                if (client.ClientId.Equals(""))
                {
                    throw new Exception("Insert Fail");
                }

                return client;
            });

        }

        public Client Update(Client client)
        {
            return WithConnection( c =>
            {
                Client obj =  c.Get(client);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", client.ClientId));
                }

                if (obj.CtrVersion != client.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , client.ClientId));
                }

                client.CtrVersion += 1;

                var result = c.Update(client);

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return client;
            });
        }

        public Client UpdatePartial(Client client, params string[] field)
        {
            return WithConnection( c =>
            {
                Client obj = c.Get(client);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", client.ClientId));
                }

                if (obj.CtrVersion != client.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , client.ClientId));
                }

                client.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(Client.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<Client>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result = c.Update(client, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return client;
            });
        }

        public bool Delete(string id)
        {
            return WithConnection( c =>
            {
                var result =  c.Delete<Client>(new Client { ClientId = id });

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }
    }
}
