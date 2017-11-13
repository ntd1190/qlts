﻿using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLKD.Biz.QLKD.Tinh;

namespace SongAn.QLKD.Api.QLKD.Models.Tinh
{
    public class GetListcbxTinhByIdAction
    {
        public string Search { get; set; }
        public string UserId { get; set; }
        public string NhanVienId { get; set; }
        public string TinhThanhPhoId { get; set; }
        public string FunctionCode { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxTinhByIdBiz biz = new GetListcbxTinhByIdBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.FunctionCode = FunctionCode;
                biz.NhanVienId = Protector.String(NhanVienId);
                biz.TinhThanhPhoId = Protector.Int(TinhThanhPhoId);
                biz.UserId = Protector.String(UserId);

                IEnumerable<dynamic> listTinh = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listTinh, _metaData);
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
