using SongAn.QLKD.Biz.QLKD.DuLieu;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.DuLieu
{
    public class InsertDuLieuAction : Entity.QLKD.Entity.KDDuLieu
    {
        #region public
        public virtual string USER_ID { get; set; }
        public virtual string NHANVIEN_ID { get; set; }
        #endregion

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
                var biz = new InsertDuLieuBiz(context);

                biz.DuLieu = new Entity.QLKD.Entity.KDDuLieu();
                biz.DuLieu.DuLieuId = Protector.Int(DuLieuId, 0);
                biz.DuLieu.MaDuLieu = Protector.String(MaDuLieu, "");
                biz.DuLieu.TenDuLieu = Protector.String(TenDuLieu, "");
                biz.DuLieu.ViTri = Protector.String(ViTri, "");
                biz.DuLieu.FileDinhKem = Protector.String(FileDinhKem, "");

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.USER_ID = Protector.Int(USER_ID);

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

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
    }
}
