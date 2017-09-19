﻿/*****************************************************************************
1. Create Date  : 2017.09.12
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : 
5. History      : 2017.09.12 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.ThayDoiThongTin
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class InsertThayDoiThongTinDatDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual Entity.QLTS.Entity.ThongTinKeKhaiDat TTKK_Dat { get; set; }
        public virtual Entity.QLTS.Entity.ThayDoiThongTin TDTT { get; set; }
        public virtual string TenTaiSanMoi { get; set; }
        public virtual int CoSoId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string MESSAGE { get; set; }

        #endregion

        #region private variable
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertThayDoiThongTinDatDac(ContextDto context) : base(context.dbQLTSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;
            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init() { }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate() { }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters(TTKK_Dat);
                p.AddDynamicParams(TDTT);
                p.Add("@TenTaiSanMoi", TenTaiSanMoi, DbType.String);

                p.Add("@CoSoId", CoSoId, DbType.String);
                p.Add("@NhanVienId", NhanVienId, DbType.String);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_ThayDoiThongTinDat_InsertThayDoiThongTinDat",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}