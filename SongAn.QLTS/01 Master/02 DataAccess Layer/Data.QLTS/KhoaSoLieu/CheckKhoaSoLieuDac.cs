﻿/*****************************************************************************
1. Create Date  : 2017.08.31
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : INSERT TÀI SẢN
5. History      : 2017.08.31 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.KhoaSoLieu
{
    public class CheckKhoaSoLieuDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual string Nam { get; set; }
        public virtual int CoSoId { get; set; }
        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        public CheckKhoaSoLieuDac(ContextDto context) : base(context.dbQLTSConnection)
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
                    sql: "sp_KhoaSoLieu_CheckKhoaSoLieu",
                    param: p,
                    commandType: CommandType.StoredProcedure);


                return objResult;
            });
        }

        #endregion

    }
}