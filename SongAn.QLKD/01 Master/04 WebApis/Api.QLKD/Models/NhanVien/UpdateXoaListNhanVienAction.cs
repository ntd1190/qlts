
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class UpdateXoaListNhanVienAction
    {
        #region public
        public string nhanVien { get; set; }
        #endregion

        #region private
        private List<NhanVienActionModel> _listNhanVien;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_listNhanVien != null && _listNhanVien.Count > 0)
                {
                    var repo = new NhanVienRepository(context);

                    foreach (var nhanvienModel in _listNhanVien)
                    {

                        if (nhanvienModel.NV_ID > 0)
                        {
                            var nhanvienEntity = new Entity.QLKD.Entity.NhanVien();
                            nhanvienEntity.NhanVienId = nhanvienModel.NV_ID;
                            nhanvienEntity.CtrVersion = nhanvienModel.NV_CTRVERSION;

                            nhanvienEntity.XoaYN = "Y";

                            nhanvienEntity = await repo.UpdatePartial(nhanvienEntity,
                                nameof(Entity.QLKD.Entity.NhanVien.XoaYN)
                                );

                            nhanvienModel.XoaYN = nhanvienEntity.XoaYN;
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listNhanVien, null);
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
            _listNhanVien = JsonConvert.DeserializeObject<List<NhanVienActionModel>>(nhanVien);
        }
        #endregion

        #region private model
        private class NhanVienActionModel
        {
            public int NV_ID { get; set; }
            public int NV_CTRVERSION { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}