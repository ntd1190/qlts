
using SongAn.QLKD.Biz.QLKD.NhanVien;
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class getListNhanVienByQuickSearchAction
    {
        #region public
        public string fields { get; set; }
        public string search { get; set; }

        /*
         * THÔNG TIN PHÂN TRANG */
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
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

            sortName = string.IsNullOrEmpty(sortName) ? "NV.NhanVienId" : sortName;
            sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
            _length = _length < 1 ? 100 : _length;

            fields = string.IsNullOrEmpty(fields) ? "NV.NhanVienId,NV.Ma,NV.Ho,NV.Ten" : fields;
            search = string.IsNullOrEmpty(search) ? "" : search;
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

                var biz = new GetListNhanVienByCriteriaBiz(context);
                biz.FIELD = fields;
                biz.SEARCH_STRING = search;

                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDER_CLAUSE = orderClause;

                IEnumerable<dynamic> listNhanVien = await biz.Execute();


                if (listNhanVien.Count() > 0)
                {
                    var obj = listNhanVien.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNhanVien, _metaData);
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
