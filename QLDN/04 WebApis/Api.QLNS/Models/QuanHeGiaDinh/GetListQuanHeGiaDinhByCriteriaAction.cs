using SongAn.QLDN.Biz.QLNS.QuanHeGiaDinh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.QuanHeGiaDinh
{
    public class GetListQuanHeGiaDinhByCriteriaAction
    {
        #region PUBLIC
        public string nhanVienId { get; set; }
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
        private int _nhanVienId;
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
            _nhanVienId = Protector.Int(nhanVienId, 0);
            _draw = Protector.Int(draw, 0);
            _start = Protector.Int(start, 0);
            _length = Protector.Int(length, 0);
            _loginId = Protector.Int(loginId, 0);

            sortName = Protector.String(sortName, "QHGD_ID");
            sortDir = Protector.String(sortDir, "asc");
            _length = _length < 1 ? 100 : _length;

            fields = Protector.String(fields, "");
            search = Protector.String(search, "");
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListQuanHeGiaDinhByCriteriaBiz(context);
                biz.NHANVIEN_ID = _nhanVienId;
                biz.FIELD = fields;
                biz.SEARCH_STRING = search;
                biz.ORDER_CLAUSE = sortName + " " + sortDir;
                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.LOGIN_ID = _loginId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = 0;

                if (result.Count() > 0)
                {
                    var obj = result.FirstOrDefault();
                    _metaData.total = Protector.Int(obj.MAXCNT);
                }

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
