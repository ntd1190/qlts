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

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuChi
{
    public class UpdateXoaListKhoPhieuChiAction
    {
        #region public
        public string congViec { get; set; }
        #endregion

        #region private
        private List<KhoPhieuChiActionModel> _listKhoPhieuChi;
        private KhoPhieuChiActionModel _KhoPhieuChi;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new KhoPhieuChiRepository(context);
                if (_KhoPhieuChi != null)
                {
                    var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi();
                    congviecEntity.PhieuChiId = _KhoPhieuChi.PhieuChiId;

                    congviecEntity.XoaYN = "Y";
                    congviecEntity.SoPhieu = null;
                    congviecEntity = await repo.UpdatePartial(congviecEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi.XoaYN),
                         nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi.SoPhieu)
                        );

                    _KhoPhieuChi.XoaYN = congviecEntity.XoaYN;
                    InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoPhieuChi", congviecEntity.PhieuChiId, "Delete", 0);
                }
                else
                {
                    if (_listKhoPhieuChi != null && _listKhoPhieuChi.Count > 0)
                    {
                        

                        foreach (var congviecModel in _listKhoPhieuChi)
                        {

                            if (congviecModel.PhieuChiId > 0)
                            {
                                var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi();
                                congviecEntity.PhieuChiId = congviecModel.PhieuChiId;

                                congviecEntity.XoaYN = "Y";
                                congviecEntity.SoPhieu = "";
                                congviecEntity = await repo.UpdatePartial(congviecEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi.XoaYN),
                                     nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuChi.SoPhieu)
                                    );

                                congviecModel.XoaYN = congviecEntity.XoaYN;
                                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                                ls.InsertKhoLuocSu(context, "KhoPhieuChi", congviecEntity.PhieuChiId, "Delete", 0);
                            }
                           
                        }
                    }
                }
                
                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listKhoPhieuChi, null);
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
                _listKhoPhieuChi = JsonConvert.DeserializeObject<List<KhoPhieuChiActionModel>>(congViec);
            }
            catch {
                _KhoPhieuChi = JsonConvert.DeserializeObject<KhoPhieuChiActionModel>(congViec);
            }
           
        }
        #endregion

        #region private model
        private class KhoPhieuChiActionModel
        {
            public int PhieuChiId { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}