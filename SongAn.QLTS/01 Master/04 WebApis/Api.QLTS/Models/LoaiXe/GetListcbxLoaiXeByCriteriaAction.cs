using SongAn.QLTS.Biz.QLTS.LoaiXe;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.LoaiXe
{
    public class GetListcbxLoaiXeByCriteriaAction
    {
        public string Search { get; set; }
        public int LoaiXeId { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        #region private
        #endregion
        #region init & validate
        private void init() { }

        private void validate() { }
        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListcbxLoaiXeByCriteriaBiz(context);
                biz.Search = Search;
                biz.LoaiXeId = LoaiXeId;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var result = await biz.Execute();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }

        }
    }
}
