﻿/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOKHOHANG/LIST
4. Description  : THÊM THÔNG TIN KHO HÀNG
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.QLKho.KhoKhoHang;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLKho.KhoPhieuNhap
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
    public class InsertKhoPhieuNhapBiz
    {
        #region public properties
        public Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhap PhieuNhap { get; set; }
        public List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhapChiTiet> ListChiTiet { get; set; }
        #endregion

        #region private variable
        private ContextDto _context;
        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public InsertKhoPhieuNhapBiz(ContextDto context)  {
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
        public async Task<dynamic> Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            PhieuNhap.XoaYN = "N";
            PhieuNhap.CtrVersion = 1;
            var repo =new KhoPhieuNhapRepository(_context);
            var result = await repo.Insert(PhieuNhap);

            if(ListChiTiet == null || ListChiTiet.Count == 0)
            {
                return result;
            }

            var repoChiTiet = new KhoPhieuNhapChiTietRepository(_context);
            foreach(var item in ListChiTiet)
            {
                item.PhieuNhapId = result.PhieuNhapId;
                item.XoaYN = "N";
                item.CtrVersion = 1;
                await repoChiTiet.Insert(item);
            }

            // goi lai ham execute cua tang dac

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return
            return result;
        }

        #endregion

    }
}
