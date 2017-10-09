using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Helper;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.LapBaoCao
{
    public class UpdateLapBaoCaoAction
    {
        #region PUBLIC
        public string LapBaoCao { get; set; }
        public string BaoCao { get; set; }
        public string NguoiTao { get; set; }
        public string CoSoId { get; set; }
        #endregion
        #region private
        private Entity.QLTS.Entity.LapBaoCao _LapBaoCao;
        private List<ChiTiet> _listChiTiet;
        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                init();
                var repo = new LapBaoCaoRepository(context);
                var check = await repo.UpdatePartial(_LapBaoCao,
                    nameof(_LapBaoCao.KyBaoCao),
                    nameof(_LapBaoCao.TuNgay),
                    nameof(_LapBaoCao.DenNgay),
                    nameof(_LapBaoCao.DienGiai)
                     );
                if (!String.IsNullOrEmpty(check.LapBaoCaoId.ToString()))
                {
                    Biz.QLTS.LapBaoCao.DeleteLapBaoCaoChiTietBiz bizct = new Biz.QLTS.LapBaoCao.DeleteLapBaoCaoChiTietBiz(context);
                    bizct.LapBaoCaoId = check.LapBaoCaoId;
                    await bizct.Execute();
                    foreach (var item in _listChiTiet)
                    {
                        var LapBaoCaoChiTiet = new SongAn.QLTS.Entity.QLTS.Entity.LapBaoCaoChiTiet();
                        LapBaoCaoChiTiet.LapBaoCaoId = check.LapBaoCaoId;
                        LapBaoCaoChiTiet.BaoCaoId = item.BaoCaoId;
                      
                        LapBaoCaoChiTietRepository repoct = new LapBaoCaoChiTietRepository(context);
                        await repoct.Insert(LapBaoCaoChiTiet);
                    }


                }
                result.data = _LapBaoCao;
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
            var _id = Protector.Int(_LapBaoCao.LapBaoCaoId);

            if (_id < 1)
            {
                throw new FormatException("LapBaoCaoId is empty");
            }
        }

        private void init()
        {
            LapBaoCao = Protector.String(LapBaoCao, "{}");
            var __LapBaoCao = JsonConvert.DeserializeObject<dynamic>(LapBaoCao);
            __LapBaoCao.TuNgay = DateTime.ParseExact(__LapBaoCao.TuNgay.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __LapBaoCao.DenNgay = DateTime.ParseExact(__LapBaoCao.DenNgay.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            LapBaoCao = JsonConvert.SerializeObject(__LapBaoCao);
            _LapBaoCao = JsonConvert.DeserializeObject<Entity.QLTS.Entity.LapBaoCao>(LapBaoCao);


            BaoCao = Protector.String(BaoCao, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<ChiTiet>>(BaoCao);
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
        public class ChiTiet
        {

            public virtual int LapBaoCaoId { get; set; }
            public virtual int BaoCaoId { get; set; }
            
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
