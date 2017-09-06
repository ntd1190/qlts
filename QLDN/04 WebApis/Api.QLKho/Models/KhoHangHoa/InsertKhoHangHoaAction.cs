using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoHangHoa
{
    public class InsertKhoHangHoaAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa
    {

        #region public
        /*public string MaKhoHangHoa { get; set; }
        public string TenKhoHangHoa { get; set; }
        public string GhiChu { get; set; } */
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var hanghoa = new Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa();
                hanghoa.MaHangHoa = MaHangHoa;
                hanghoa.TenHangHoa = TenHangHoa;
                hanghoa.TuKhoa = TuKhoa;
                hanghoa.DonViTinh = DonViTinh;
                hanghoa.GiaMua = GiaMua;
                hanghoa.GiaBan = GiaBan;
                hanghoa.ThueMua = ThueMua;
                hanghoa.ThueBan = ThueBan;
                hanghoa.CauHinh = CauHinh;
                hanghoa.Hinh = Hinh;
                hanghoa.ThoiGianBaoHanh = ThoiGianBaoHanh;
                hanghoa.NhomHangHoaId = NhomHangHoaId;
                hanghoa.LoaiHangHoaId = LoaiHangHoaId;
                hanghoa.NhaCungCapId = NhaCungCapId;
                hanghoa.HangSanXuatId = HangSanXuatId;
                hanghoa.NuocSanXuatId = NuocSanXuatId;
                hanghoa.MoTa = MoTa;
                hanghoa.GhiChu = GhiChu;
                hanghoa.NguoiTao = NguoiTao;
                hanghoa.NgayTao = DateTime.Now;
                hanghoa.XoaYN = "N";
                KhoHangHoaRepository repo = new KhoHangHoaRepository(context);
                await repo.Insert(hanghoa);
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoHangHoa", hanghoa.HangHoaId, "Insert", hanghoa.NguoiTao);
                return returnActionResult(HttpStatusCode.OK, hanghoa, null);
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

        private void init() { }

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
