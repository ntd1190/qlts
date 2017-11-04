
/*****************************************************************************
1. Create Date  : 2017.10.03
2. Creator      : HOI
3. Function     : QLDNKHO/KHOPHIEUXUAT/EDIT
4. Description  : 
5. History      : 
*****************************************************************************/
using SongAn.QLDN.Data.QLKho.KhoPhieuNhapV2;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLKho.KhoPhieuNhapV2
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
    public class DeleteKhoPhieuNhapSeriesBySoPhieuBiz : DeleteKhoPhieuNhapSeriesBySoPhieuDac
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
        public DeleteKhoPhieuNhapSeriesBySoPhieuBiz(ContextDto context) : base(context)
        {
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
        public override async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            // goi lai ham execute cua tang dac
            var result = await base.Execute();

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return

            return result;
        }

        #endregion

    }
}

