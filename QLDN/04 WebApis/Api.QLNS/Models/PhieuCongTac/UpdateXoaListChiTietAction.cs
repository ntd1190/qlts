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

namespace SongAn.QLDN.Api.QLNS.Models.PhieuCongTac
{
    public class UpdateXoaListChiTietAction
    {
        #region public
        public string phieuCongTacChiTiet { get; set; }
        #endregion

        #region private
        private List<PhieuCongTacChiTietActionModel> _list;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_list != null && _list.Count > 0)
                {
                    var repo = new PhieuCongTacChiTietRepository(context);

                    foreach (var model in _list)
                    {

                        if (model.PhieuCongTacChiTietId > 0)
                        {
                            var entity = new Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTacChiTiet();
                            entity.PhieuCongTacChiTietId = model.PhieuCongTacChiTietId;
                            entity.CtrVersion = model.CtrVersion;

                            entity.XoaYN = "Y";

                            entity = await repo.UpdatePartial(entity,
                                nameof(Entity.MSSQL_QLDN_QLNS.Entity.PhieuCongTacChiTiet.XoaYN)
                                );

                            model.XoaYN = entity.XoaYN;
                        }
                    }
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
            _list = JsonConvert.DeserializeObject<List<PhieuCongTacChiTietActionModel>>(phieuCongTacChiTiet);
        }
        #endregion

        #region private model
        private class PhieuCongTacChiTietActionModel
        {
            public int PhieuCongTacChiTietId { get; set; }
            public int CtrVersion { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}