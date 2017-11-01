using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Biz.QLTS.HopDong;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.HopDong
{
    public class UpdateHopDongByIdAction
    {
        #region public
        public string hopDong { get; set; }
        
        #endregion

        #region private
        private Entity.QLTS.Entity.HopDong _hopDong;
        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();

                init();
                validate();

                if (_hopDong.HopDongId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy HopDongId");
                }

                var bizHopDong = new UpdateHopDongByIdBiz(context);

                bizHopDong.HopDongId = Protector.Int(_hopDong.HopDongId);
                bizHopDong.SoHopDong = Protector.String(_hopDong.SoHopDong);
                bizHopDong.NgayHopDong = _hopDong.NgayHopDong;
                bizHopDong.TenNhaThau = Protector.String(_hopDong.TenNhaThau);
                bizHopDong.DaiDien = Protector.String(_hopDong.DaiDien);
                bizHopDong.GiaTriHopDong = Protector.Decimal(_hopDong.GiaTriHopDong);
                bizHopDong.NoiDung = Protector.String(_hopDong.NoiDung);
                bizHopDong.FileDinhKem = Protector.String(_hopDong.FileDinhKem);
                bizHopDong.CoSoId = Protector.Int(_hopDong.CoSoId);
                bizHopDong.NguoiTao = Protector.String(_hopDong.NguoiTao);

                IEnumerable<dynamic> HopDongIdINum = await bizHopDong.Execute();

                return returnActionResult(HttpStatusCode.OK, HopDongIdINum, null);
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
            var _id = Protector.Int(_hopDong.HopDongId);

            if (_id < 1)
            {
                throw new FormatException("HopDongId is empty");
            }
        }

        private void init()
        {
            var __hopDong = JsonConvert.DeserializeObject<dynamic>(hopDong);
            hopDong = JsonConvert.SerializeObject(__hopDong);
            _hopDong = JsonConvert.DeserializeObject<Entity.QLTS.Entity.HopDong>(hopDong);
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
