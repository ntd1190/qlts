/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : thêm nhân viên mới
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLDN.Api.QLNS.Models.NhanVien
{
    public class InsertNhanVienAction
    {
        public string Ma { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var repo = new NhanVienRepository(context);

                var nhanvien = new Entity.MSSQL_QLDN_QLNS.Entity.NhanVien();
                nhanvien.Ma = Ma;
                nhanvien.Ho = Ho;
                nhanvien.Ten = Ten;
                nhanvien.CtrVersion = 1;

                await repo.Insert(nhanvien);

                if (nhanvien.NhanVienId == 0)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không thể thêm nhân viên.");
                }

                return returnActionResult(nhanvien, null);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

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
        private ActionResultDto returnActionResult(object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = HttpStatusCode.OK;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
    }
}