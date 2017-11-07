using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.TheoDoi
{
    public class UpdateTheoDoiByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int TaiSanId { get; set; }
        public int TaiSanId_Old { get; set; }
        public DateTime NgayTrangCap { get; set; }
        public DateTime NgayGhiTang { get; set; }
        public DateTime NgayBatDauSuDung { get; set; }
        public int PhongBanId { get; set; }
        public int NhanVienId { get; set; }
        public int PhongBanId_Old { get; set; }
        public int NhanVienId_Old { get; set; }
        public decimal Nam { get; set; }
        public decimal SLTon { get; set; }
        public decimal SLTang { get; set; }
        public decimal SLGiam { get; set; }
        public int HopDongId { get; set; }
        public string CoSoId { get; set; }
        public string NguoiTao { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateTheoDoiByIdDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("TaiSanId", TaiSanId, DbType.Int32);
                p.Add("TaiSanId_Old", TaiSanId_Old, DbType.Int32);
                p.Add("NgayGhiTang", NgayGhiTang, DbType.DateTime);
                p.Add("NgayTrangCap", NgayTrangCap, DbType.DateTime);
                p.Add("NgayBatDauSuDung", NgayBatDauSuDung, DbType.DateTime);
                p.Add("PhongBanId", PhongBanId, DbType.Int32);
                p.Add("PhongBanId_Old", PhongBanId_Old, DbType.Int32);
                p.Add("NhanVienId", NhanVienId, DbType.Int32);
                p.Add("NhanVienId_Old", NhanVienId_Old, DbType.Int32);
                p.Add("Nam", Nam, DbType.Decimal);
                p.Add("SLTon", SLTon, DbType.Decimal);
                p.Add("SLTang", SLTang, DbType.Decimal);
                p.Add("SLGiam", SLGiam, DbType.Decimal);
                p.Add("HopDongId", HopDongId, DbType.Int32);
                p.Add("CoSoId", CoSoId, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.String);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_TheoDoi_UpdateTheoDoi",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
