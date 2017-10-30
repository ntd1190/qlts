using Dapper;
using Dapper.FastCrud;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Repository;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLTS.Data.QLTS.KhoPhieuXuatKhac
{
    public class UpdateKhoPhieuXuatDac : BaseRepositoryAsync
    {
        #region public properties

        public virtual Entity.QLTS.Entity.KhoPhieuXuat KhoPhieuXuat { get; set; }
        public IEnumerable<Entity.QLTS.Entity.KhoPhieuXuatChiTiet> KhoPhieuXuatChiTiet { get; set; }
        public virtual int COSO_ID { get; set; }
        public virtual int NHANVIEN_ID { get; set; }
        public virtual string MESSAGE { get; set; }

        #endregion
        #region private variable
        private DataTable _KhoPhieuXuatChiTiet { get; set; }
        ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateKhoPhieuXuatDac(ContextDto context) : base(context.dbQLTSConnection)
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
            _KhoPhieuXuatChiTiet = new DataTable();
            _KhoPhieuXuatChiTiet.Columns.Add("KhoPhieuXuatChiTietId", typeof(int));
            _KhoPhieuXuatChiTiet.Columns.Add("KhoPhieuXuatId", typeof(int));
            _KhoPhieuXuatChiTiet.Columns.Add("TaiSanId", typeof(int));
            _KhoPhieuXuatChiTiet.Columns.Add("SoLuong", typeof(decimal));
            _KhoPhieuXuatChiTiet.Columns.Add("DonGia", typeof(decimal));
            _KhoPhieuXuatChiTiet.Columns.Add("GiaMua", typeof(decimal));
            _KhoPhieuXuatChiTiet.Columns.Add("GiaBan", typeof(decimal));
            _KhoPhieuXuatChiTiet.Columns.Add("NguonNganSachId", typeof(int));
            _KhoPhieuXuatChiTiet.Columns.Add("NhaCungCapId", typeof(int));
            _KhoPhieuXuatChiTiet.Columns.Add("HangDung", typeof(string));
            _KhoPhieuXuatChiTiet.Columns.Add("LoSanXuat", typeof(string));
            foreach (var row in KhoPhieuXuatChiTiet)
            {
                _KhoPhieuXuatChiTiet.Rows.Add(
                    row.KhoPhieuXuatChiTietId
                    , row.KhoPhieuXuatId
                    , row.TaiSanId
                    , row.SoLuong
                    , row.DonGia
                    , row.GiaMua
                    , row.GiaBan
                    , row.NguonNganSachId
                    , row.NhaCungCapId
                    , row.HanDung
                    , row.LoSanXuat
                    );
            }
        }

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
                var p = new DynamicParameters(KhoPhieuXuat);
                p.Add("@ChiTiet", _KhoPhieuXuatChiTiet.AsTableValuedParameter());

                p.Add("@COSO_ID", COSO_ID, DbType.String);
                p.Add("@NHANVIEN_ID", NHANVIEN_ID, DbType.String);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                        sql: "sp_KhoPhieuXuatKhac_UpdateKhoPhieuXuat",
                        param: p,
                        commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion
    }
}
