/*****************************************************************************
1. Create Date : 2017.04.21
2. Creator     : Nguyen Thanh Binh
3. Description : lấy danh sách cột
4. History     : 2017.04.21(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Biz.Main.CauHinhFormCot;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.Main.Models.CauHinhFormCot
{
    public class GetListCauHinhCotByCriteriaAction
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }

        public string search { get; set; }
        public string maForm { get; set; }
        public string userId { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        private int _userId;
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _draw = Protector.Int(draw, 1);
            _start = Protector.Int(start, 0);
            _length = Protector.Int(length, 0);

            sortName = Protector.String(sortName);
            sortDir = Protector.String(sortDir);

            fields = Protector.String(fields);
            search = Protector.String(search);
            maForm = Protector.String(maForm);
            _userId = Protector.Int(userId);
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

                var biz = new GetListCauHinhCotByCriteriaBiz(context);
                biz.FieldsField = fields;
                biz.SearchString = search;
                biz.MaForm = maForm;
                biz.UserId = _userId;

                biz.Skip = _start;
                biz.Take = _length;
                biz.OrderClause = orderClause;

                IEnumerable<dynamic> data = await biz.Execute();


                if (data.Count() > 0)
                {
                    var obj = data.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, data, _metaData);
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
