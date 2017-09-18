/*****************************************************************************
1. Create Date : 2017.08.31
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.08.31(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.TaiSan;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.TaiSan
{
    public class GetThongTinKeKhaiDatByIdAction
    {

        #region public
        public int TaiSanId { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        #endregion
        #region private
        #endregion
        #region init & validate
        private void init() { }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetThongTinKeKhaiDatByIdBiz(context);
                biz.TaiSanId = TaiSanId;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, null);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region helpers
        #endregion
    }
}
