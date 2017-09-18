using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSam
{
    public class UpdateKeHoachMuaSamAction
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
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                init();
                var repo = new KeHoachMuaSamRepository(context);
                var check = await repo.UpdatePartial(_KeHoachMuaSam,
                    nameof(_KeHoachMuaSam.Nam),
                    nameof(_KeHoachMuaSam.NoiDung)
                     );
                if (!String.IsNullOrEmpty(check.MuaSamId.ToString()))
                {
                    Biz.QLTS.KeHoachMuaSamChiTiet.DeleteKeHoachMuaSamChiTietByIdBiz bizct = new Biz.QLTS.KeHoachMuaSamChiTiet.DeleteKeHoachMuaSamChiTietByIdBiz(context);
                    bizct.MuaSamId = check.MuaSamId.ToString();
                    await bizct.Execute();
                    foreach (var item in _listChiTiet)
                    {
                        item.MuaSamId = check.MuaSamId;
                        KeHoachMuaSamChiTietRepository repoct = new KeHoachMuaSamChiTietRepository(context);
                        await repoct.Insert(item);
                    }


                }
                result.data = _KeHoachMuaSam;
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
            var _id = Protector.Int(_KeHoachMuaSam.MuaSamId);

            if (_id < 1)
            {
                throw new FormatException("MuaSamId is empty");
            }
        }

        private void init()
        {
            kehoachmuasam = Protector.String(kehoachmuasam, "{}");
            var __KeHoachMuaSam = JsonConvert.DeserializeObject<dynamic>(kehoachmuasam);

            kehoachmuasam = JsonConvert.SerializeObject(__KeHoachMuaSam);
            _KeHoachMuaSam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.KeHoachMuaSam>(kehoachmuasam);


            kehoachmuasamchitiet = Protector.String(kehoachmuasamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.KeHoachMuaSamChiTiet>>(kehoachmuasamchitiet);
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
