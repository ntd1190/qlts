using SongAn.QLDN.Biz.QLKho.KhoTongHopXuatNhapTonTheoKy;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Globalization;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTonTheoKy
{
    public class GetListChiTietTheKhobyItemAction
    {
        #region PUBLIC
        public string HangHoaId { get; set; }
        //public string TuNgay { get; set; }
        //public string DenNgay { get; set; }
        //public string KhoId { get; set; }
        public string KyId { get; set; }
        #endregion

        #region private
        private int _hangHoaId;
        //private DateTime _tuNgay;
        //private DateTime _denNgay;
        //private int _khoHangId;
        private int _kyId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _hangHoaId = Protector.Int(HangHoaId, 0);
            //_tuNgay = DateTime.ParseExact(TuNgay, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            //_denNgay = DateTime.ParseExact(DenNgay, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            //_khoHangId = Protector.Int(KhoId, 0);
            _kyId = Protector.Int(KyId, 0);
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

                var biz = new GetListChiTietTheKhoByItemBiz(context);
                biz.HangHoaId = _hangHoaId;
                //biz.TuNgay = _tuNgay;
                //biz.DenNgay = _denNgay;
                //biz.KhoId = _khoHangId;
                biz.KyId = _kyId;
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
