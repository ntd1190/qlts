using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.DanhGia;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.DanhGia
{
    public class DeleteDanhGiaAction
    {
        #region public
        public int DanhGiaId { get; set; }

        public int COSO_ID { get; set; }
        public int NHANVIEN_ID { get; set; }
        #endregion

        #region private
        private Entity.QLTS.Entity.DanhGia _DanhGia { get; set; }
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

                var biz = new DeleteDanhGiaBiz(context);
                biz.DanhGiaId = DanhGiaId;

                biz.COSO_ID = COSO_ID;
                biz.NHANVIEN_ID = NHANVIEN_ID;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

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
