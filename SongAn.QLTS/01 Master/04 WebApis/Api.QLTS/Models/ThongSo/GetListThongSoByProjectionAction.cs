using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.ThongSo;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.ThongSo
{
    public class GetListThongSoByProjectionAction
    {

        public string NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListThongSoByCriteriaBiz biz = new GetListThongSoByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.NhanVienId = NhanVienId;
                IEnumerable<dynamic> listThongSo = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK,listThongSo, _metaData);
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
