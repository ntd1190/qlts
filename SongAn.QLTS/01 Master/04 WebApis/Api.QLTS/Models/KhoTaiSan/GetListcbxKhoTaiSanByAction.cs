using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhoTaiSan;
using SongAn.QLTS.Data.Repository.QLTS;
using SongAn.QLTS.Util.Common.CustomException;

namespace SongAn.QLTS.Api.QLTS.Models.KhoTaiSan
{
    public class GetListcbxKhoTaiSanByCriteriaAction
    {

        public string Search { get; set; }
        public string KhoTaiSanIds { get; set; }
        public string MaTaiSan { get; set; }
        public string NhanVien_Id { get; set; }
        public string CoSo_Id { get; set; }
        public string CoSoId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var biz = new GetListcbxKhoTaiSanByCriteriaBiz(context);
                biz.SEARCH = Protector.String(Search, string.Empty);
                biz.KHOTAISANIDS = Protector.String(KhoTaiSanIds, string.Empty);
                biz.MAKHOTAISAN = Protector.String(MaTaiSan, string.Empty);
                biz.COSOID = Protector.String(CoSoId, string.Empty);
                biz.COSO_ID = Protector.Int(CoSo_Id, 0);
                biz.NHANVIEN_ID = Protector.Int(NhanVien_Id, 0);

                var result = await biz.Execute();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, null);
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
