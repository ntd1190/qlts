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

namespace SongAn.QLDN.Api.QLNS.Models.CongViec
{
    public class UpdateXoaListCongViecAction
    {
        #region public
        public string congViec { get; set; }
        #endregion

        #region private
        private List<CongViecActionModel> _listCongViec;
        private CongViecActionModel _CongViec;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new CongViecRepository(context);
                if (_CongViec != null)
                {
                    var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.CongViec();
                    congviecEntity.CongViecId = _CongViec.CongViecId;
                    congviecEntity.CtrVersion = _CongViec.CtrVersion;

                    congviecEntity.XoaYN = "Y";

                    congviecEntity = await repo.UpdatePartial(congviecEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.CongViec.XoaYN)
                        );

                    _CongViec.XoaYN = congviecEntity.XoaYN;
                }
                else
                {
                    if (_listCongViec != null && _listCongViec.Count > 0)
                    {
                        

                        foreach (var congviecModel in _listCongViec)
                        {

                            if (congviecModel.CongViecId > 0)
                            {
                                var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.CongViec();
                                congviecEntity.CongViecId = congviecModel.CongViecId;
                                congviecEntity.CtrVersion = congviecModel.CtrVersion;

                                congviecEntity.XoaYN = "Y";

                                congviecEntity = await repo.UpdatePartial(congviecEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.CongViec.XoaYN)
                                    );

                                congviecModel.XoaYN = congviecEntity.XoaYN;
                            }
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listCongViec, null);
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
                _listCongViec = JsonConvert.DeserializeObject<List<CongViecActionModel>>(congViec);
            }
            catch {
                _CongViec = JsonConvert.DeserializeObject<CongViecActionModel>(congViec);
            }
           
        }
        #endregion

        #region private model
        private class CongViecActionModel
        {
            public int CongViecId { get; set; }
            public int CtrVersion { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}