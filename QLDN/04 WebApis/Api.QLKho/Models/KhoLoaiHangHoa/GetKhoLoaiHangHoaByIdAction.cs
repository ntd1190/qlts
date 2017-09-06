using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLKho.KhoLoaiHangHoa;
using SongAn.QLDN.Util.Common.CustomException;

namespace SongAn.QLDN.Api.QLKho.Models.KhoLoaiHangHoa
{
    public class GetKhoLoaiHangHoaByIdAction
    {
        #region public
        public string LoaiHangHoaId { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private int _LoaiHangHoaId;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoaiHangHoaId = Protector.Int(LoaiHangHoaId, 0);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            var _result = new ActionResultDto();
            try
            {
                init();
                validate();

                var biz = new GetKhoLoaiHangHoaByIdBiz(context);
                biz.FIELD = "LHH.*";
                biz.LOAI_HANG_HOA_ID = _LoaiHangHoaId.ToString();
                var result = await biz.Execute(); ;

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
