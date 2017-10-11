using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DuyetBaoCao;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DuyetBaoCao
{
    public class DuyetDuyetBaoCaoChiTietAction
    {
        public string LapBaoCaoId { get; set; }
        public string LapBaoCaoChiTietId { get; set; }
        public string NgayDuyet { get; set; }
        public string NoiDungDuyet { get; set; }
        public string DuyetId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            DuyetDuyetBaoCaoChiTietBiz biz = new DuyetDuyetBaoCaoChiTietBiz(context);
            var result = new ActionResultDto();
            try
            {
               
                biz.LapBaoCaoId = LapBaoCaoId;
                biz.LapBaoCaoChiTietId = LapBaoCaoChiTietId;
                biz.NgayDuyet = String.IsNullOrEmpty(NgayDuyet) ? DateTime.Now : DateTime.ParseExact(NgayDuyet, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.NoiDungDuyet = NoiDungDuyet;
                biz.DuyetId = DuyetId;
                IEnumerable<dynamic> listDeNghi = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listDeNghi, _metaData);
            }
            catch (Exception ex)
            {
                result.ReturnCode = HttpStatusCode.InternalServerError;
                result.ReturnData = new
                {
                    error = new
                    {
                        code = HttpStatusCode.InternalServerError,
                        type = HttpStatusCode.InternalServerError.ToString(),
                        message = ex.InnerException != null ? ex.InnerException.Message : ex.Message
                    }
                };
                return result;
            }

        }

    }
}
