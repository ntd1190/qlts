/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : thêm chúc năng
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/

using SongAn.QLKD.Data.Repository.QLKD_MAIN;
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.Main.Models.ChucNang
{
    public class InsertChucNangAction
    {
        #region public
        public string MaChucNang { get; set; }
        public string TenChucNang { get; set; }
        public string MoTa { get; set; }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                validate();

                var chucnang = new Entity.QLKD_MAIN.Entity.ChucNang();
                chucnang.MaChucNang = MaChucNang;
                chucnang.TenChucNang = TenChucNang;
                chucnang.MoTa = MoTa;
                chucnang.NgayTaoDT = DateTime.Now;
                chucnang.NgaySuaDT = DateTime.Now;

                ChucNangRepository repo = new ChucNangRepository(context);
                await repo.Insert(chucnang);

                return returnActionResult(HttpStatusCode.OK, chucnang, null); ;
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

        private void init() { }

        private void validate()
        {
            if (string.IsNullOrEmpty(MaChucNang))
            {
                throw new FormatException("MaChucNang không hợp lệ");
            }
            if (string.IsNullOrEmpty(TenChucNang))
            {
                throw new FormatException("MaChucNang không hợp lệ");
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