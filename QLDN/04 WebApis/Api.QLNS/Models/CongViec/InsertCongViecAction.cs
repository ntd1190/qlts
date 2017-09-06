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

namespace SongAn.QLDN.Api.QLNS.Models.CongViec
{
    public class InsertCongViecAction
    {
        public string DuAnId { get; set; }
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public string NgayBatDau { get; set; }
        public string NgayKetThuc { get; set; }
        public string NgayThatSuBatDau { get; set; }
        public string NgayThatSuKetThuc { get; set; }
        public string SoNgay { get; set; }
        public string TienDo { get; set; }
        public string NoiDungCongViec { get; set; }
        public string ThuanLoiKhoKhan { get; set; }
        public string GiaiPhapKienNghi { get; set; }
        public string MaTrangThai { get; set; }
        public string NguoiXuLy { get; set; }
        public string NguoiTao { get; set; }
        public string GhiChu { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var congviec = new Entity.MSSQL_QLDN_QLNS.Entity.CongViec();
                congviec.DuAnId = Protector.Int(DuAnId);
                congviec.TieuDe = TieuDe;
                congviec.MoTa = MoTa;
                if (NgayBatDau != "" && NgayBatDau != null) congviec.NgayBatDau = DateTime.ParseExact(NgayBatDau, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                if (NgayThatSuBatDau != null && NgayThatSuBatDau != "") congviec.NgayThatSuBatDau = DateTime.ParseExact(NgayThatSuBatDau, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                if (NgayKetThuc != null && NgayKetThuc != "") congviec.NgayKetThuc = DateTime.ParseExact(NgayKetThuc, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                if (NgayThatSuKetThuc != null && NgayThatSuKetThuc != "") congviec.NgayThatSuKetThuc = DateTime.ParseExact(NgayThatSuKetThuc, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                congviec.SoNgay = Protector.Decimal(SoNgay);
                congviec.TienDo = Protector.Int(TienDo);
                congviec.NoiDungCongViec = NoiDungCongViec;
                congviec.ThuanLoiKhoKhan = ThuanLoiKhoKhan;
                congviec.GiaiPhapKienNghi = GiaiPhapKienNghi;
                congviec.MaTrangThai = MaTrangThai;
                congviec.NguoiXuLy = Protector.Int(NguoiXuLy);
                congviec.NguoiTao = Protector.Int(NguoiTao);
                congviec.GhiChu = GhiChu;
                congviec.XoaYN = "N";
                congviec.CtrVersion = 1;
                CongViecRepository repo = new CongViecRepository(context);
                await repo.Insert(congviec);
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "CongViec", congviec.CongViecId, "Insert", congviec.NguoiTao);

                return returnActionResult(HttpStatusCode.OK, congviec, null);
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
