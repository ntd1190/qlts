/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Nguyen Thanh Binh
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi dac de lay danh sach chuc vu voi dieu kien
5. History      : 2017.04.19(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.QLNS.BaoHiemXaHoi;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace SongAn.QLDN.Biz.QLNS.BaoHiemXaHoi
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
    public class UpdateBaoHiemXaHoiBiz : Entity.MSSQL_QLDN_QLNS.Entity.BaoHiemXaHoi
    {
        #region public properties
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateBaoHiemXaHoiBiz(ContextDto context) 
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
            CtrVersion = 1;
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
        public async Task<Entity.MSSQL_QLDN_QLNS.Entity.BaoHiemXaHoi> Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            /* xóa bảo hiểm xã hội của nhân viên */
            var delDac = new DeleteBaoHiemXaHoiByNhanVienIdDac(_context);
            delDac.NHAN_VIEN_ID = NhanVienId;

            var delResult =(await delDac.Execute());

            var repo = new BaoHiemXaHoiRepository(_context);

            // goi lai ham execute cua tang dac
            var result = await repo.Insert(this);

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return
            return result;
        }

        #endregion
    }
}
