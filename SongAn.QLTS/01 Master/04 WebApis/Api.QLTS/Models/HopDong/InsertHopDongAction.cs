
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Entity.QLTS.Entity;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Biz.QLTS.HopDong;
using Newtonsoft.Json;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.HopDong
{
    public class InsertHopDongAction
    {
        #region public
        public string hopDong { get; set; }
        #endregion

        #region private
        private Entity.QLTS.Entity.HopDong _hopDong;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHopDong = new InsertHopDongBiz(context);

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
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            var __hopDong = JsonConvert.DeserializeObject<dynamic>(hopDong);
            __hopDong.NgayNhap = DateTime.ParseExact(__hopDong.NgayHopDong.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            hopDong = JsonConvert.SerializeObject(__hopDong);
            _hopDong = JsonConvert.DeserializeObject<Entity.QLTS.Entity.HopDong>(hopDong);
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
