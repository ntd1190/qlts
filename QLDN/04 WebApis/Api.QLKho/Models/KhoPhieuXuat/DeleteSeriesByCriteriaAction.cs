
/*****************************************************************************
1. Create Date  : 2017.10.19
2. Creator      : HOI
3. Function     : QLDNKHO/KHOPHIEUXUAT/Series
4. Description  : 
5. History      : 
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLKho.KhoKhoHang;
using SongAn.QLDN.Biz.QLKho.KhoPhieuXuat;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat
{
    public class DeleteSeriesByCriteriaAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string SoPhieu { get; set; }
        public int? HangHoaId { get; set; }
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

                var biz = new DeleteKhoPhieuSeriesBiz(context);
                biz.SO_PHIEU = SoPhieu;
                biz.HANG_HOA_ID = HangHoaId;
                biz.LOGIN_ID = _LoginId;
                var result = await biz.Execute();
                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, "Delete success!", metaData);
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
