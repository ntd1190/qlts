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

namespace SongAn.QLDN.Api.QLNS.Models.TamUng
{
    public class InsertTamUngAction
    {
        public string NhanVienIds { get; set; }
        public string So { get; set; }
        public string Ngay { get; set; }
        public string Tien { get; set; }
        public string BangChu { get; set; }
        public string LyDo { get; set; }
        public string NguoiTao { get; set; }
        public string AnyDesk { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var tamung = new Entity.MSSQL_QLDN_QLNS.Entity.TamUng();
                foreach (var nhanvienid in NhanVienIds.Split('|'))
                {
                    tamung.NhanVienId = Protector.Int(nhanvienid);
                    tamung.So = So;
                    tamung.Ngay = DateTime.ParseExact(Ngay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                    tamung.Tien = Protector.Int(Tien);
                    tamung.BangChu = BangChu;
                    tamung.LyDo = LyDo;
                    tamung.NguoiTao = Protector.Int(NguoiTao);
                    tamung.NgayTao = DateTime.Now;
                    tamung.MaTrangThai = "TU_DD";
                    tamung.XoaYN = "N";
                    tamung.CtrVersion = 1;

                    TamUngRepository repo = new TamUngRepository(context);
                    await repo.Insert(tamung);
                    InsertLuocSuAction ls = new InsertLuocSuAction();
                    ls.InsertLuocSu(context, "TamUng", tamung.TamUngId, "Insert", tamung.NguoiTao);
                }
                return returnActionResult(HttpStatusCode.OK, tamung, null);
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
