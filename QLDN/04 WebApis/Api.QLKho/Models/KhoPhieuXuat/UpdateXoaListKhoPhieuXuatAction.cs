/*****************************************************************************
1. Create Date  : 2017.06.29
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUXUAT/LIST
4. Description  : UPDATE XOA PHIẾU XUẤT
5. History      : 2017.06.29 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLKho.KhoKhoHang;
using SongAn.QLDN.Biz.QLKho.KhoPhieuXuat;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat
{
    public class UpdateXoaListKhoPhieuXuatAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string listPhieuXuat { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<dynamic> _list;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<dynamic>>(listPhieuXuat);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateXoaListKhoPhieuXuatBiz(context);
                var ls = new InsertKhoLuocSuAction();
                foreach (var item in _list)
                {
                    biz.PHIEU_XUAT_ID = item.KPX_ID;
                    biz.CTRVERSION = Protector.Int(item.KPX_CTRVERSION, -1);
                    biz.XOA = "Y";
                    var result = await biz.Execute();

                    if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                    {
                        throw new BaseException(biz.MESSAGE.Split('|')[2]);
                    }

                    item.XoaYN = "Y";
                    ls.InsertKhoLuocSu(context, "KhoPhieuXuat", biz.PHIEU_XUAT_ID, "Delete", _LoginId);
                }

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _list, metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
