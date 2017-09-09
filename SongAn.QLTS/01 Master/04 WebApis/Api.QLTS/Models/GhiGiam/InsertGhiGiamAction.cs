
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Collections.Generic;
using SongAn.QLTS.Util.Common.Helper;
using Newtonsoft.Json;
using System.Globalization;

namespace  SongAn.QLTS.Api.QLTS.Models.GhiGiam
{
    public class InsertGhiGiamAction 
    {

        #region PUBLIC
        public string GhiGiam { get; set; }
        public string GhiGiamchitiet { get; set; }
        public string NguoiTao { get; set; }
        public string CoSoId { get; set; }
        #endregion
        #region private
        private Entity.QLTS.Entity.GhiGiam _GhiGiam;
        private List<Entity.QLTS.Entity.GhiGiamChiTiet> _listChiTiet;
        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();
                init();
    
                GhiGiamRepository repo = new GhiGiamRepository(context);
                var check = await repo.Insert(_GhiGiam);
                if(!String.IsNullOrEmpty(check.GhiGiamId.ToString()))
                {
                    foreach(var item in _listChiTiet)
                    {
                        item.GhiGiamId = check.GhiGiamId;
                        GhiGiamChiTietRepository repoct = new GhiGiamChiTietRepository(context);
                        await repoct.Insert(item);
                    }
                }

                return returnActionResult(HttpStatusCode.OK, _GhiGiam, null);
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
            GhiGiam = Protector.String(GhiGiam, "{}");
            var __GhiGiam = JsonConvert.DeserializeObject<dynamic>(GhiGiam);
            __GhiGiam.NgayChungTu = DateTime.ParseExact(__GhiGiam.NgayChungTu.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __GhiGiam.NgayGhiGiam = DateTime.ParseExact(__GhiGiam.NgayGhiGiam.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            GhiGiam = JsonConvert.SerializeObject(__GhiGiam);
            _GhiGiam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.GhiGiam>(GhiGiam);
            _GhiGiam.CoSoId = int.Parse(CoSoId);
            _GhiGiam.NguoiTao = int.Parse(NguoiTao);
            _GhiGiam.NgayTao = DateTime.Now;
            _GhiGiam.CtrVersion = 1;

            GhiGiamchitiet = Protector.String(GhiGiamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.GhiGiamChiTiet>>(GhiGiamchitiet);
        }

        private void validate() {  }

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
