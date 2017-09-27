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
    public class UpdateDanhGiaAction
    {
        #region public
        public string DanhGia { get; set; }
        public string NguyenGiaList  { get; set; }
        public int SoNamSuDung { get; set; }
        public decimal TyLeHaoMon { get; set; }
        public decimal HaoMonLuyKe { get; set; }
        public decimal SLTon { get; set; }

        public int COSO_ID { get; set; }
        public int NHANVIEN_ID { get; set; }
        #endregion

        #region private
        private List<Entity.QLTS.Entity.NguyenGia> _NguyenGiaList { get; set; }
        private Entity.QLTS.Entity.DanhGia _DanhGia { get; set; }
        #endregion

        #region init & validate
        private void init()
        {
            SoNamSuDung = Protector.Int(SoNamSuDung, 0);
            TyLeHaoMon = Protector.Decimal(TyLeHaoMon, 0);
            HaoMonLuyKe = Protector.Decimal(HaoMonLuyKe, 0);
            SLTon = Protector.Decimal(SLTon, 0);

            DanhGia = Protector.String(DanhGia, "{}");
            _DanhGia = JsonConvert.DeserializeObject<Entity.QLTS.Entity.DanhGia>(DanhGia);

            NguyenGiaList = Protector.String(NguyenGiaList, "[]");
            _NguyenGiaList = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.NguyenGia>>(NguyenGiaList);
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateDanhGiaBiz(context);
                biz.DanhGia = _DanhGia;
                biz.NguyenGiaList = _NguyenGiaList;
                biz.HaoMonLuyKe = HaoMonLuyKe;
                biz.SLTon = SLTon;
                biz.SoNamSuDung = SoNamSuDung;
                biz.TyLeHaoMon = TyLeHaoMon;

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
