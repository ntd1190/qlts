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

namespace SongAn.QLTS.Data.QLTS.TaiSan
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class UpdateTaiSanDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual Entity.QLTS.Entity.TaiSan TaiSan { get; set; }
        public IEnumerable<Entity.QLTS.Entity.NguyenGia> NguyenGiaList { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string MESSAGE { get; set; }

        #endregion

        #region private variable

        ContextDto _context;
        private DataTable _NguyenGiaList { get; set; }

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateTaiSanDac(ContextDto context) : base(context.dbQLTSConnection)
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
            _NguyenGiaList = new DataTable();
            _NguyenGiaList.Columns.Add("TaiSanId", typeof(int));
            _NguyenGiaList.Columns.Add("NguonNganSachId", typeof(int));
            _NguyenGiaList.Columns.Add("GiaTri", typeof(decimal));
            foreach (var nguyenGia in NguyenGiaList)
            {
                _NguyenGiaList.Rows.Add(nguyenGia.TaiSanId, nguyenGia.NguonNganSachId, nguyenGia.GiaTri);
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
                var p = new DynamicParameters(TaiSan);
                p.Add("@NguyenGiaList", _NguyenGiaList.AsTableValuedParameter());
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_TaiSan_UpdateTaiSan",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}
