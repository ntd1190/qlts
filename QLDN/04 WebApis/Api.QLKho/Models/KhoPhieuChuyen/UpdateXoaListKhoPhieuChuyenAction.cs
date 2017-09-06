/*****************************************************************************
1. Create Date : 2017.06.28
2. Creator     : Nguyen Ngoc Tan
3. Description : 
4. History     : 2017.06.28(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Biz.QLKho.KhoPhieuChuyen;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuChuyen
{
    public class UpdateXoaListKhoPhieuChuyenAction
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string listPhieuChuyen { get; set; }
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
            _list = JsonConvert.DeserializeObject<List<dynamic>>(listPhieuChuyen);
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

                var biz = new UpdateXoaKhoPhieuChuyenBiz(context);

                var ls = new InsertKhoLuocSuAction();
                foreach (var item in _list)
                {
                    biz.PhieuChuyenId = item.PhieuChuyenId;
                    biz.CtrVersion = Protector.Int(item.KPC_CTRVERSION, -1);
                    biz.XoaYN = "Y";
                    var result = await biz.Execute();
                    if (String.IsNullOrEmpty(biz.MESSAGE))
                    {
                        ls.InsertKhoLuocSu(context, "KhoPhieuChuyen", result.FirstOrDefault().PhieuChuyenId, "Delete", _LoginId);
                    }
                    else
                    {
                        throw new BaseException(biz.MESSAGE.Split('|')[2]);
                    }
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