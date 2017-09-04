
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Collections.Generic;
using SongAn.QLTS.Util.Common.Helper;
using Newtonsoft.Json;

namespace  SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSam
{
    public class InsertKeHoachMuaSamAction 
    {

        #region PUBLIC
        public string kehoachmuasam { get; set; }
        public string kehoachmuasamchitiet { get; set; }
        public string NguoiTao { get; set; }
        public string CoSoId { get; set; }
        #endregion
        #region private
        private Entity.QLTS.Entity.KeHoachMuaSam _KeHoachMuaSam;
        private List<Entity.QLTS.Entity.KeHoachMuaSamChiTiet> _listChiTiet;
        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();
                init();
    
                KeHoachMuaSamRepository repo = new KeHoachMuaSamRepository(context);
                var check = await repo.Insert(_KeHoachMuaSam);
                if(!String.IsNullOrEmpty(check.MuaSamId.ToString()))
                {
                    foreach(var item in _listChiTiet)
                    {
                        item.MuaSamId = check.MuaSamId;
                        KeHoachMuaSamChiTietRepository repoct = new KeHoachMuaSamChiTietRepository(context);
                        await repoct.Insert(item);
                    }
                }

                return returnActionResult(HttpStatusCode.OK, _KeHoachMuaSam, null);
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
            kehoachmuasam = Protector.String(kehoachmuasam, "{}");
            var __KeHoachMuaSam = JsonConvert.DeserializeObject<dynamic>(kehoachmuasam);

            kehoachmuasam = JsonConvert.SerializeObject(__KeHoachMuaSam);
            _KeHoachMuaSam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.KeHoachMuaSam>(kehoachmuasam);
            _KeHoachMuaSam.CoSoId = int.Parse(CoSoId);
            _KeHoachMuaSam.NguoiTao = int.Parse(NguoiTao);
            _KeHoachMuaSam.NgayTao = DateTime.Now;
            _KeHoachMuaSam.CtrVersion = 1;

            kehoachmuasamchitiet = Protector.String(kehoachmuasamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.KeHoachMuaSamChiTiet>>(kehoachmuasamchitiet);
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
