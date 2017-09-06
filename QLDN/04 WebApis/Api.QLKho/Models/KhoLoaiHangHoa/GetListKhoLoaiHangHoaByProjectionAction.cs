using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLKho.KhoLoaiHangHoa;

namespace SongAn.QLDN.Api.QLKho.Models.KhoLoaiHangHoa
{
    public class GetListKhoLoaiHangHoaByProjectionAction
    {
        #region PUBLIC
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        private int _loginId;
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

            sortName = Protector.String(sortName, "LHH_ID");
            sortDir = Protector.String(sortDir, "asc");
            _length = _length < 1 ? 10 : _length;

            fields = Protector.String(fields, "");
            search = Protector.String(search, "");
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


                GetListKhoLoaiHangHoaByCriteriaBiz biz = new GetListKhoLoaiHangHoaByCriteriaBiz(context);
                biz.FIELD = fields;
                biz.SEARCH_STRING = search;
                biz.ORDER_CLAUSE = orderClause;
                biz.SKIP = _start;
                biz.TAKE = _length;

                IEnumerable<dynamic> listKhoLoaiHangHoa = await biz.Execute();

                if (listKhoLoaiHangHoa.Count() > 0)
                {
                    var obj = listKhoLoaiHangHoa.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listKhoLoaiHangHoa, _metaData);
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
