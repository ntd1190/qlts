/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/TangCa/
4. Description  : Action api Update XoaYN = "Y"
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.TangCa
{
    /// <summary>
    /// Action api Update XoaYN = "Y"
    /// </summary>
    public class UpdateXoaListTangCaAction
    {
        #region public

        /// <summary>
        /// String chữa danh sách đối tượng cần đánh dấu xóa
        /// </summary>
        public string deleteObjs { get; set; }
        #endregion

        /// <summary>
        /// Danh sách đối tượng cần đánh dấu xóa
        /// </summary>
        #region private
        private List<UpdateXoaYNDto> _listObj;
        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateXoaListTangCaAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _listObj = JsonConvert.DeserializeObject<List<UpdateXoaYNDto>>(deleteObjs);
        }
        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {

        }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_listObj != null && _listObj.Count > 0)
                {
                    var repo = new TangCaRepository(context);

                    foreach (var obj in _listObj)
                    {

                        if (obj.ID > 0)
                        {
                            var objEntity = new Entity.MSSQL_QLDN_QLNS.Entity.TangCa();
                            objEntity.TangCaId = obj.ID;
                            objEntity.CtrVersion = obj.CTRVERSION;

                            objEntity.XoaYN = "Y";

                            objEntity = await repo.UpdatePartial(objEntity,
                                nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.XoaYN)
                                );

                            obj.XoaYN = objEntity.XoaYN;
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listObj, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }
        #endregion
    }
}