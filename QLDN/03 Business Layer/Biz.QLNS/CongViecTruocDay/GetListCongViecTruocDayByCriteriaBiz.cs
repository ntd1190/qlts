﻿/*****************************************************************************
1. Create Date  : 2017.08.10
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/NHANVIEN/EDIT
4. Description  : DANH SÁCH CÔNG VIỆC TRƯỚC ĐÂY
5. History      : 2017.08.10 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.QLNS.CongViecTruocDay;
using SongAn.QLDN.Util.Common.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLNS.CongViecTruocDay
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
    public class GetListCongViecTruocDayByCriteriaBiz : GetListCongViecTruocDayByCriteriaDac
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
        public GetListCongViecTruocDayByCriteriaBiz(ContextDto context) : base(context)
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
            return result;
        }

        #endregion

    }
}
