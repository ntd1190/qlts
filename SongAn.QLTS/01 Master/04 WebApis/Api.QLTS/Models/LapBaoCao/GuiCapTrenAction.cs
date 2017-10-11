using SongAn.QLTS.Biz.QLTS.LapBaoCao;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.LapBaoCao
{
    public class GuiCapTrenAction
    {
        public string ids { get; set; }
        #region private
        private List<int> _listId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var count = 1;
                var repo = new LapBaoCaoRepository(context);
                var biz = new DeleteLapBaoCaoByIdBiz(context);
                for (int i = 0; i < _listId.Count; i++)
                {
                    Entity.QLTS.Entity.LapBaoCao _LapBaoCao = new Entity.QLTS.Entity.LapBaoCao();
                    _LapBaoCao.LapBaoCaoId = _listId[i];
                    _LapBaoCao.GuiCapTren = 1;
                    _LapBaoCao.NgayGui = DateTime.Now;
                    var check = await repo.UpdatePartial(_LapBaoCao,
                            nameof(_LapBaoCao.GuiCapTren),
                                nameof(_LapBaoCao.NgayGui)
                         );
                }
                return returnActionResult(HttpStatusCode.OK, count, null);
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
            var _ids = ids.Split(',');
            _listId = new List<int>();

            for (int i = 0; i < _ids.Length; i++)
            {
                _listId.Add(Protector.Int(_ids[i]));
            }
        }

        private void validate()
        {
            for (int i = 0; i < _listId.Count; i++)
            {
                if (_listId[i] < 1)
                {
                    throw new FormatException("LapBaoCaoId không hợp lệ");
                }
            }
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
