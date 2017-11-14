using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLKD.Biz.QLKD.NhomKinhDoanh;
using SongAn.QLKD.Data.Repository.QLKD;

namespace  SongAn.QLKD.Api.QLKD.Models.NhomKinhDoanh
{
    public class GetListcbxNhomKinhDoanhByProjectionAction
    {

        public string Search { get; set; }
        public int NhomKinhDoanhId { get; set; }
        public string FunctionCode { get; set; }
        public int USER_ID { get; set; }
        public int NHANVIEN_ID { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxNhomKinhDoanhByCriteriaBiz biz = new GetListcbxNhomKinhDoanhByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.NhomKinhDoanhId = NhomKinhDoanhId;
                biz.USER_ID = USER_ID;
                biz.NHANVIEN_ID = NHANVIEN_ID;
                biz.FunctionCode = FunctionCode;
                IEnumerable<dynamic> listNhomKinhDoanh = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK,listNhomKinhDoanh, _metaData);
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
