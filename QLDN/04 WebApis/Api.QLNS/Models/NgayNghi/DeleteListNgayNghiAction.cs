using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.NgayNghi
{
    public class DeleteListNgayNghiAction
    {
        public string ids { get; set; }
        #region private
        private List<DateTime> _listId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var count = 0;

                var repo = new NgayNghiRepository(context);

                for (int i = 0; i < _listId.Count; i++)
                {
                    if (_listId[i].ToString()!="" && await repo.Delete(_listId[i]))
                    {
                        count++;
                    }
                }

                return returnActionResult(HttpStatusCode.OK, count, null);
            }
            catch (FormatException ex)
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
            var _ids = ids.Split(',');
            _listId = new List<DateTime>();

            for (int i = 0; i < _ids.Length; i++)
            {
                _listId.Add(DateTime.ParseExact(_ids[i], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")));
            }
        }

        private void validate()
        {
            for (int i = 0; i < _listId.Count; i++)
            {
                if (_listId[i].ToString() == "")
                {
                    throw new FormatException("NgayNghiId không hợp lệ");
                }
            }
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

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
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
