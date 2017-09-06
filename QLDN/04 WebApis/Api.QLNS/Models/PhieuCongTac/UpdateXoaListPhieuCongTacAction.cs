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
using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
using SongAn.QLDN.Biz.QLNS.PhieuCongTac.Dto;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;

namespace SongAn.QLDN.Api.QLNS.Models.PhieuCongTac
{
    public class UpdateXoaListPhieuCongTacAction
    {
        #region public
        public string listphieuCongTac { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<UpdateXoaPhieuCongTacDto> _list;
        private int _LoginId;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_list != null && _list.Count > 0)
                {
                    var biz = new UpdateXoaPhieuCongTacBiz(context);
                    biz.listPhieuCongTac = _list;

                    var result = await biz.Execute();
                }

                foreach (var item in _list)
                {
                    InsertLuocSuAction ls = new InsertLuocSuAction();
                    ls.InsertLuocSu(context, "PhieuCongTac", item.PhieuCongTacId, "Delete", _LoginId);
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _list, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        #region init & validate
        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
        }

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<UpdateXoaPhieuCongTacDto>>(listphieuCongTac);
            _LoginId = Protector.Int(LoginId, 0);
        }
        #endregion
    }
}