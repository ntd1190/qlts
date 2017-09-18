/*****************************************************************************
1. Create Date : 2017.09.15
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.15 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.ThayDoiThongTin;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.ThayDoiThongTin
{
    public class UpdateThayDoiThongTinDatAction
    {

        #region public
        public string TDTT { get; set; }
        public string TTKK { get; set; }
        public string TenTaiSanMoi { get; set; }
        public int LoaiKeKhai { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        #endregion
        #region private
        private Entity.QLTS.Entity.ThayDoiThongTin _TDTT { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiDat _TTKK_Dat { get; set; }
        #endregion
        #region init & validate
        private void init()
        {
            TenTaiSanMoi = Protector.String(TenTaiSanMoi, "");

            TDTT = Protector.String(TDTT, "{}");
            _TDTT = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThayDoiThongTin>(TDTT);

            TTKK = Protector.String(TTKK, "{}");
            _TTKK_Dat = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiDat>(TTKK);
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateThayDoiThongTinDatBiz(context);
                biz.TDTT = _TDTT;
                biz.TTKK_Dat = _TTKK_Dat;
                biz.TenTaiSanMoi = TenTaiSanMoi;
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
