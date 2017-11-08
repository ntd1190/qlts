/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : Repository 
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Entity.QLKD_MAIN.Entity;
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.Repository.QLKD_MAIN
{
    public class NguoiDungRepository : Util.Common.Repository.BaseRepository
    {
        public NguoiDungRepository(ContextDto context) : base(context.dbMainConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
        }

        public  NguoiDung GetById(int id)
        {
            return  WithConnection( c => {

                var obj =  c.Get<NguoiDung>(new NguoiDung { NguoiDungId = id });

                return obj;
            });
        }

        public NguoiDung GetByEmail(string email)
        {
            return WithConnection(c => {

                var obj = c.Find<NguoiDung>(statement => statement
                        .Where($@"{nameof(NguoiDung.Email):C}=@Param1 AND
                                    {nameof(NguoiDung.KhoaYN):C}=0")
                        .WithParameters(new { Param1 = email })).FirstOrDefault();

                return obj;
            });
        }

        public  NguoiDung Insert(NguoiDung nguoidung)
        {
            return  WithConnection( c =>
            {
                 c.Insert(nguoidung);

                if(nguoidung.NguoiDungId == 0)
                {
                    throw new Exception("Insert Fail");
                }

                return nguoidung;
            });

        }

        public  NguoiDung Update(NguoiDung nguoidung)
        {
            return  WithConnection( c =>
            {
                NguoiDung obj =  c.Get(nguoidung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nguoidung.NguoiDungId.ToString()));
                }

                if (obj.CtrVersion != nguoidung.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , nguoidung.NguoiDungId.ToString()));
                }

                nguoidung.CtrVersion += 1;

                var result =  c.Update(nguoidung);

                if(result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nguoidung;
            });
        }

        public  NguoiDung UpdatePartial(NguoiDung nguoidung, params string[] field)
        {
            return  WithConnection( c =>
            {
                NguoiDung obj =  c.Get(nguoidung);

                if (obj == null)
                {
                    throw new Exception(string.Format("Update id {0} not exist", nguoidung.NguoiDungId.ToString()));
                }

                if (obj.CtrVersion != nguoidung.CtrVersion)
                {
                    throw new Exception(string.Format("Update id {0} have version confict"
                                                        , nguoidung.NguoiDungId.ToString()));
                }

                nguoidung.CtrVersion += 1;
                var list = field.ToList();

                list.Add(nameof(NguoiDung.CtrVersion));

                var partialUpdateMapping = OrmConfiguration
                    .GetDefaultEntityMapping<NguoiDung>()
                    .Clone() // clone it if you don't want to modify the default
                    .UpdatePropertiesExcluding(prop => prop.IsExcludedFromUpdates = true,
                                list.ToArray());

                var result =  c.Update(nguoidung, statement => statement.WithEntityMappingOverride(partialUpdateMapping));

                if (result != true)
                {
                    throw new Exception("Update Fail");
                }

                return nguoidung;
            });
        }

        public  bool Delete(int id)
        {
            return  WithConnection( c =>
            {
                var result =  c.Delete<NguoiDung>(new NguoiDung { NguoiDungId = id});

                if (result != true)
                {
                    throw new Exception("Delete Fail");
                }

                return result;
            });
        }

        /* Vi Du call store procedure
        In the simple case you can do:

        var user = cnn.Query<User>("spGetUser", new { Id = 1 },
                commandType: CommandType.StoredProcedure).First();

                If you want something more fancy, you can do:

         var p = new DynamicParameters();
                p.Add("@a", 11);
         p.Add("@b", dbType: DbType.Int32, direction: ParameterDirection.Output);
         p.Add("@c", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

         cnn.Execute("spMagicProc", p, commandType: CommandType.StoredProcedure); 

         int b = p.Get<int>("@b");
         int c = p.Get<int>("@c");
         */
    }
}
