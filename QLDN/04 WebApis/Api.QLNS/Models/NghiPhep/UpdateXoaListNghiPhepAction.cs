/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/
4. Description  : Action api Xoa Nghỉ phép theo id
5. History      : 2017.04.19(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.NghiPhep
{
    public class UpdateXoaListNghiPhepAction
    {
        #region public
        public string deleteObjs { get; set; }
        #endregion

        #region private
        private List<DeleteActionModel> _listObj;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_listObj != null && _listObj.Count > 0)
                {
                    var repo = new NghiPhepRepository(context);

                    foreach (var obj in _listObj)
                    {

                        if (obj.NP_ID > 0)
                        {
                            var objEntity = new Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep();
                            objEntity.NghiPhepId = obj.NP_ID;
                            objEntity.CtrVersion = obj.CTRVERSION;

                            objEntity.XoaYN = "Y";

                            objEntity = await repo.UpdatePartial(objEntity,
                                nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.XoaYN)
                                );

                            obj.XoaYN = objEntity.XoaYN;
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listObj, null);
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
            _listObj = JsonConvert.DeserializeObject<List<DeleteActionModel>>(deleteObjs);
        }
        #endregion

        #region private model
        private class DeleteActionModel
        {
            public int NP_ID { get; set; }
            public int CTRVERSION { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}