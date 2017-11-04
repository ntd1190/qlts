using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using SongAn.QLDN.Util.Common.Helper;
using System.Globalization;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
namespace SongAn.QLDN.Api.QLNS.Models.Issue
{
    public class UpdateIssueAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.Issue
    {
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                if (MaTrangThai == "3") NgayKetThuc = DateTime.Now;
                dynamic result = new System.Dynamic.ExpandoObject();
                var repo = new IssueRepository(context);
                await repo.UpdatePartial(this,
                    nameof(KhachHangId),
                    nameof(NguoiLienHe),
                    nameof(DienThoai),
                    nameof(DiDong),
                    nameof(Email),
                    nameof(TieuDe),
                    nameof(MoTa),
                    nameof(LoaiIssue),
                    nameof(NgayDeNghi),
                    nameof(NgayKetThuc),
                    nameof(NguoiXuLy),
                    nameof(CachXuLy),
                    nameof(HuongXuLy),
                    nameof(DanhGiaId),
                    nameof(MaTrangThai)
                     );
                result.data = this;
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "Issue", IssueId, "Update",NguoiTao);
                return returnActionResult(this, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        private void validate()
        {
            var _id = Protector.Int(IssueId);

            if (_id < 1)
            {
                throw new FormatException("IsuaeId is empty");
            }
        }

        private void init()
        {

            _CtrVersion = Protector.Int(CtrVersion);

            // 2017.07.11 binhnt them chuc nang update NgayKetThuc
            if(MaTrangThai == "3") // trang thai: da xu ly
            {
                NgayKetThuc = DateTime.Now;
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
    }
}
