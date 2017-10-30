using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Biz.QLTS.NhanVien;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace  SongAn.QLTS.Api.QLTS.Models.NhanVien
{
    public class UpdateNhanVienAction 
    {
        #region public
        public string nhanVien { get; set; }
        public string phongBanId { get; set; }
        public string coSoId { get; set; }
        #endregion

        #region private
        private Entity.QLTS.Entity.NhanVien _nhanVien;
        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

                init();
                validate();

                if (_nhanVien.NhanVienId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy NhanVienId");
                }

                var bizNhanVien = new UpdateNhanVienByIdBiz(context);

                bizNhanVien.NhanVienId = Protector.Int(_nhanVien.NhanVienId);
                bizNhanVien.MaNhanVien = Protector.String(_nhanVien.MaNhanVien);
                bizNhanVien.TenNhanVien = Protector.String(_nhanVien.TenNhanVien);
                bizNhanVien.DienThoai = Protector.String(_nhanVien.DienThoai);
                bizNhanVien.ChucDanh = Protector.String(_nhanVien.ChucDanh);
                bizNhanVien.Email = Protector.String(_nhanVien.Email);
                bizNhanVien.DiaChi = Protector.String(_nhanVien.DiaChi);
                bizNhanVien.GhiChu = Protector.String(_nhanVien.GhiChu);
                bizNhanVien.NguoiTao = Protector.Int(_nhanVien.NguoiTao);
                bizNhanVien.CoSoId = Protector.Int(coSoId);
                bizNhanVien.PhongBanId = Protector.String(phongBanId);

                IEnumerable<dynamic> NhanVienIdINum = await bizNhanVien.Execute();

                return returnActionResult(HttpStatusCode.OK, NhanVienIdINum, null);
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
            var _id = Protector.Int(_nhanVien.NhanVienId);

            if (_id < 1)
            {
                throw new FormatException("NhanVienId is empty");
            }
        }

        private void init()
        {
            var __nhanvien = JsonConvert.DeserializeObject<dynamic>(nhanVien);
            nhanVien = JsonConvert.SerializeObject(__nhanvien);
            _nhanVien = JsonConvert.DeserializeObject<Entity.QLTS.Entity.NhanVien>(nhanVien);

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
    }
}
