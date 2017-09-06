using SongAn.QLDN.Biz.QLKho.KhoTongHopXuatNhapTon;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTon
{
    public class GetListTheKhoXuatNhapTonByCriteriaAction
    {
        #region public
        public string KhoHangIds { get; set; }
        public string HangHoaIds { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string LoginId { get; set; }
        public string SortName { get; set; }
        public string SortDir { get; set; }
        public string Draw { get; set; }
        public string Start { get; set; }
        public string Length { get; set; }
        #endregion

        #region private
        private DateTime? _StartDate;
        private DateTime? _EndDate;
        private int _draw;
        private int _start;
        private int _length;
        private int _LoginId;
        private string _orderClause;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            KhoHangIds = Protector.String(KhoHangIds, "");
            HangHoaIds = Protector.String(HangHoaIds, "");

            StartDate = Protector.String(StartDate, "");
            _StartDate = Protector.DateTime(StartDate, "yyyy-MM-dd", true);

            EndDate = Protector.String(EndDate, "");
            _EndDate = Protector.DateTime(EndDate, "yyyy-MM-dd", true);

            _draw = Protector.Int(Draw, 0);
            _start = Protector.Int(Start, 0);
            _length = Protector.Int(Length, 0);
            _LoginId = Protector.Int(LoginId, 0);

            SortName = Protector.String(SortName, "HangHoaId");
            SortDir = Protector.String(SortDir, "asc");
            _orderClause = SortName + " " + SortDir;
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

                var biz = new GetListTheKhoXuatNhapTonByCriteriaBiz(context);
                biz.HANG_HOA_IDS = HangHoaIds;
                biz.KHO_HANG_IDS = KhoHangIds;
                biz.START_DATE = _StartDate;
                biz.END_DATE = _EndDate;
                biz.LOGIN_ID = _LoginId;

                biz.ORDER_CLAUSE = _orderClause;
                biz.SKIP = _start;
                biz.TAKE = _length;
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

    }
}
