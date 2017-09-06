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

namespace SongAn.QLDN.Api.QLNS.Models.DuAn
{
    public class InsertDuAnAction
    {
        public string TenDuAn { get; set; }
        public string MoTa { get; set; }
        public string MaTrangThai { get; set; }
        public string PhongBan { get; set; }
        public string NhanVien { get; set; }
        public string QuanLy { get; set; }
        public string NgayBatDau { get; set; }
        public string NgayThatSuBatDau { get; set; }
        public string NgayKetThuc { get; set; }
        public string NgayThatSuKetThuc { get; set; }
        public string NguoiTao { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var duan = new Entity.MSSQL_QLDN_QLNS.Entity.DuAn();
                duan.TenDuAn = TenDuAn;
                duan.MoTa = MoTa;
                duan.MaTrangThai = MaTrangThai;
                duan.PhongBan = Protector.Int(PhongBan);
                duan.QuanLy = Protector.Int(QuanLy);
                if (NgayBatDau!="" && NgayBatDau != null) duan.NgayBatDau = DateTime.ParseExact(NgayBatDau, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                if (NgayThatSuBatDau != null && NgayThatSuBatDau != "") duan.NgayThatSuBatDau = DateTime.ParseExact(NgayThatSuBatDau, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                if (NgayKetThuc != null && NgayKetThuc != "") duan.NgayKetThuc = DateTime.ParseExact(NgayKetThuc, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                if (NgayThatSuKetThuc != null && NgayThatSuKetThuc != "") duan.NgayThatSuKetThuc = DateTime.ParseExact(NgayThatSuKetThuc, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                duan.NguoiTao = Protector.Int(NguoiTao);
                duan.NgayTao = DateTime.Now;
                duan.XoaYN = "N";
                duan.CtrVersion = 1;
                DuAnRepository repo = new DuAnRepository(context);
                await repo.Insert(duan);
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "DuAn", duan.DuAnId, "Insert", duan.NguoiTao);
                if(NhanVien != "" && NhanVien != null)
                {
                    var nvda = new Entity.MSSQL_QLDN_QLNS.Entity.NhanVienDuAn();
                    var nvids = NhanVien.Split('|');
                    foreach(var nv in nvids)
                    {
                        nvda.DuAnId = duan.DuAnId;
                        nvda.XoaYN = "N";
                        nvda.NhanVienId = Protector.Int(nv);
                        await repo.InsertNV(nvda);
                    }
                }
                return returnActionResult(HttpStatusCode.OK, duan, null);
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
