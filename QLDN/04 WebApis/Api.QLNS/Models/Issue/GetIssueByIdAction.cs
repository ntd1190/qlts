using SongAn.QLDN.Biz.QLNS.Issue;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.Issue
{
    public class GetIssueByIdAction
    {
        public string IssueId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                /* kiểm tra input */
                var _error = validate();

                if (_error.code > 0)
                {
                    return returnActionError(HttpStatusCode.BadRequest, _error.message);
                }

                /* convert input */
                var _IssueId = Protector.Int(IssueId);
                GetListIssueByCriteraBiz biz = new GetListIssueByCriteraBiz(context);
                biz.IssueId = IssueId;
                biz.FieldsField = "A.*,B.Ten as KhachHang,C.Ho,C.Ten";
                biz.OrderClause = "A.IssueId asc";
                var Issue = await biz.Execute();

                if (Issue == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy IssueId '{0}'", _IssueId));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = Issue
                };

                return _result;
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

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

        private dynamic validate()
        {
            dynamic _error = new System.Dynamic.ExpandoObject();

            _error.code = 0;
            _error.message = string.Empty;

            var _IssueId = Protector.Int(IssueId);

            if (_error.code == 0 && _IssueId < 1)
            {
                _error.code = 1;
                _error.message = "IssueId is empty";
            }

            return _error;
        }
    }
}
