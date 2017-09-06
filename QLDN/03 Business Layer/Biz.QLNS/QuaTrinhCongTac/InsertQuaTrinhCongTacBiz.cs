﻿/*****************************************************************************
1. Create Date  : 2017.05.17
2. Creator      : Nguyễn Thanh Bình
3. Function     : 
4. Description  : thêm mới quá trình công tác của nhân viên
5. History      : 2017.05.17(Nguyễn Thanh Bình) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.QLNS.NhanVien;
using SongAn.QLDN.Data.QLNS.PhieuCongTac;
using SongAn.QLDN.Data.QLNS.QuaTrinhCongTac.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.QuaTrinhCongTac
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
    public class InsertQuaTrinhCongTacBiz : QuaTrinhCongTacDto
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
        public InsertQuaTrinhCongTacBiz(ContextDto context)
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
        public async Task<QuaTrinhCongTacDto> Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            // TODO kiểm tra trạng thái của nhân viên

            var getNhanVienByIdDac = new GetThongTinNhanVienByIdDac(_context);
            getNhanVienByIdDac.NHAN_VIEN_ID = NhanVienId;

            var listNhanVien = (await getNhanVienByIdDac.Execute()).ToList();
            if (listNhanVien != null && (listNhanVien.Count() == 0 || listNhanVien[0].XoaYN == "Y"))
            {
                throw new BaseException("Không tìm thấy thông tin nhân viên.");
            }

            // TODO thêm thông tin quá trình công tác

            var repo = new QuaTrinhCongTacRepository(_context);
            var entity = ToEntity();
            entity = (await repo.Insert(entity));

            if (entity.QuaTrinhCongTacId == 0)
            {
                throw new BaseException("Không thể thêm quá trình công tác");
            }

            var quaTrinhCongTacBiz =new GetListQuaTrinhCongTacByCriteriaDac(_context);
            quaTrinhCongTacBiz.QUA_TRINH_CONG_TAC_ID = entity.QuaTrinhCongTacId;
            var listQuaTrinhCongTac = (await quaTrinhCongTacBiz.Execute());

            var result = listQuaTrinhCongTac.FirstOrDefault();

            // goi lai ham execute cua tang dac

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return
            return result;
        }

        #endregion

        #region Helpers
        #endregion
    }
}
