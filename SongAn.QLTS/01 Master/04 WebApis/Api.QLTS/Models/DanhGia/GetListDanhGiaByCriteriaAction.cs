using SongAn.QLTS.Biz.QLTS.DanhGia;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.DanhGia
{
    public class GetListDanhGiaByCriteriaAction
    {
        #region public
        public string Search { get; set; }
        public string TaiSanIds { get; set; }
        public string PhongBanIds { get; set; }
        public string NhanVienIds { get; set; }

        public string sortName { get; set; }
        public string sortDir { get; set; }
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }

        public int COSO_ID { get; set; }
        public int NHANVIEN_ID { get; set; }
        #endregion

        #region private
        private string _orderClause;
        #endregion

        #region init & validate
        private void init()
        {
            Search = Protector.String(Search, "");
            TaiSanIds = Protector.String(TaiSanIds, "");
            PhongBanIds = Protector.String(PhongBanIds, "");
            NhanVienIds = Protector.String(NhanVienIds, "");
            sortName = Protector.String(sortName, "MAXCNT");
            sortDir = Protector.String(sortDir, "asc");
            _orderClause = sortName + " " + sortDir;
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListDanhGiaByCriteriaBiz(context);
                biz.Search = Search;
                biz.TaiSanIds = TaiSanIds;
                biz.PhongBanIds = PhongBanIds;
                biz.NhanVienIds = NhanVienIds;
                biz.COSO_ID = COSO_ID;
                biz.NHANVIEN_ID = NHANVIEN_ID;

                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = draw;
                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region helpers
        #endregion
    }
}
