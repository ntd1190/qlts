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

namespace SongAn.QLDN.Api.QLNS.Models.KhenThuongCaNhan
{
    public class InsertKhenThuongCaNhanAction 
    {
        public string ngay { get; set; }
        public string Tien { get; set; }
        public string LyDo { get; set; }
        public string HinhThuc { get; set; }
        public string BangChu { get; set; }
        public string VanBanSo { get; set; }
        public string NhanVienIds { get; set; }
        public string NguoiTao { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var khenthuong = new Entity.MSSQL_QLDN_QLNS.Entity.KhenThuongCaNhan();
                foreach (var nhanvienid in NhanVienIds.Split('|'))
                {
                    khenthuong.Ngay = DateTime.ParseExact(ngay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                    khenthuong.Tien = Protector.Int(Tien);
                    khenthuong.BangChu = BangChu;
                    khenthuong.LyDo = LyDo;
                    khenthuong.HinhThuc = Protector.Short(HinhThuc);
                    khenthuong.VanBanSo = Protector.Int(VanBanSo);
                    khenthuong.NhanVienId = Protector.Int(nhanvienid);
                    khenthuong.NgayTao = DateTime.Now;
                    khenthuong.NguoiTao = Protector.Int(NguoiTao);
                    khenthuong.XoaYN = "N";
                    khenthuong.CtrVersion = 1;

                    KhenThuongCaNhanRepository repo = new KhenThuongCaNhanRepository(context);
                    await repo.Insert(khenthuong);
                    InsertLuocSuAction ls = new InsertLuocSuAction();
                    ls.InsertLuocSu(context, "KhenThuongCaNhan", khenthuong.KhenThuongCaNhanId, "Insert", khenthuong.NguoiTao);
                }
                return returnActionResult(HttpStatusCode.OK, khenthuong, null);
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
