/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi dac de lay danh sach Nghi Phep voi dieu kien
5. History      : 2017.04.15(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.QLNS.LuongPhuCap;
using SongAn.QLDN.Data.QLNS.LuongPhuCap.Dto;
using SongAn.QLDN.Data.QLNS.NhanVien;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.LuongPhuCap
{
    /// <summary>
    /// Biz Lấy danh sách Nghỉ phép theo điều kiện
    /// </summary>
    /// <remarks>
    /// Luu y: 
    /// -   Vi trong truong hop nay tang biz chi goi 1 dac nen ke
    ///     thua lai tang dac va goi lai ham execute cua tang dac
    ///     
    /// -   Neu biz co xu ly phuc tap, ket hop nhieu dac thi se 
    ///     khoi tao nhieu dac trong ham execute cua biz.
    /// </remarks>
    public class InsertLuongPhuCapBiz : Entity.MSSQL_QLDN_QLNS.Entity.LuongPhuCap
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
        public InsertLuongPhuCapBiz(ContextDto context)
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
        public async Task<Entity.MSSQL_QLDN_QLNS.Entity.LuongPhuCap> Execute()
        {
            Init();
            Validate();

            // TODO kiểm tra nhân viên có lương phụ cấp chưa
            var getByNhanVienIdDac = new GetLuongPhuCapByNhanVienIdDac(_context);
            getByNhanVienIdDac.NHAN_VIEN_ID = NhanVienId;
            var listLuongPhuCap = (await getByNhanVienIdDac.Execute());


            if (listLuongPhuCap != null && listLuongPhuCap.Count() > 0)
            {
                throw new BaseException("Nhân viên này đã có thông tin lương phụ cấp.");
            }

            // Nếu nhân viên chưa có lương phụ cấp thì thêm mới
            var repo = new LuongPhuCapRepository(_context);
            CtrVersion = 1;

            var result = await repo.Insert(this);

            return result;
        }

        #endregion

    }
}
