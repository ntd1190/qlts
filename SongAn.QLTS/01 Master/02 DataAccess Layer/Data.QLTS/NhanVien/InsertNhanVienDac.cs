﻿using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.NhanVien
{
    public class InsertNhanVienDac : BaseRepositoryAsync
    {
        #region public properties

        public string PhongBanId { get; set; }
        public string MaNhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public string DienThoai { get; set; }
        public string Email { get; set; }
        public string ChucDanh { get; set; }
        public string DiaChi { get; set; }
        public string GhiChu { get; set; }
        public int NguoiTao { get; set; }
        public int CoSoId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertNhanVienDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("PhongBanId", PhongBanId, DbType.String);
                p.Add("MaNhanVien", MaNhanVien, DbType.String);
                p.Add("TenNhanVien", TenNhanVien, DbType.String);
                p.Add("DienThoai", DienThoai, DbType.String);
                p.Add("Email", Email, DbType.String);
                p.Add("ChucDanh", ChucDanh, DbType.String);
                p.Add("DiaChi", DiaChi, DbType.String);
                p.Add("GhiChu", GhiChu, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.Int32);
                p.Add("CoSoId", CoSoId, DbType.Int32);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_NhanVien_InsertNhanVien",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
