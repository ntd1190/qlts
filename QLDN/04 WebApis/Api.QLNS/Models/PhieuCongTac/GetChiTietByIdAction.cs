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
    public class GetChiTietByIdAction
    {
        #region public
        public string phieuCongTacIds { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
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

            _length = _length < 1 ? 100 : _length;
            phieuCongTacIds = string.IsNullOrEmpty(phieuCongTacIds) ? "" : phieuCongTacIds;
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

                var biz = new GetChiTietByIdBiz(context);
                biz.PHIEU_CONG_TAC = phieuCongTacIds;
                biz.ORDER_CLAUSE = orderClause;
                biz.SKIP = _start;
                biz.TAKE = _length;

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
