using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DuyetCap;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DuyetCap
{
    public class DuyetDuyetCapAction
    {
        public string DeNghiId { get; set; }
        public string DuyetId { get; set; }
        public string NoiDungDuyet { get; set; }
        public string NgayDuyet { get; set; }
        public string NguoiDuyet { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            DuyetDuyetCapBiz biz = new DuyetDuyetCapBiz(context);
            var result = new ActionResultDto();
            try
            {
               
                biz.DeNghiId = DeNghiId;
                biz.NgayDuyet = String.IsNullOrEmpty(NgayDuyet)?DateTime.Now : DateTime.ParseExact(NgayDuyet, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")); 
                biz.DuyetId = DuyetId;
                biz.NguoiDuyet = NguoiDuyet;
                biz.NoiDungDuyet = NoiDungDuyet;
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
