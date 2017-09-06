/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOKHOHANG/LIST
4. Description  : UPDATE XÓA KHO HÀNG
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Biz.QLKho.TrangThai;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTrangThai
{
    public class GetListTrangThaiPopupByChucNangAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string chucNang { get; set; }
        public string LoginId { get; set; }
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
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListTrangThaiPopupByChucNangBiz(context);
                biz.CHUCNANG = chucNang;
                biz.LOGIN_ID = _LoginId;
                var result = await biz.Execute();


                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
