
using SongAn.QLKD.Biz.QLKD.DanhGiaDoanhThu;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.DanhGiaDoanhThu
{
    public class GetListDanhGiaDoanhThuByProjectionAction
    {
        public string Nam { get; set; }
        public string NhanVienKDId { get; set; }
        public string UserId { get; set; }
        public string NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListDanhGiaDoanhThuByCriteriaBiz biz = new GetListDanhGiaDoanhThuByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                
                biz.Nam = Protector.Int(Nam);
                biz.NhanVienKDId = Protector.Int(NhanVienKDId);
                biz.UserId = UserId;
                biz.NhanVienId = NhanVienId;

                IEnumerable<dynamic> listBCDoanhThu = await biz.Execute();
               
                dynamic _metaData = new System.Dynamic.ExpandoObject();
              

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listBCDoanhThu, _metaData);
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

