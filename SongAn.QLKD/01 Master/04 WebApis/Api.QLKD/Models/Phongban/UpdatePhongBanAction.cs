﻿using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using System.Threading.Tasks;
using System;
using SongAn.QLKD.Util.Common.Helper;
using System.Net;

namespace  SongAn.QLKD.Api.QLKD.Models.Phongban
{
    public class UpdatePhongBanAction : SongAn.QLKD.Entity.QLKD.Entity.PhongBan
    {
        private int _phongbanId;
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

            var repo = new PhongBanRepository(context);
            await repo.UpdatePartial(this,
                nameof(PhongBan.MaPhongBan),
                nameof(PhongBan.TenPhongBan),
                nameof(PhongBan.GhiChu),
                nameof(PhongBan.XoaYN)
                 );
            result.data = this;
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
            var _id = Protector.Int(PhongBanId);

            if (_id < 1)
            {
                throw new FormatException("PhongBanId is empty");
            }
        }

        private void init()
        {
            _phongbanId = Protector.Int(PhongBanId);
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