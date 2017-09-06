/*****************************************************************************
1. Create Date  : 2017.06.17
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUNHAP/EDIT
4. Description  : LẤY THÔNG TIN PHIẾU NHẬP
5. History      : 2017.06.17 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Biz.QLKho.KhoPhieuNhap;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuNhap
{
    public class GetListKhoPhieuNhapByIdAction
    {

        #region PUBLIC
        public string phieuNhapIds { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(loginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new BaseException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListKhoPhieuNhapByIdBiz(context);
                biz.PHIEU_NHAP_IDS = phieuNhapIds;
                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region HELPERS

        #endregion
    }
}
