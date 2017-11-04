/*****************************************************************************
1. Create Date  : 2017.10.13
2. Creator      : HOI
3. Function     : QLDNKHO/KHOPHIEUXUAT/EDIT
4. Description  : LẤY THÔNG TIN PHIẾU XUẤT
5. History      : 
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLDN.Data.QLKho.KhoPhieuXuat;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat
{
    public class GetListAutoKhoPhieuSeriesBySoPhieuAction
    {

        #region PUBLIC
        public string SoPhieu { get; set; }
        public string HangHoaId { get; set; }
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

                var biz = new GetListAutoKhoPhieuSeriesBySoPhieuDac(context);
                biz.HANGHOAID = Protector.Int(HangHoaId);
                biz.SOPHIEU = SoPhieu;
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
