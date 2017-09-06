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
    public class InsertIssueAction
    {
        public string KhachHangId { get; set; }
        public string NgayTao { get; set; }
        public string NguoiLienHe { get; set; }
        public string DienThoai { get; set; }
        public string DiDong { get; set; }
        public string Email { get; set; }
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public string LoaiIssue { get; set; }
        public string NgayDeNghi { get; set; }
        public string NguoiXuLy { get; set; }
        public string NguoiTao { get; set; }
        public string CachXuLy { get; set; }
        public string HuongXuly { get; set; }
        public string MaTrangThai { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var issuae = new Entity.MSSQL_QLDN_QLNS.Entity.Issue();
                issuae.KhachHangId = Protector.Int(KhachHangId);
                if (NgayTao != null) issuae.NgayTao = DateTime.ParseExact(NgayTao, "dd/MM/yyyy HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                issuae.NguoiLienHe = NguoiLienHe;
                issuae.DienThoai = DienThoai;
                issuae.DiDong = DiDong;
                issuae.Email = Email;
                issuae.TieuDe = TieuDe;
                issuae.MoTa = MoTa;
                issuae.LoaiIssue = Protector.Short(LoaiIssue);
                if (NgayDeNghi != null) issuae.NgayDeNghi = DateTime.ParseExact(NgayDeNghi, "dd/MM/yyyy HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                issuae.NguoiXuLy = Protector.Int(NguoiXuLy);
                issuae.CachXuLy = CachXuLy;
                issuae.HuongXuLy = HuongXuly;
                issuae.MaTrangThai = MaTrangThai;
                if(MaTrangThai=="3") issuae.NgayKetThuc = DateTime.Now;
                issuae.NgayTao = DateTime.Now;
                issuae.NguoiTao = Protector.Int(NguoiTao);
                issuae.XoaYn = "N";
                issuae.CtrVersion = 1;

                IssueRepository repo = new IssueRepository(context);
                await repo.Insert(issuae);
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "Issue", issuae.IssueId, "Insert",issuae.NguoiTao);
                return returnActionResult(HttpStatusCode.OK, issuae, null);
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
