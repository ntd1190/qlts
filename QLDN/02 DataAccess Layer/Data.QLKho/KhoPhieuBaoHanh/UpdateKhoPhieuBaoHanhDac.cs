/*****************************************************************************
1. Create Date  : 2017.07.28
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : PHIẾU BẢO HÀNH
5. History      : 2017.07.28 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoPhieuBaoHanh
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class UpdateKhoPhieuBaoHanhDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual int PhieuBaoHanhId { get; set; }
        public virtual string SeriesNo { get; set; }
        public virtual string TenKhachHang { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string TenThietBi { get; set; }
        public virtual string HangSanXuat { get; set; }
        public virtual DateTime NgayHen { get; set; }
        public virtual string ChuanDoan { get; set; }
        public virtual string YeuCauKhachHang { get; set; }
        public virtual string PhuKienKemTheo { get; set; }
        public virtual string TrangThaiTiepNhan { get; set; }
        public virtual string SanPhamCty { get; set; }
        public virtual int? CtrVersion { get; set; }
        public int LOGIN_ID { get; set; }
        public string MESSAGE { get; set; }
        #endregion

        #region private variable

        ContextDto _context;

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateKhoPhieuBaoHanhDac(ContextDto context) : base(context.dbQLNSConnection)
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
                var p = new DynamicParameters(this);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);

                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoPhieuBaoHanh_UpdateKhoPhieuBaoHanh",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}
