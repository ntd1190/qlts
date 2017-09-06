/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : Lộc danh sách nhân viên
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.NhanVien;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.NhanVien
{
    public class GetThongTinNhanVienByMaAction
    {
        #region public
        public string Ma { get; set; }
        #endregion

        #region private
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            Ma = Protector.String(Ma, "");
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (string.IsNullOrEmpty(Ma))
            {
                throw new BaseException("Chưa nhập 'Mã'");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetThongTinNhanVienByMaBiz(context);
                biz.MA = Ma;

                IEnumerable<dynamic> listNhanVien = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNhanVien, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

    }
}
