﻿using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;

namespace  SongAn.QLTS.Api.QLTS.Models.NhaCungCap
{
    public class UpdateNhaCungCapAction : SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap
    {
        private int _NhaCungCapId;
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new NhaCungCapRepository(context);
            await repo.UpdatePartial(this,
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.MaNhaCungCap),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.TenNhaCungCap),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.Nhom),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.DaiDien),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.DienThoai),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.DiDong),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.MaSoThue),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.TKNganHang),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.TenNganHang),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.DiaChi),
                nameof(SongAn.QLTS.Entity.QLTS.Entity.NhaCungCap.GhiChu)
                 );
            result.data = this;
            return returnActionResult(HttpStatusCode.OK, result.data, null);
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
            var _id = Protector.Int(NhaCungCapId);

            if (_id < 1)
            {
                throw new FormatException("NhaCungCapId is empty");
            }
        }

        private void init()
        {
            _NhaCungCapId = Protector.Int(NhaCungCapId);
            _CtrVersion = Protector.Int(CtrVersion);
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
