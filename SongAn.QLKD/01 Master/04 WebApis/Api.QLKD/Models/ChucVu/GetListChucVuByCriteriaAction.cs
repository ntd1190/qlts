/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : Lộc danh sách nhân viên
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Biz.QLKD.ChucVu;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.ChucVu
{
    public class GetListChucVuByCriteriaAction
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string SEARCH_STRING { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }
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

            sortName = string.IsNullOrEmpty(sortName) ? "ChucVuId" : sortName;
            sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
            _length = _length < 1 ? 10 : _length;

            fields = string.IsNullOrEmpty(fields) ? "CV.ChucVuId,CV.MaChucVu,CV.TenChucVu,CV.CtrVersion" : fields;
            SEARCH_STRING = string.IsNullOrEmpty(SEARCH_STRING) ? "" : SEARCH_STRING;
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

                var biz = new GetListChucVuByCriteriaBiz(context);
                biz.FIELD = fields;
                biz.SEARCH_STRING = SEARCH_STRING;

                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDER_CLAUSE = orderClause;

                IEnumerable<dynamic> listChucVu = await biz.Execute();

                if (listChucVu.Count() > 0)
                {
                    var obj = listChucVu.FirstOrDefault();
                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listChucVu, _metaData);
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
