using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhoTaiSan;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.KhoTaiSan
{
    public class GetListcbxKhoTaiSanByProjectionAction
    {

        public string Search { get; set; }
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxKhoTaiSanByCriteriaBiz biz = new GetListcbxKhoTaiSanByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;
                KhoTaiSanRepository repo = new KhoTaiSanRepository(context);
                IEnumerable<dynamic> listKhoTaiSan = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK,listKhoTaiSan, _metaData);
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
