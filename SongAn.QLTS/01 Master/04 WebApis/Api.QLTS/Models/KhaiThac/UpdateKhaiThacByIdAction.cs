using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhaiThac;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.KhaiThac
{
    public class UpdateKhaiThacByIdAction
    {
        public int KhaiThacId { get; set; }
        public int TaiSanId { get; set; }
        public int PhongBanId { get; set; }
        public int NhanVienIdKT { get; set; }
        public int KhachHangNCCId { get; set; }
        public string SoChungTu { get; set; }
        public decimal SoLuongKhaiThac { get; set; }
        public decimal DonGiaKhaiThac { get; set; }
        public string ThoiGianBatDau { get; set; }
        public string ThoiGianKetThuc { get; set; }
        public decimal TienThu { get; set; }
        public decimal NopNganSach { get; set; }
        public decimal DonVi { get; set; }
        public string GhiChu { get; set; }
        public int CtrVersion { get; set; }
        public string HopDongId { get; set; }

        #region private

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (Protector.Int(KhaiThacId) < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy KhaiThacId");
                }

                var bizHeader = new UpdateKhaiThacByIdBiz(context);

                bizHeader.KhaiThacId = Protector.Int(KhaiThacId);
                bizHeader.TaiSanId = Protector.Int(TaiSanId);
                bizHeader.PhongBanId = Protector.Int(PhongBanId);
                bizHeader.NhanVienIdKT = Protector.Int(NhanVienIdKT);
                bizHeader.KhachHangNCCId = Protector.Int(KhachHangNCCId);
                bizHeader.SoChungTu = SoChungTu;
                bizHeader.SoLuongKhaiThac = Protector.Decimal(SoLuongKhaiThac);
                bizHeader.DonGiaKhaiThac = Protector.Decimal(DonGiaKhaiThac);
                bizHeader.ThoiGianBatDau = DateTime.ParseExact(ThoiGianBatDau, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                bizHeader.ThoiGianKetThuc = DateTime.ParseExact(ThoiGianKetThuc, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")); ;
                bizHeader.TienThu = Protector.Decimal(TienThu);
                bizHeader.NopNganSach = Protector.Decimal(NopNganSach);
                bizHeader.DonVi = Protector.Decimal(DonVi);
                bizHeader.GhiChu = GhiChu;
                bizHeader.CtrVersion = Protector.Int(CtrVersion);
                bizHeader.HopDongId = Protector.Int(HopDongId);

                IEnumerable<dynamic> result = await bizHeader.Execute();

                
                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
           
        }

        private void validate()
        {

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
