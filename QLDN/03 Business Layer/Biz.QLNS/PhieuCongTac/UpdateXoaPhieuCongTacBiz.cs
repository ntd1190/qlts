/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Nguyen Thanh Binh
3. Function     : QLDNMAIN/NghiPhep/List
4. Description  : Goi dac de lay danh sach chuc vu voi dieu kien
5. History      : 2017.04.19(Nguyen Thanh Binh) - Tao moi
                  2017.05.25(Nguyen Thanh Binh) - update xóa bằng sp
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.PhieuCongTac.Dto;
using SongAn.QLDN.Data.QLNS.PhieuCongTac;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System.Collections.Generic;
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
    public class UpdateXoaPhieuCongTacBiz
    {
        #region public properties
        public List<UpdateXoaPhieuCongTacDto> listPhieuCongTac { get; set; }
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public UpdateXoaPhieuCongTacBiz(ContextDto context)
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
        public async Task<List<UpdateXoaPhieuCongTacDto>> Execute()
        {
            Init();
            Validate();

            var dac = new UpdateXoaPhieuCongTacByPhieuCongTacIdDac(_context);

            if (listPhieuCongTac != null && listPhieuCongTac.Count > 0)
            {
                foreach (var obj in listPhieuCongTac)
                {
                    obj.MaTrangThai = Protector.String(obj.MaTrangThai, "");
                    if (obj.MaTrangThai != "" && obj.MaTrangThai != "PCT_DY" && obj.MaTrangThai != "PCT_TC")
                    {
                        dac.PHIEU_CONG_TAC_ID = obj.PCT_ID;
                        dac.CTRVERSION = obj.PCT_CTRVERSION;
                        dac.XOA = "Y";
                        var result = await dac.Execute();

                        if (string.IsNullOrEmpty(dac.MESSAGE))
                        {
                            obj.XoaYN = "Y";
                        }
                        else
                        {
                            throw new BaseException("Không thể xóa phiếu phiếu công tác.");
                        }
                    }
                    else
                    {
                        throw new BaseException("Không thể xóa phiếu đã duyệt.");
                    }
                }
            }

            return listPhieuCongTac;
        }

        #endregion
        #region helper
        #endregion
    }
}
