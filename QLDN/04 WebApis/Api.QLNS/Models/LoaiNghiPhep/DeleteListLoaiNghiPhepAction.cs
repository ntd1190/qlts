/*****************************************************************************
1. Create Date  : 2017.05.08
2. Creator      : Van Phu hoi
3. Function     : QLDNMAIN/LoaiNghiPhep/
4. Description  : Action api Xoa Loai nghỉ phép theo id
5. History      : 
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

namespace SongAn.QLDN.Api.QLNS.Models.LoaiNghiPhep
{
    public class DeleteListLoaiNghiPhepAction
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
                    var repo = new LoaiNghiPhepRepository(context);

                    foreach (var obj in _listObj)
                    {

                        if (obj.LoaiNghiPhepId > 0)
                        {
                            var objEntity = new Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep();
                            objEntity.LoaiNghiPhepId = obj.LoaiNghiPhepId;
                            objEntity.CtrVersion = obj.CTRVERSION;

                            objEntity.XoaYN = "Y";

                            objEntity = await repo.UpdatePartial(objEntity,
                                nameof(Entity.MSSQL_QLDN_QLNS.Entity.LoaiNghiPhep.XoaYN)
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
            public int LoaiNghiPhepId { get; set; }
            public int CTRVERSION { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}
