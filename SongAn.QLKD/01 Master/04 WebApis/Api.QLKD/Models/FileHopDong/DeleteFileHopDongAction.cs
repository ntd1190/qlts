using SongAn.QLKD.Biz.QLKD.FileHopDong;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.FileHopDong
{
    public class DeleteFileHopDongAction
    {
        #region public
        public virtual string FileHopDongIDS { get; set; }
        public virtual string CTRVERSION { get; set; }

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
                var biz = new DeleteFileHopDongBiz(context);

                biz.FileHopDongIDS = Protector.String(FileHopDongIDS);
                biz.CTRVERSION = Protector.Int(CTRVERSION); 

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
