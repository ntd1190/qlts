/*****************************************************************************
1. Create Date  : 2017.06.29
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : UPDATE THÔNG TIN PHIẾU XUẤT
5. History      : 2017.06.28 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Dapper;
using Dapper.FastCrud;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Data.QLKho.KhoPhieuXuat
{
    public class UpdateKhoPhieuXuatDac : BaseRepositoryAsync
    {
        #region public properties
        public virtual int PhieuXuatId { get; set; }
        public virtual int? KhachHangId { get; set; }
        public virtual string LoaiPhieu { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string NguoiNhanHang { get; set; }
        public virtual string SoDienThoai { get; set; }
        public virtual string SoHoaDon { get; set; }
        public virtual string Seri { get; set; }
        public virtual string Hinh { get; set; }
        public virtual DateTime? NgayChungTu { get; set; }
        public virtual string NoiDung { get; set; }
        public virtual int? TaiKhoanCo { get; set; }
        public virtual int? TaiKhoanNo { get; set; }
        public virtual int? TaiKhoanKho { get; set; }
        public virtual int? TaiKhoanGiaVon { get; set; }
        public virtual int KhoXuat { get; set; }
        public virtual DateTime? NgayThanhToan { get; set; }
        public virtual DateTime? NgayXuat { get; set; }
        public virtual int? ThuKho { get; set; }
        public virtual int? NguoiGiaoHang { get; set; }
        public virtual decimal? ChiPhi { get; set; }
        public virtual decimal? ThueVAT { get; set; }
        public virtual decimal? TienThue { get; set; }
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
        public UpdateKhoPhieuXuatDac(ContextDto context) : base(context.dbQLNSConnection)
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
                var p = new DynamicParameters(this);
                p.Add("@MESSAGE", dbType: DbType.String, direction: ParameterDirection.Output, size: 4000);
                var objResult = await c.QueryAsync<dynamic>(
                    sql: "sp_KhoPhieuXuat_UpdateKhoPhieuXuat",
                    param: p,
                    commandType: CommandType.StoredProcedure);

                MESSAGE = p.Get<string>("MESSAGE");

                return objResult;
            });
        }

        #endregion

    }
}
