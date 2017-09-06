﻿using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoPhieuThu
{
    public class UpdateKhoPhieuThuAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu
    {
        private int _HoaDonId;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result  = new ActionResultDto();

                var repo = new KhoPhieuThuRepository(context);
                await repo.UpdatePartial(this,
                nameof(SoPhieu),
                nameof(KhachHangId),
                nameof(NgayThu),
                nameof(LyDo),
                nameof(SoTien),
                nameof(SoTienBangChu),
                nameof(HinhThucThanhToan),
                nameof(NganHang),
                nameof(TaiKhoanCo),
                nameof(TaiKhoanNo),
                nameof(Hinh),
                nameof(GhiChu),
                nameof(Hinh),
                nameof(NguoiNopTien)
                 );
                result.ReturnCode = HttpStatusCode.OK;
                result.ReturnData = new
                {
                    data = this
                };
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoPhieuThu", PhieuThuId, "Update", Protector.Int(NguoiTao));
                return result;
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
            var _id = Protector.Int(PhieuThuId);

            if (_id < 1)
            {
                throw new FormatException("PhieuThuId is empty");
            }
        }

        private void init()
        {
            _HoaDonId = Protector.Int(PhieuThuId);
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
