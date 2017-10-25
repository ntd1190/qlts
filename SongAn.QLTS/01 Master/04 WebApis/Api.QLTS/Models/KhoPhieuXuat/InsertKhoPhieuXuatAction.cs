using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.KhoPhieuXuat;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.KhoPhieuXuat
{
    public class InsertKhoPhieuXuatAction
    {
        public string KhoPhieuXuat { get; set; }
        public string ChiTiet { get; set; }
        public string NHANVIEN_ID { get; set; }
        public string COSO_ID { get; set; }
        #region private
        private Entity.QLTS.Entity.KhoPhieuXuat _KhoPhieuXuat;
        private List<Entity.QLTS.Entity.KhoPhieuXuatChiTiet> _KhoPhieuXuatChiTiet;
        #endregion
        #region init & validate
        private void init()
        {
            KhoPhieuXuat = Protector.String(KhoPhieuXuat, "{}");
            _KhoPhieuXuat = JsonConvert.DeserializeObject<Entity.QLTS.Entity.KhoPhieuXuat>(KhoPhieuXuat);

            ChiTiet = Protector.String(ChiTiet, "[]");
            _KhoPhieuXuatChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.KhoPhieuXuatChiTiet>>(ChiTiet);
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new InsertKhoPhieuXuatBiz(context);
                biz.KhoPhieuXuat = _KhoPhieuXuat;
                biz.KhoPhieuXuatChiTiet = _KhoPhieuXuatChiTiet;
                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.COSO_ID = Protector.Int(COSO_ID);
                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE);
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
