using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLNS.BienBanKiemKe
{
    public class UpdateBienBanKiemKeByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int BienBanKiemKeId { get; set; }
        public string SoChungTu { get; set; }
        public DateTime NgayChungTu { get; set; }
        public DateTime NgayKiemKe { get; set; }
        public int PhongBanId { get; set; }
        public string GhiChu { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public DataTable MyTable_BanKiemKe { get; set; }
        public DataTable MyTable_BienBanKiemKeChiTiet { get; set; }

        #endregion

        #region private variable

        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateBienBanKiemKeByIdDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("BienBanKiemKeId", BienBanKiemKeId, DbType.Int32);
                p.Add("SoChungTu", SoChungTu, DbType.String);
                p.Add("NgayChungTu", NgayChungTu, DbType.DateTime);
                p.Add("NgayKiemKe", NgayKiemKe, DbType.DateTime);
                p.Add("PhongBanId", PhongBanId, DbType.Int32);
                p.Add("GhiChu", GhiChu, DbType.String);
                p.Add("CoSoId", CoSoId, DbType.Int32);
                p.Add("NhanVienId", NhanVienId, DbType.Int32);
                p.Add("@MyTable_BanKiemKe", MyTable_BanKiemKe.AsTableValuedParameter());
                p.Add("@MyTable_BienBanKiemKeChiTiet", MyTable_BienBanKiemKeChiTiet.AsTableValuedParameter());

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_BienBanKiemKe_UpdateBienBanKiemKe",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
