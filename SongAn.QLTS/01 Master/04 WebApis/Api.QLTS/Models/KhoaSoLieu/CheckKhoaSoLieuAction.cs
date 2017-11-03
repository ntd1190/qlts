/*****************************************************************************
1. Create Date : 2017.10.16
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.10.16(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Biz.QLTS.KhoaSoLieu;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.KhoaSoLieu
{
    public class CheckKhoaSoLieuAction
    {

        #region public
        public string Nam { get; set; }
        public int CoSoId { get; set; }
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

                var biz = new CheckKhoaSoLieuBiz(context);
                biz.Nam = Nam;
                biz.CoSoId = Protector.Int(CoSoId, 0);
                var result = await biz.Execute();

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
