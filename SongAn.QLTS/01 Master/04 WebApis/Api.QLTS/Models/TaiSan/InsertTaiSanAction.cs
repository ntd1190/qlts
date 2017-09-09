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
using System.Linq;

namespace SongAn.QLTS.Api.QLTS.Models.TaiSan
{
    public class InsertTaiSanAction : Entity.QLTS.Entity.TaiSan
    {

        #region public
        public string TaiSan { get; set; }
        public string TTCK { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public string NguyenGiaList { get; set; }
        #endregion
        #region private
        private List<Entity.QLTS.Entity.NguyenGia> _NguyenGiaList { get; set; }
        private Entity.QLTS.Entity.ThongTinCongKhai _TTCK { get; set; }
        private Entity.QLTS.Entity.TaiSan _TaiSan { get; set; }
        #endregion
        #region init & validate
        private void init()
        {
            TaiSan = Protector.String(TaiSan, "{}");
            _TaiSan = JsonConvert.DeserializeObject<Entity.QLTS.Entity.TaiSan>(TaiSan);

            TTCK = Protector.String(TTCK, "{}");
            _TTCK = JsonConvert.DeserializeObject<Entity.QLTS.Entity.ThongTinCongKhai>(TTCK);

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
                var biz = new InsertTaiSanBiz(context);
                biz.TaiSan = _TaiSan;
                biz.NguyenGiaList = _NguyenGiaList;
                biz.NhanVienId = NhanVienId;
                biz.CoSoId = CoSoId;
                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                var _taiSanId = result.FirstOrDefault().TaiSanId;
                /*** TÀI SẢN ***/
                var bizTTCK = new InsertThongTinCongKhaiBiz(context);
                _TTCK.TaiSanId = _taiSanId;
                bizTTCK.ThongTinCongKhai = _TTCK;
                bizTTCK.NhanVienId = NhanVienId;
                bizTTCK.CoSoId = CoSoId;
                result = await bizTTCK.Execute();

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
