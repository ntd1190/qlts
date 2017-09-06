/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOHANGSANXUAT/LIST
4. Description  : UPDATE XÓA HÃNG SẢN XUẤT
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLKho.KhoHangSanXuat;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoHangSanXuat
{
    public class UpdateXoaListKhoHangSanXuatAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string listHangSanXuat { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoHangSanXuat> _list;
        private int _LoginId;
        private string _ids;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoHangSanXuat>>(listHangSanXuat);
            _LoginId = Protector.Int(LoginId, 0);
            _ids = "";
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

                var biz = new UpdateXoaListKhoHangSanXuatBiz(context);
                //InsertLuocSuAction ls = new InsertLuocSuAction();
                //foreach (var loai in _list)
                //{
                //    biz.HANG_SAN_XUAT_IDS = loai.HangSanXuatId.ToString();
                //    var result = await biz.Execute();
                //    loai.XoaYN = "Y";
                //    ls.InsertLuocSu(context, "KhoHangSanXuat", loai.HangSanXuatId, "Delete", _LoginId);
                //}

                //dynamic metaData = new System.Dynamic.ExpandoObject();

                //return ActionHelper.returnActionResult(HttpStatusCode.OK, _list, metaData);

                foreach (var loai in _list)
                {
                    if (_ids.Equals(""))
                    {
                        _ids = loai.HangSanXuatId.ToString();
                    }
                    else
                    {
                        _ids += "|" + loai.HangSanXuatId.ToString();
                    }
                }

                biz.HANG_SAN_XUAT_IDS = _ids;
                biz.LOGIN_ID = Protector.Int(_LoginId);
                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
