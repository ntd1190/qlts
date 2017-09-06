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

namespace SongAn.QLDN.Api.QLNS.Models.DuAn
{
    public class UpdateXoaListDuAnAction
    {
        #region public
        public string duAn { get; set; }
        #endregion

        #region private
        private List<DuAnActionModel> _listDuAn;
        private DuAnActionModel _DuAn;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new DuAnRepository(context);
                if (_DuAn != null)
                {
                    var duanEntity = new Entity.MSSQL_QLDN_QLNS.Entity.DuAn();
                    duanEntity.DuAnId = _DuAn.DuAnId;
                    duanEntity.CtrVersion = _DuAn.CtrVersion;

                    duanEntity.XoaYN = "Y";

                    duanEntity = await repo.UpdatePartial(duanEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.DuAn.XoaYN)
                        );

                    _DuAn.XoaYN = duanEntity.XoaYN;
                    if (_DuAn.NhanVienDa.Length > 0)
                    {
                        var nvda = new Entity.MSSQL_QLDN_QLNS.Entity.NhanVienDuAn();
                        var nvids = _DuAn.NhanVienDa.Split('|');
                        foreach (var nv in nvids)
                        {
                            nvda.DuAnId = _DuAn.DuAnId;
                            nvda.NhanVienId = Protector.Int(nv);
                            nvda.XoaYN = "Y";
                            nvda = await repo.UpdatePartialNV(nvda,
                         nameof(Entity.MSSQL_QLDN_QLNS.Entity.NhanVienDuAn.XoaYN)
                         );
                        }
                    }

                }
                else
                {
                    if (_listDuAn != null && _listDuAn.Count > 0)
                    {


                        foreach (var duanModel in _listDuAn)
                        {

                            if (duanModel.DuAnId > 0)
                            {
                                var duanEntity = new Entity.MSSQL_QLDN_QLNS.Entity.DuAn();
                                duanEntity.DuAnId = duanModel.DuAnId;
                                duanEntity.CtrVersion = duanModel.CtrVersion;

                                duanEntity.XoaYN = "Y";

                                duanEntity = await repo.UpdatePartial(duanEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.DuAn.XoaYN)
                                    );

                                duanModel.XoaYN = duanEntity.XoaYN;
                                if (duanModel.NhanVienDa!=null)
                                {
                                    var nvda = new Entity.MSSQL_QLDN_QLNS.Entity.NhanVienDuAn();
                                    var nvids = duanModel.NhanVienDa.Split('|');
                                    foreach (var nv in nvids)
                                    {
                                        nvda.DuAnId = duanModel.DuAnId;
                                        nvda.NhanVienId = Protector.Int(nv);
                                        nvda.XoaYN = "Y";
                                        nvda = await repo.UpdatePartialNV(nvda,
                                     nameof(Entity.MSSQL_QLDN_QLNS.Entity.NhanVienDuAn.XoaYN)
                                     );
                                    }
                                }
                            }
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listDuAn, null);
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
            try
            {
                _listDuAn = JsonConvert.DeserializeObject<List<DuAnActionModel>>(duAn);
            }
            catch
            {
                _DuAn = JsonConvert.DeserializeObject<DuAnActionModel>(duAn);
            }

        }
        #endregion

        #region private model
        private class DuAnActionModel
        {
            public int DuAnId { get; set; }
            public int CtrVersion { get; set; }
            public string XoaYN { get; set; }
            public string NhanVienDa { get; set; }
        }
        #endregion
    }
}