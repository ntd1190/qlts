using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.HopDong
{
    public class UpdateHopDongByIdDac : BaseRepositoryAsync
    {
        #region public properties

        public int HopDongId { get; set; }
        public string SoHopDong { get; set; }
        public DateTime NgayHopDong { get; set; }
        public string TenNhaThau { get; set; }
        public string DaiDien { get; set; }
        public decimal GiaTriHopDong { get; set; }
        public string NoiDung { get; set; }
        public string FileDinhKem { get; set; }
        public int CoSoId { get; set; }
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
        public UpdateHopDongByIdDac(ContextDto context) : base(context.dbQLTSConnection)
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
                p.Add("HopDongId", HopDongId, DbType.Int32);
                p.Add("SoHopDong", SoHopDong, DbType.String);
                p.Add("NgayHopDong", NgayHopDong, DbType.DateTime);
                p.Add("TenNhaThau", TenNhaThau, DbType.String);
                p.Add("DaiDien", DaiDien, DbType.String);
                p.Add("GiaTriHopDong", GiaTriHopDong, DbType.Decimal);
                p.Add("NoiDung", NoiDung, DbType.String);
                p.Add("FileDinhKem", FileDinhKem, DbType.String);
                p.Add("NguoiTao", NguoiTao, DbType.String);
                p.Add("CoSoId", CoSoId, DbType.Int32);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_HopDong_UpdateHopDong",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                return objResult;
            });
        }

        #endregion
    }
}
