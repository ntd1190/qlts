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
    public class UpdateTaiSanAction
    {

        #region public
        public string TaiSan { get; set; }
        public string TTCK { get; set; }
        public string TTKK_Dat { get; set; }
        public string TTKK_Nha { get; set; }
        public string TTKK_Oto { get; set; }
        public string TTKK_500 { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public string NguyenGiaList { get; set; }
        #endregion
        #region private
        private List<Entity.QLTS.Entity.NguyenGia> _NguyenGiaList { get; set; }
        private Entity.QLTS.Entity.ThongTinCongKhai _TTCK { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiDat _TTKK_Dat { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiNha _TTKK_Nha { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiOto _TTKK_Oto { get; set; }
        private Entity.QLTS.Entity.ThongTinKeKhaiTren500 _TTKK_500 { get; set; }
        private Entity.QLTS.Entity.TaiSan _TaiSan { get; set; }
        #endregion
        #region init & validate
        private void init()
        {
            TaiSan = Protector.String(TaiSan, "{}");
            _TaiSan = JsonConvert.DeserializeObject<Entity.QLTS.Entity.TaiSan>(TaiSan);

            TTCK = Protector.String(TTCK, "{}");
            _TTCK = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinCongKhai>(TTCK);

            TTKK_Dat = Protector.String(TTKK_Dat, "{}");
            _TTKK_Dat = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiDat>(TTKK_Dat);

            TTKK_Nha = Protector.String(TTKK_Nha, "{}");
            _TTKK_Nha = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiNha>(TTKK_Nha);

            TTKK_Oto = Protector.String(TTKK_Oto, "{}");
            _TTKK_Oto = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiOto>(TTKK_Oto);

            TTKK_500 = Protector.String(TTKK_500, "{}");
            _TTKK_500 = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinKeKhaiTren500>(TTKK_500);

            NguyenGiaList = Protector.String(NguyenGiaList, "[]");
            _NguyenGiaList = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.NguyenGia>>(NguyenGiaList);
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                /*** TÀI SẢN ***/

                var biz = new UpdateTaiSanBiz(context);
                biz.TaiSan = _TaiSan;
                biz.NguyenGiaList = _NguyenGiaList;
                biz.NhanVienId = NhanVienId;
                biz.CoSoId = CoSoId;
                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                /*** THÔNG TIN CÔNG KHAI ***/

                var bizTTCK = new InsertThongTinCongKhaiBiz(context);
                bizTTCK.ThongTinCongKhai = _TTCK;
                bizTTCK.NhanVienId = NhanVienId;
                bizTTCK.CoSoId = CoSoId;
                result = await bizTTCK.Execute();

                if (string.IsNullOrEmpty(bizTTCK.MESSAGE) == false)
                {
                    throw new BaseException(bizTTCK.MESSAGE.Split('|')[2]);
                }

                /*** THÔNG TIN KÊ KHAI ĐẤT ***/
                if (_TaiSan.LoaiKeKhai == 1)
                {
                    var bizTTKK_Dat = new InsertThongTinKeKhaiDatBiz(context);
                    bizTTKK_Dat.TTKK_Dat = _TTKK_Dat;
                    bizTTKK_Dat.NhanVienId = NhanVienId;
                    bizTTKK_Dat.CoSoId = CoSoId;
                    result = await bizTTKK_Dat.Execute();

                    if (string.IsNullOrEmpty(bizTTKK_Dat.MESSAGE) == false)
                    {
                        throw new BaseException(bizTTKK_Dat.MESSAGE.Split('|')[2]);
                    }
                }

                /*** THÔNG TIN KÊ KHAI NHÀ  ***/
                if (_TaiSan.LoaiKeKhai == 2)
                {
                    var bizTTKK_Nha = new InsertThongTinKeKhaiNhaBiz(context);
                    bizTTKK_Nha.TTKK_Nha = _TTKK_Nha;
                    bizTTKK_Nha.NhanVienId = NhanVienId;
                    bizTTKK_Nha.CoSoId = CoSoId;
                    result = await bizTTKK_Nha.Execute();

                    if (string.IsNullOrEmpty(bizTTKK_Nha.MESSAGE) == false)
                    {
                        throw new BaseException(bizTTKK_Nha.MESSAGE.Split('|')[2]);
                    }
                }

                /*** THÔNG TIN KÊ KHAI Ô TÔ ***/
                if (_TaiSan.LoaiKeKhai == 3)
                {
                    var bizTTKK_Oto = new InsertThongTinKeKhaiOtoBiz(context);
                    bizTTKK_Oto.TTKK_Oto = _TTKK_Oto;
                    bizTTKK_Oto.NhanVienId = NhanVienId;
                    bizTTKK_Oto.CoSoId = CoSoId;
                    result = await bizTTKK_Oto.Execute();

                    if (string.IsNullOrEmpty(bizTTKK_Oto.MESSAGE) == false)
                    {
                        throw new BaseException(bizTTKK_Oto.MESSAGE.Split('|')[2]);
                    }
                }

                /*** THÔNG TIN KÊ KHAI TÀI SẢN TRÊN 500 TRIỆU ***/
                if (_TaiSan.LoaiKeKhai == 4)
                {
                    var bizTTKK_500 = new InsertThongTinKeKhai500Biz(context);
                    bizTTKK_500.TTKK_500 = _TTKK_500;
                    bizTTKK_500.NhanVienId = NhanVienId;
                    bizTTKK_500.CoSoId = CoSoId;
                    result = await bizTTKK_500.Execute();

                    if (string.IsNullOrEmpty(bizTTKK_500.MESSAGE) == false)
                    {
                        throw new BaseException(bizTTKK_500.MESSAGE.Split('|')[2]);
                    }
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
