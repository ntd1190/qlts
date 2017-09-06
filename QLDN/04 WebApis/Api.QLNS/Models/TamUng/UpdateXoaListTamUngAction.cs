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

namespace SongAn.QLDN.Api.QLNS.Models.TamUng
{
    public class UpdateXoaListTamUngAction
    {
        #region public
        public string tamUng { get; set; }
        #endregion

        #region private
        private List<TamUngActionModel> _listTamUng;
        private TamUngActionModel _TamUng;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new TamUngRepository(context);
                if (_TamUng != null)
                {
                    var tamungEntity = new Entity.MSSQL_QLDN_QLNS.Entity.TamUng();
                    tamungEntity.TamUngId = _TamUng.TamUngId;
                    tamungEntity.CtrVersion = _TamUng.CtrVersion;

                    tamungEntity.XoaYN = "Y";

                    tamungEntity = await repo.UpdatePartial(tamungEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.TamUng.XoaYN)
                        );

                    _TamUng.XoaYN = tamungEntity.XoaYN;
                }
                else
                {
                    if (_listTamUng != null && _listTamUng.Count > 0)
                    {
                        

                        foreach (var tamungModel in _listTamUng)
                        {

                            if (tamungModel.TamUngId > 0)
                            {
                                var tamungEntity = new Entity.MSSQL_QLDN_QLNS.Entity.TamUng();
                                tamungEntity.TamUngId = tamungModel.TamUngId;
                                tamungEntity.CtrVersion = tamungModel.CtrVersion;

                                tamungEntity.XoaYN = "Y";

                                tamungEntity = await repo.UpdatePartial(tamungEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.TamUng.XoaYN)
                                    );

                                tamungModel.XoaYN = tamungEntity.XoaYN;
                            }
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listTamUng, null);
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
            try {
                _listTamUng = JsonConvert.DeserializeObject<List<TamUngActionModel>>(tamUng);
            }
            catch {
                _TamUng = JsonConvert.DeserializeObject<TamUngActionModel>(tamUng);
            }
           
        }
        #endregion

        #region private model
        private class TamUngActionModel
        {
            public int TamUngId { get; set; }
            public int CtrVersion { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}