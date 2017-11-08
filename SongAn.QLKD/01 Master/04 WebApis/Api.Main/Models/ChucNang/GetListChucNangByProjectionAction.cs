/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : load danh sách có phân trang
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Data.Repository.QLKD_MAIN;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.Main.Models.ChucNang
{
    public class GetListChucNangByProjectionAction
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var whereClause = string.Format("MaChucNang LIKE N'%{0}%' OR TenChucNang LIKE N'%{0}%'", search);
                var orderClause = sortName + " " + sortDir;
                var total = 0;

                ChucNangRepository repo = new ChucNangRepository(context);
                IEnumerable<dynamic> listChucNang = await repo.SelectAllByCriteriaProjection(fields, whereClause, orderClause, _start, _length);
                total = await repo.SelectAllByCriteriaCount(whereClause);

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return returnActionResult(listChucNang, _metaData);
            }
            catch(FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            _draw = Protector.Int(draw);
            _start = Protector.Int(start);
            _length = Protector.Int(length);

            sortName = string.IsNullOrEmpty(sortName) ? "ChucNangId" : sortName;
            sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
            _length = _length < 1 ? 10 : _length;
            fields = string.IsNullOrEmpty(fields) ? "ChucNangId,MaChucNang,TenChucNang" : fields;
        }

        private void validate()
        {
            //throw new FormatException("hello");
        }

        #region helpers
        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }
        private ActionResultDto returnActionResult(object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = HttpStatusCode.OK;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
        #endregion
    }
}