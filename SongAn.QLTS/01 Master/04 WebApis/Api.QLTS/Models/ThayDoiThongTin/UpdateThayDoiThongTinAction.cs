/*****************************************************************************
1. Create Date : 2017.09.22
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.09.22 (NGUYỄN THANH BÌNH) - Tao moi
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
    public class UpdateThayDoiThongTinAction
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
        private Entity.QLTS.Entity.ThongTinKeKhaiNha _TTKK_Nha { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiOto _TTKK_Oto { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiTren500 _TTKK_500 { get; set; }
        #endregion
        #region init & validate
        private void init()
        {
            TenTaiSanMoi = Protector.String(TenTaiSanMoi, "");

            TDTT = Protector.String(TDTT, "{}");
            _TDTT = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThayDoiThongTin>(TDTT);

            TTKK = Protector.String(TTKK, "{}");
            switch (LoaiKeKhai)
            {
                case 1:
                    _TTKK_Dat = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiDat>(TTKK);
                    break;
                case 2:
                    _TTKK_Nha = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiNha>(TTKK);
                    break;
                case 3:
                    _TTKK_Oto = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiOto>(TTKK);
                    break;
                case 4:
                    _TTKK_500 = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiTren500>(TTKK);
                    break;
            }
        }

        private void validate() {
            if (LoaiKeKhai < 1 || LoaiKeKhai > 4)
            {
                throw new BaseException("LoaiKeKhai không hợp lệ");
            }        }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                // loại kê khai đất
                if (LoaiKeKhai == 1)
                {
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

                // loại kê khai nhà
                if (LoaiKeKhai == 2)
                {
                    var biz = new UpdateThayDoiThongTinNhaBiz(context);
                    biz.TDTT = _TDTT;
                    biz.TTKK_Nha = _TTKK_Nha;
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

                // loại kê khai oto
                if (LoaiKeKhai == 3)
                {
                    var biz = new UpdateThayDoiThongTinOtoBiz(context);
                    biz.TDTT = _TDTT;
                    biz.TTKK_Oto = _TTKK_Oto;
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

                // loại kê khai trên 500 triệu
                if (LoaiKeKhai == 4)
                {
                    var biz = new UpdateThayDoiThongTin500Biz(context);
                    biz.TDTT = _TDTT;
                    biz.TTKK_500 = _TTKK_500;
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

                return ActionHelper.returnActionResult(HttpStatusCode.OK, null, null);
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
