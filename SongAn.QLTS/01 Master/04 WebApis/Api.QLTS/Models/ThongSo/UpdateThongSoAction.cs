using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.ThongSo;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using System.Data;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.ThongSo
{
    public class UpdateThongSoAction
    {
        public string CauHinhHeThong { get; set; }
        public int NhanVienId { get; set; }
        #region private
        private List<ThongSoEntity>  _ThongSo;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                foreach(var item in _ThongSo)
                {
                    UpdateInsertThongSoBiz biz = new UpdateInsertThongSoBiz(context);
                    biz.ThongSoId = item.ThongSoId;
                    biz.Loai = item.Loai;
                    biz.Ten = item.Ten;
                    biz.TaiSan = item.TaiSan;
                    biz.NhanVienId = NhanVienId;
                    await biz.Execute();
                }
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, _ThongSo, _metaData);
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
            var __CauHinhHeThong = JsonConvert.DeserializeObject<dynamic>(CauHinhHeThong);
            CauHinhHeThong = JsonConvert.SerializeObject(__CauHinhHeThong);
            _ThongSo = JsonConvert.DeserializeObject<List<ThongSoEntity>>(CauHinhHeThong);
            
        }
        public class ThongSoEntity
        {
            public virtual int ThongSoId { get; set; }
            public virtual string Loai { get; set; }
            public virtual string Ten { get; set; }
            public virtual string TaiSan { get; set; }

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
