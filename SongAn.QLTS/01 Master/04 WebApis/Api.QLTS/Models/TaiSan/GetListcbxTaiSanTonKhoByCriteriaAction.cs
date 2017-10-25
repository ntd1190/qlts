/*****************************************************************************
1. Create Date : 2017.08.31
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.08.31(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.TaiSan;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.TaiSan
{
    public class GetListcbxTaiSanTonKhoByCriteriaAction
    {

        #region public
        public string Search { get; set; }
        public string TaiSanId { get; set; }
        public string MaTaiSan { get; set; }
        public string KhoTaiSanId { get; set; }
        public string DonGia { get; set; }
        public string ThangNam { get; set; }
        public string Field { get; set; }
        public string CoSo_Id { get; set; }
        public string NhanVien_Id { get; set; }
        public string FunctionCode { get; set; }
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
                init();
                validate();

                var biz = new GetListcbxTaiSanTonKhoByCriteriaBiz(context);
                biz.SEARCH = Protector.String(Search, "");
                biz.TAISANIDS = Protector.String(TaiSanId, "");
                biz.KHOTAISANIDS = Protector.String(KhoTaiSanId, "");
                biz.DONGIA = Protector.Decimal(DonGia, true);
                biz.THANGNAM = Protector.String(ThangNam, "");
                biz.FIELD = Protector.String(Field, "");
                biz.COSO_ID = Protector.Int(CoSo_Id, true);
                biz.NHANVIEN_ID = Protector.Int(NhanVien_Id, true);
                biz.FUNCTIONCODE = Protector.String(FunctionCode, "");

                var result = await biz.Execute();

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

        #region helpers
        #endregion
    }
}
