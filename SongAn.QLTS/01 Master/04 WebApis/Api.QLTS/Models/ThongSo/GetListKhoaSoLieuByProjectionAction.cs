using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhoaSoLieu;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.ThongSo
{
    public class GetListKhoaSoLieuByProjectionAction
    {

        public string NhanVienId { get; set; }
        public string CoSoId { get; set; }
        
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListKhoaSoLieuByCriteriaBiz biz = new GetListKhoaSoLieuByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.NhanVienId = NhanVienId;
                biz.CoSoId = CoSoId;
                IEnumerable<dynamic> listKhoaSoLieu = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK,listKhoaSoLieu, _metaData);
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
