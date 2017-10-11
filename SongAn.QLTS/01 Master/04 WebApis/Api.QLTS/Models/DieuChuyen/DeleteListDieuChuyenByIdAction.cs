﻿using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DieuChuyen;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.DieuChuyen
{
    public class DeleteListDieuChuyenByIdAction
    {
        public string DieuChuyenIds { get; set; }
        #region private
        private List<int> _listId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var count = 0; // 0: xoa thanh cong, !=0 số phiếu ko xóa dc

                var biz = new DeleteListDieuChuyenByIdBiz(context);
                for (int i = 0; i < _listId.Count; i++)
                {
                    biz.DieuChuyenId = Protector.Int(_listId[i]);

                    IEnumerable<dynamic> result = await biz.Execute();
                    if (result.Count() > 0)
                    {
                        var obj = result.FirstOrDefault();
                        if (Protector.Int(obj.ID) < 0)
                        {
                            count = count + 1;
                        }
                    }
                }
                return returnActionResult(HttpStatusCode.OK, count, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            var _ids = DieuChuyenIds.Split(',');
            _listId = new List<int>();

            for (int i = 0; i < _ids.Length; i++)
            {
                _listId.Add(Protector.Int(_ids[i]));
            }
        }

        private void validate()
        {
            for (int i = 0; i < _listId.Count; i++)
            {
                if (_listId[i] < 1)
                {
                    throw new FormatException("DieuChuyenId không hợp lệ");
                }
            }
        }

        #region helpers
        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
        #endregion
    }
}
