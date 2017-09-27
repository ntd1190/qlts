/*****************************************************************************
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

namespace SongAn.QLTS.Data.QLTS.DanhGia
{
    public class UpdateDanhGiaDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual Entity.QLTS.Entity.DanhGia DanhGia { get; set; }
        public virtual int SoNamSuDung { get; set; }
        public virtual decimal TyLeHaoMon { get; set; }
        public virtual decimal HaoMonLuyKe { get; set; }
        public virtual decimal SLTon { get; set; }
        public IEnumerable<Entity.QLTS.Entity.NguyenGia> NguyenGiaList { get; set; }
        public virtual int COSO_ID { get; set; }
        public virtual int NHANVIEN_ID { get; set; }
        public virtual string MESSAGE { get; set; }
        #endregion

        #region private variable
        ContextDto _context;
        private DataTable _NguyenGiaList { get; set; }
        #endregion

        #region constructor
        public UpdateDanhGiaDac(ContextDto context) : base(context.dbQLTSConnection)
        {
            OrmConfiguration.DefaultDialect = SqlDialect.MsSql;

            _context = context;
        }
        #endregion

        #region init & validate
        private void Init() {
            _NguyenGiaList = new DataTable();
            _NguyenGiaList.Columns.Add("TaiSanId", typeof(int));
            _NguyenGiaList.Columns.Add("NguonNganSachId", typeof(int));
            _NguyenGiaList.Columns.Add("GiaTri", typeof(decimal));
            foreach (var nguyenGia in NguyenGiaList)
            {
                _NguyenGiaList.Rows.Add(nguyenGia.TaiSanId, nguyenGia.NguonNganSachId, nguyenGia.GiaTri);
            }
        }
        private void Validate() { }

        #endregion

        #region execute
        public virtual async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            return await WithConnection(async c =>
            {
                var p = new DynamicParameters(DanhGia);
                p.Add("@NguyenGiaList", _NguyenGiaList.AsTableValuedParameter());
                p.Add("@SoNamSuDung", SoNamSuDung, DbType.Int32);
                p.Add("@TyLeHaoMon", TyLeHaoMon, DbType.Decimal);
                p.Add("@HaoMonLuyKe", HaoMonLuyKe, DbType.Decimal);
                p.Add("@SLTon", SLTon, DbType.Decimal);

                p.Add("@COSO_ID", COSO_ID, DbType.String);
                p.Add("@NHANVIEN_ID", NHANVIEN_ID, DbType.String);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_DanhGia_UpdateDanhGia",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}
