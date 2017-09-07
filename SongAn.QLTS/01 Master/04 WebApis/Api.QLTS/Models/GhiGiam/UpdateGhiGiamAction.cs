using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.GhiGiam
{
    public class UpdateGhiGiamAction
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
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                init();
                var repo = new GhiGiamRepository(context);
                var check = await repo.UpdatePartial(_GhiGiam,
                     nameof(_GhiGiam.SoChungTu),
                     nameof(_GhiGiam.NgayChungTu),
                     nameof(_GhiGiam.NgayGhiTang),
                     nameof(_GhiGiam.PhongBanId),
                     nameof(_GhiGiam.NoiDung)
                     );
                if (!String.IsNullOrEmpty(check.GhiGiamId.ToString()))
                {
                    Biz.QLTS.GhiGiamChiTiet.DeleteGhiGiamChiTietByIdBiz bizct = new Biz.QLTS.GhiGiamChiTiet.DeleteGhiGiamChiTietByIdBiz(context);
                    bizct.GhiGiamId = check.GhiGiamId.ToString();
                    await bizct.Execute();
                    foreach (var item in _listChiTiet)
                    {
                        item.GhiGiamId = check.GhiGiamId;
                        GhiGiamChiTietRepository repoct = new GhiGiamChiTietRepository(context);
                        await repoct.Insert(item);
                    }


                }
                result.data = _GhiGiam;
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
            var _id = Protector.Int(_GhiGiam.GhiGiamId);

            if (_id < 1)
            {
                throw new FormatException("GhiGiamId is empty");
            }
        }

        private void init()
        {
            GhiGiam = Protector.String(GhiGiam, "{}");
            var __GhiGiam = JsonConvert.DeserializeObject<dynamic>(GhiGiam);

            GhiGiam = JsonConvert.SerializeObject(__GhiGiam);
            _GhiGiam = JsonConvert.DeserializeObject<Entity.QLTS.Entity.GhiGiam>(GhiGiam);


            GhiGiamchitiet = Protector.String(GhiGiamchitiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.GhiGiamChiTiet>>(GhiGiamchitiet);
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
