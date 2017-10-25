using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.NguonNganSach;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NguonNganSach
{
    public class GetListcbxNguonNganSachByProjectionAction
    {

        public string Search { get; set; }
        public string MaNguonNganSach { get; set; }
        public string NguonNganSachId { get; set; }
        public int CoSoId { get; set; }
        public int NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxNguonNganSachByCriteriaBiz biz = new GetListcbxNguonNganSachByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.NguonNganSachId = NguonNganSachId;
                biz.MaNguonNganSach = MaNguonNganSach;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;

                var listNguonNganSach = await biz.Execute();
                var _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK,listNguonNganSach, _metaData);
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
