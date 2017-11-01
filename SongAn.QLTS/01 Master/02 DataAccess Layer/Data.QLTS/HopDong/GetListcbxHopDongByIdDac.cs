﻿using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.HopDong
{
    public class GetListcbxHopDongByIdDac : BaseRepositoryAsync
    {
        #region public properties

        /// <summary>
        /// Danh sách các CoSo cần lấy
        /// </summary>
        public string CoSoId { get; set; }
        /// <summary>
        /// Danh sách các CoSo cần lấy
        /// </summary>
        public string NhanVienId { get; set; }

        /// <summary>
        /// Mệnh đề where
        /// </summary>
        public string Search { get; set; }
        public string FunctionCode { get; set; }
        public int HopDongId { get; set; }


        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListcbxHopDongByIdDac(ContextDto context) : base(context.dbQLTSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {

        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {

        }

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
                var p = new DynamicParameters();
                p.Add("CoSoId", CoSoId, DbType.String);
                p.Add("NhanVienId", NhanVienId, DbType.String);
                p.Add("Search", Search, DbType.String);
                p.Add("HopDongId", HopDongId, DbType.Int32);
                p.Add("FunctionCode", FunctionCode, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_HopDong_cbxHopDongById",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
