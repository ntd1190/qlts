/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuong/List
4. Description  : Biz Lấy danh sách Bảng lương theo điều kiện
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.BangLuong
{
    /// <summary>
    /// Biz Lấy danh sách Bảng lương theo điều kiện
    /// </summary>
    /// <remarks>
    /// Luu y: 
    /// -   Vi trong truong hop nay tang biz chi goi 1 dac nen ke
    ///     thua lai tang dac va goi lai ham execute cua tang dac
    ///     
    /// -   Neu biz co xu ly phuc tap, ket hop nhieu dac thi se 
    ///     khoi tao nhieu dac trong ham execute cua biz.
    /// </remarks>
    public class GetListBangLuongByCriteriaBiz : SongAn.QLDN.Data.QLNS.BangLuong.GetListBangLuongByCriteriaDac
    {
        #region public properties

        #endregion

        #region private variable

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListBangLuongByCriteriaBiz(ContextDto context) : base(context)
        {

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
            foreach(dynamic item in result)
            {
                // Modify TanSuat
                var itemTanSuat = item.TanSuatTraLuong;
                if (itemTanSuat != null)
                {
                    string tansuat = itemTanSuat.ToString();

                    switch (tansuat)
                    {
                        case "THANG":
                            item.TanSuatTraLuong = "Hằng Tháng";
                            break;
                        case "QUY":
                            item.TanSuatTraLuong = "Hằng Quý";
                            break;
                        case "NAM":
                            item.TanSuatTraLuong = "Hằng Năm";
                            break;
                    }
                }

                // Modify Xoa
                var itemXoa = item.Xoa;
                var itemMaTrangThai = item.MaTrangThai;
                if (itemXoa != null && !string.IsNullOrWhiteSpace(itemMaTrangThai))
                {
                    if (string.Equals(itemMaTrangThai, "BL_KN"))
                        item.Xoa = "Xóa";
                }

                // Modify TinhToan
                var itemTinhToan = item.TinhToan;
                if (itemTinhToan != null && !string.IsNullOrWhiteSpace(itemMaTrangThai))
                {
                    if (string.Equals(itemMaTrangThai, "BL_KN"))
                        item.TinhToan = "Tính toán";
                    else
                        item.TinhToan = "Xem lại";
                }




            }
            return result;
        }

        #endregion
    }
}
