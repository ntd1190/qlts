using SongAn.QLTS.Biz.QLTS.HienTrangSuDung;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.HienTrangSuDung
{
    public class GetListcbxHienTrangSuDungByCriteriaAction
    {
        public string Search { get; set; }
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
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

                var biz = new GetListcbxHienTrangSuDungByCriteriaBiz(context);
                biz.Search = Search;
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
