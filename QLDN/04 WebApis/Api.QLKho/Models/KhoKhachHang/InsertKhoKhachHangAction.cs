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

namespace SongAn.QLDN.Api.QLNS.Models.KhoKhachHang
{
    public class InsertKhoKhachHangAction
    {
        public string Ma { get; set; }
        public string Ten { get; set; }
        public string Loai { get; set; }
        public string DienThoai { get; set; }
        public string DiDong { get; set; }
        public string Email { get; set; }
        public string DiaChi { get; set; }
        public string Tinh { get; set; }
        public string Huyen { get; set; }
        public string Xa { get; set; }
        public string AnyDesk { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var khachhang = new Entity.MSSQL_QLDN_QLNS.Entity.KhoKhachHang();
                khachhang.Ma = Ma;
                khachhang.Ten = Ten;
                khachhang.Loai = Protector.Short(Loai);
                khachhang.DienThoai = DienThoai;
                khachhang.DiDong = DiDong;
                khachhang.Email = Email;
                khachhang.DiaChi = DiaChi;
                khachhang.TinhThanhPhoId = Protector.Short(Tinh);
                khachhang.QuanHuyenId = Protector.Short(Huyen);
                khachhang.PhuongXaId = Protector.Short(Xa);
                khachhang.AnyDesk = AnyDesk;
                khachhang.NgayTao = DateTime.Now;
                khachhang.NguoiTao = 1;
                khachhang.XoaYN = "N";
                khachhang.CtrVersion = 1;

                KhoKhachHangRepository repo = new KhoKhachHangRepository(context);
                await repo.Insert(khachhang);
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "KhoKhachHang", khachhang.KhachHangId, "Insert", 0);
                return returnActionResult(HttpStatusCode.OK, khachhang, null);
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
