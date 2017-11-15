using Dapper;
using Dapper.FastCrud;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLKD.Data.QLKD.NhomKhachHang
{
    public class UpdateNhomKhachHangByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int NhomKhachHangId { get; set; }
        public string MaNhom { get; set; }
        public string TenNhom { get; set; }
        public int NguoiTao { get; set; }
        public string UserId { get; set; }

        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateNhomKhachHangByIdDac(ContextDto context) : base(context.dbQLKDConnection)
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
                p.Add("NhomKhachHangId", NhomKhachHangId, DbType.Int32);
                p.Add("MaNhom", MaNhom, DbType.String);
                p.Add("TenNhom", TenNhom, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.String);
                p.Add("UserId", UserId, DbType.String);
                
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KD_NhomKhachHang_UpdateNhomKhachHangById",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
