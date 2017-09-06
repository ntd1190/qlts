/*****************************************************************************
1. Create Date  : 2017.07.17
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/CHINHANH/LIST
4. Description  : API CHI NHÁNH
5. History      : 2017.07.17 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Biz.QLNS.ChiNhanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.ChiNhanh
{
    public class UpdateXoaListChiNhanhAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string listChiNhanh { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.ChiNhanh> _list;
        private string ChiNhanhIds;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(LoginId, 0);

            _list = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.ChiNhanh>>(listChiNhanh);
            var _ids = new List<int>();
            foreach (var item in _list)
            {
                _ids.Add(item.ChiNhanhId);
            }
            ChiNhanhIds = String.Join("|", _ids);

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

                var biz = new UpdateXoaListChiNhanhBiz(context);
                biz.ChiNhanhIds = ChiNhanhIds;
                biz.LOGIN_ID = _LoginId;

                var result = await biz.Execute();

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, metaData);
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

        #region
        #endregion
    }
}
