/*****************************************************************************
1. Create Date  : 2017.08.26
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : 
5. History      : 2017.08.26 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoPhieuChuyen
{
    /// <summary>
    /// DAC Lấy danh sách Phong ban theo điều kiện
    /// </summary>
    public class UpdateKhoPhieuChuyenDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual int PhieuChuyenId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int? TaiKhoanNhap { get; set; }
        public virtual int? TaiKhoanXuat { get; set; }
        public virtual DateTime? NgayXuat { get; set; }
        public virtual DateTime? NgayNhap { get; set; }
        public virtual int KhoNhap { get; set; }
        public virtual int KhoXuat { get; set; }
        public virtual int? NguoiGiaoHang { get; set; }
        public virtual int? NguoiNhanHang { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual decimal? ChiPhi { get; set; }
        public virtual decimal? ThueVAT { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }

        public virtual int LOGIN_ID { get; set; }
        public virtual string CHI_TIET { get; set; }
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
        public UpdateKhoPhieuChuyenDac(ContextDto context) : base(context.dbQLNSConnection)
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
                    sql: "sp_KhoPhieuChuyen_UpdateKhoPhieuChuyen",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion
    }
}
