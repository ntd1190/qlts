using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.PhieuCongTac
{
    public class GetListPhieuCongTacByCriteriaAction
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string loginId { get; set; }

        public string fields { get; set; }
        public string search { get; set; }
        public string nguoiDuyetIds { get; set; }
        public string trangThai { get; set; }
        public string xoa { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        private int _loginId;

        private DateTime? _startDate;
        private DateTime? _endDate;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _draw = Protector.Int(draw);
            _start = Protector.Int(start);
            _length = Protector.Int(length);
            _loginId = Protector.Int(loginId);

            sortName = Protector.String(sortName, "PCT_ID");
            sortDir = Protector.String(sortDir, "asc");
            _length = _length < 1 ? 10 : _length;

            fields = Protector.String(fields, "");
            search = Protector.String(search, "");
            nguoiDuyetIds = Protector.String(nguoiDuyetIds, "");
            trangThai = Protector.String(trangThai, "");
            _startDate = Protector.DateTime(startDate, "yyyyMMdd", true);
            _endDate = Protector.DateTime(endDate, "yyyyMMdd", true);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new FormatException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var orderClause = sortName + " " + sortDir;
                var total = 0;

                var biz = new GetListPhieuCongTacByCriteriaBiz(context);
                biz.FIELD = fields;
                biz.SEARCH_STRING = search;
                biz.NGUOI_DUYET_IDS = nguoiDuyetIds;
                biz.MA_TRANG_THAI = trangThai;
                biz.XOA = xoa;
                biz.LOGIN_ID = _loginId;
                biz.START_DATE = _startDate;
                biz.END_DATE = _endDate;
                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDER_CLAUSE = orderClause;

                IEnumerable<dynamic> list = await biz.Execute();

                if (list.Count() > 0)
                {
                    var obj = list.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

    }
}
