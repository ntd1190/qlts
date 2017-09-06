using SongAn.QLDN.Biz.QLKho.KhoXuatNhapTon;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Globalization;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoXuatNhapTon
{
    public class GetListXuatNhapTonByCriteriaAction
    {
        #region PUBLIC
        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string KhoId { get; set; }
        public string HangHoaId { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            //_hangHoaId = Protector.Int(HangHoaId, 0);
            ////_tuNgay = DateTime.ParseExact(TuNgay, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            ////_denNgay = DateTime.ParseExact(DenNgay, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            ////_khoHangId = Protector.Int(KhoId, 0);
            //_kyId = Protector.Int(KyId, 0);
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

                var biz = new GetListKhoXuatNhapTonByCriteriaBiz(context);
                biz.TU_NGAY = TuNgay;
                biz.DEN_NGAY = DenNgay;
                biz.KHO_ID = Protector.Int(KhoId);
                biz.HANG_HOA_ID = Protector.Int(HangHoaId);
                biz.LOGIN_ID = LoginId;
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
