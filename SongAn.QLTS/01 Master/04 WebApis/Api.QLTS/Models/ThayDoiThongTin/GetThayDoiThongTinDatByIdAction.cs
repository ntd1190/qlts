/*****************************************************************************
1. Create Date : 2017.09.14
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.14 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Biz.QLTS.ThayDoiThongTin;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.ThayDoiThongTin
{
    public class GetThayDoiThongTinDatByIdAction
    {

        #region public
        public int ThayDoiThongTinId { get; set; }
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

                var biz = new GetThayDoiThongTinDatByIdBiz(context);
                biz.ThayDoiThongTinId = ThayDoiThongTinId;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
