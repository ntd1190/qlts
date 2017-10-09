
using SongAn.QLTS.Biz.QLTS.LapBaoCao;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace  SongAn.QLTS.Api.QLTS.Models.LapBaoCao
{
    public class GetListDMBaoCaoAction
    {
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                GetListDMBaoCaoBiz biz = new GetListDMBaoCaoBiz(context);
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;
                IEnumerable<dynamic> LapBaoCaoChiTiet = await biz.Execute();

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = LapBaoCaoChiTiet
                };

                return _result;
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
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

        
    }
}
