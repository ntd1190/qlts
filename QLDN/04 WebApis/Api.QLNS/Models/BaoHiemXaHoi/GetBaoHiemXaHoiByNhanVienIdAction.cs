/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : Lộc danh sách nhân viên
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.BaoHiemXaHoi;
using SongAn.QLDN.Biz.QLNS.ChucVu;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.BaoHiemXaHoi
{
    public class GetBaoHiemXaHoiByNhanVienIdAction
    {
        #region public
        public string nhanVienId { get; set; }
        #endregion

        #region private
        private int _nhanVienId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _nhanVienId = Protector.Int(nhanVienId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new FormatException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListBaoHiemXaHoiByCriteriaBiz(context);

                biz.NHAN_VIEN_ID = _nhanVienId;

                IEnumerable<dynamic> list = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
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
