
using System.Threading.Tasks;
using System;
using System.Net;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Collections.Generic;
using SongAn.QLTS.Util.Common.Helper;
using Newtonsoft.Json;
using System.Globalization;

namespace  SongAn.QLTS.Api.QLTS.Models.LapBaoCao
{
    public class InsertLapBaoCaoAction 
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
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();
                init();
    
                LapBaoCaoRepository repo = new LapBaoCaoRepository(context);
                var check = await repo.Insert(_LapBaoCao);
                if(!String.IsNullOrEmpty(check.LapBaoCaoId.ToString()))
                {
                    foreach(var item in _listChiTiet)
                    {
                        var LapBaoCaoChiTiet = new SongAn.QLTS.Entity.QLTS.Entity.LapBaoCaoChiTiet();
                        LapBaoCaoChiTiet.LapBaoCaoId = check.LapBaoCaoId;
                        LapBaoCaoChiTiet.BaoCaoId = item.BaoCaoId;
                        LapBaoCaoChiTietRepository repoct = new LapBaoCaoChiTietRepository(context);
                        await repoct.Insert(LapBaoCaoChiTiet);
                    }
                }

                return returnActionResult(HttpStatusCode.OK, _LapBaoCao, null);
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
            LapBaoCao = Protector.String(LapBaoCao, "{}");
            var __LapBaoCao = JsonConvert.DeserializeObject<dynamic>(LapBaoCao);
            __LapBaoCao.TuNgay = DateTime.ParseExact(__LapBaoCao.TuNgay.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __LapBaoCao.DenNgay = DateTime.ParseExact(__LapBaoCao.DenNgay.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            LapBaoCao = JsonConvert.SerializeObject(__LapBaoCao);
            _LapBaoCao = JsonConvert.DeserializeObject<Entity.QLTS.Entity.LapBaoCao>(LapBaoCao);
            _LapBaoCao.NguoiTao = int.Parse(NguoiTao);
            _LapBaoCao.NgayTao = DateTime.Now;
            _LapBaoCao.CtrVersion = 1;

            BaoCao = Protector.String(BaoCao, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<ChiTiet>>(BaoCao);
        }
        public class ChiTiet
        {
            
            public virtual int LapBaoCaoId { get; set; }
            public virtual int BaoCaoId { get; set; }
           
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
