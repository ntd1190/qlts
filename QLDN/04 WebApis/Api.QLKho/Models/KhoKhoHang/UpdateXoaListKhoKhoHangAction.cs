/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOKHOHANG/LIST
4. Description  : UPDATE XÓA KHO HÀNG
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoKhoHang;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoKhoHang
{
    public class UpdateXoaListKhoKhoHangAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string listKhoHang { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoKhoHang> _list;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoKhoHang>>(listKhoHang);
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

                var biz = new UpdateXoaListKhoKhoHangBiz(context);
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                foreach (var loai in _list)
                {
                    biz.KHO_HANG_IDS = loai.KhoHangId.ToString();
                    biz.LOGIN_ID = _LoginId;
                    var result = await biz.Execute();

                    if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                    {
                        throw new BaseException(biz.MESSAGE.Split('|')[2]);
                    }

                    loai.XoaYN = "Y";
                    ls.InsertKhoLuocSu(context, "KhoKhoHang", loai.KhoHangId, "Delete", _LoginId);
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
