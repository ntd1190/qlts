/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : thay đổi thông tin nhân viên
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
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
using SongAn.QLDN.Biz.QLKho.KhoHangHoa;
using SongAn.QLDN.Util.Common.CustomException;

namespace SongAn.QLDN.Api.QLKho.Models.KhoHangHoa
{
    public class UpdateXoaListKhoHangHoaV2Action
    {
        #region public
        /// <summary>
        /// array json stirng
        /// </summary>
        public string listHangHoa { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<KhoHangHoaActionModel> _list;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<KhoHangHoaActionModel>>(listHangHoa);
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

                var biz = new UpdateXoaListKhoHangHoaV2Biz(context);
                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                foreach (var loai in _list)
                {
                    biz.HANG_HOA_IDS = loai.HangHoaId.ToString();
                    var result = await biz.Execute();

                    if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                    {
                        throw new BaseException(biz.MESSAGE.Split('|')[2]);
                    }

                    loai.XoaYN = "Y";
                    ls.InsertKhoLuocSu(context, "KhoHangHoa", loai.HangHoaId, "Delete", _LoginId);
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

        #region private model
        private class KhoHangHoaActionModel
        {
            public int HangHoaId { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}