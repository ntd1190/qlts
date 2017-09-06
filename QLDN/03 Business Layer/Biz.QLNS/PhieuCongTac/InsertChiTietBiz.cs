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
    public class InsertChiTietBiz
    {
        #region public properties
        public int PhieuCongTacId { get; set; }
        public DateTime? Ngay { get; set; }
        public string NoiDung { get; set; }
        public short SoLuong { get; set; }
        public int DonGia { get; set; }
        public string GhiChu { get; set; }
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertChiTietBiz(ContextDto context)
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
        public async Task<Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTacChiTiet> Execute()
        {
            Init();
            Validate();

            var obj = createObj();

            var repo = new PhieuCongTacChiTietRepository(_context);
            var result = await repo.Insert(obj);

            return result;
        }

        #endregion
        #region helper
        private Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTacChiTiet createObj()
        {
            var obj = new Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTacChiTiet();

            obj.CtrVersion = 1;
            obj.PhieuCongTacId = PhieuCongTacId;
            obj.MaTrangThai = "PCTCT_DD";
            obj.XoaYN = "N";
            obj.NgayTao = DateTime.Now;

            obj.NoiDung = NoiDung;
            obj.Ngay= Ngay;
            obj.SoLuong = SoLuong;
            obj.DonGia = DonGia;
            obj.GhiChu = GhiChu;

            return obj;
        }
        #endregion
    }
}
