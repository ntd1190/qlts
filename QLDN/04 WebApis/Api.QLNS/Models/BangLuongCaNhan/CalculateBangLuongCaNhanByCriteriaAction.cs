/*****************************************************************************
1. Create Date  : 2017.05.13
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuongCaNhan/
4. Description  : Action api tính toán Bảng Lương cá nhân theo điều kiện
5. History      : 2017.05.13(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.BangLuongCaNhan;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.BangLuongCaNhan
{
    /// <summary>
    /// Action api tính toán Bảng Lương cá nhân theo điều kiện
    /// </summary>
    public class CalculateBangLuongCaNhanByCriteriaAction
    {
        #region public properties

        /// <summary>
        /// Bảng lương Id
        /// </summary>
        public int BANGLUONG_ID { get; set; }

        /// <summary>
        /// Người tạo id
        /// </summary>
        public int NGUOITAO_ID { get; set; }

        /// <summary>
        /// Danh sach NhanVienId can tinh toan
        /// </summary>
        public string NHANVIEN_IDS { get; set; }

        #endregion

        #region private variable

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public CalculateBangLuongCaNhanByCriteriaAction()
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
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                Init();
                Validate();

                var total = 0;

                CalculateBangLuongCaNhanByCriteriaBiz biz = new CalculateBangLuongCaNhanByCriteriaBiz(context);

                biz.BANGLUONG_ID = BANGLUONG_ID;
                biz.NGUOITAO_ID = NGUOITAO_ID;
                biz.NHANVIEN_IDS = NHANVIEN_IDS;

                total = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.total = total;

                return ActionHelper.returnActionResult( HttpStatusCode.OK, total, _metaData);
            }
            catch(FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
        #endregion
    }
}