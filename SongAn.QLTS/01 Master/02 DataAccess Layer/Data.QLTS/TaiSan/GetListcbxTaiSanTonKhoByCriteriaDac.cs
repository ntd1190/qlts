/*****************************************************************************
1. Create Date  : 2017.09.01
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : 
5. History      : 2017.09.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.TaiSan
{
    public class GetListcbxTaiSanTonKhoByCriteriaDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual string SEARCH { get; set; }
        public virtual string TAISANIDS { get; set; }
        public virtual string KHOTAISANIDS { get; set; }
        public virtual decimal? DONGIA { get; set; }
        public virtual string THANGNAM { get; set; }
        public virtual string FIELD { get; set; }
        public virtual int? COSO_ID { get; set; }
        public virtual int? NHANVIEN_ID { get; set; }
        public virtual string FUNCTIONCODE { get; set; }
        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        public GetListcbxTaiSanTonKhoByCriteriaDac(ContextDto context) : base(context.dbQLTSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        private void Init() { }
        private void Validate() { }

        #endregion

        #region execute
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters(this);
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_TaiSan_cbxTaiSanTonKhoByCriteria",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion

    }
}
