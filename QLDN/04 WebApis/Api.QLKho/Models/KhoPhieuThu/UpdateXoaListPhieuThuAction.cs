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

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuThu
{
    public class UpdateXoaListKhoPhieuThuAction
    {
        #region public
        public string congViec { get; set; }
        #endregion

        #region private
        private List<KhoPhieuThuActionModel> _listKhoPhieuThu;
        private KhoPhieuThuActionModel _KhoPhieuThu;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new KhoPhieuThuRepository(context);
                if (_KhoPhieuThu != null)
                {
                    var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu();
                    congviecEntity.PhieuThuId = _KhoPhieuThu.PhieuThuId;

                    congviecEntity.XoaYN = "Y";
                    congviecEntity.SoPhieu = "";
                    congviecEntity = await repo.UpdatePartial(congviecEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu.XoaYN),
                         nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu.SoPhieu)
                        );
                    InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoPhieuThu", congviecEntity.PhieuThuId, "Delete", 0);
                    _KhoPhieuThu.XoaYN = congviecEntity.XoaYN;
                }
                else
                {
                    if (_listKhoPhieuThu != null && _listKhoPhieuThu.Count > 0)
                    {
                        

                        foreach (var congviecModel in _listKhoPhieuThu)
                        {

                            if (congviecModel.PhieuThuId > 0)
                            {
                                var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu();
                                congviecEntity.PhieuThuId = congviecModel.PhieuThuId;

                                congviecEntity.XoaYN = "Y";
                                congviecEntity.SoPhieu = null;
                                congviecEntity = await repo.UpdatePartial(congviecEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu.XoaYN),
                                     nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuThu.SoPhieu)
                                    );
                                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                                ls.InsertKhoLuocSu(context, "KhoPhieuThu", congviecEntity.PhieuThuId, "Delete", 0);
                                congviecModel.XoaYN = congviecEntity.XoaYN;
                            }
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listKhoPhieuThu, null);
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
                _listKhoPhieuThu = JsonConvert.DeserializeObject<List<KhoPhieuThuActionModel>>(congViec);
            }
            catch {
                _KhoPhieuThu = JsonConvert.DeserializeObject<KhoPhieuThuActionModel>(congViec);
            }
           
        }
        #endregion

        #region private model
        private class KhoPhieuThuActionModel
        {
            public int PhieuThuId { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}