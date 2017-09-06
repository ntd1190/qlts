/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Nguyen Thanh Binh
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi dac de lay danh sach chuc vu voi dieu kien
5. History      : 2017.04.19(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.PhieuCongTac
{
    /// <summary>
    /// Biz Lấy danh sách chúc vụ theo điều kiện
    /// </summary>
    /// <remarks>
    /// Luu y: 
    /// -   Vi trong truong hop nay tang biz chi goi 1 dac nen ke
    ///     thua lai tang dac va goi lai ham execute cua tang dac
    ///     
    /// -   Neu biz co xu ly phuc tap, ket hop nhieu dac thi se 
    ///     khoi tao nhieu dac trong ham execute cua biz.
    /// </remarks>
    public class UpdatePhieuCongTacBiz
    {
        #region public properties
        public string NoiDung { get; set; }
        public DateTime NgayDi { get; set; }
        public DateTime NgayVe { get; set; }
        public int PhieuCongTacId { get; set; }
        public int nhanVienId { get; set; }
        public int NguoiDuyetId { get; set; }
        public int CtrVersion { get; set; }
        public decimal SoNgay { get; set; }
        public int NguoiTao { get; set; }
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdatePhieuCongTacBiz(ContextDto context)
        {
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
        public async Task<Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac> Execute()
        {
            Init();
            Validate();

            var obj = createObj();

            var repo = new PhieuCongTacRepository(_context);
            var result = await repo.UpdatePartial(obj
                , nameof(Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac.NoiDung)
                , nameof(Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac.NhanVienId)
                , nameof(Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac.NgayDi)
                , nameof(Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac.NgayVe)
                , nameof(Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac.SoNgay)
                );

            return result;
        }

        #endregion
        #region helper
        private Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac createObj()
        {
            var obj = new Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTac();

            obj.CtrVersion = CtrVersion;
            obj.PhieuCongTacId = PhieuCongTacId;

            obj.NoiDung = NoiDung;
            obj.NhanVienId = nhanVienId;
            obj.NgayDi = NgayDi;
            obj.NgayVe = NgayVe;
            obj.SoNgay = SoNgay;

            return obj;
        }
        #endregion
    }
}
