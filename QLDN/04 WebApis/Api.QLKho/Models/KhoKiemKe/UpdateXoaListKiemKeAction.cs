
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

namespace SongAn.QLDN.Api.QLKho.Models.KhoKiemKe
{
    public class UpdateXoaListKiemKeAction
    {
        #region public
        public string congViec { get; set; }
        #endregion

        #region private
        private List<KhoKiemKeActionModel> _listKhoKiemKe;
        private KhoKiemKeActionModel _KhoKiemKe;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new KhoKiemKeRepository(context);
                if (_KhoKiemKe != null)
                {
                    var kiemkeEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe();
                    kiemkeEntity.KiemKeId = _KhoKiemKe.KiemKeId;

                    kiemkeEntity.XoaYN = "Y";

                    kiemkeEntity = await repo.UpdatePartial(kiemkeEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe.XoaYN)
                        );

                    _KhoKiemKe.XoaYN = kiemkeEntity.XoaYN;
                }
                else
                {
                    if (_listKhoKiemKe != null && _listKhoKiemKe.Count > 0)
                    {


                        foreach (var kiemkeModel in _listKhoKiemKe)
                        {

                            if (kiemkeModel.KiemKeId > 0)
                            {
                                var kiemkeEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe();
                                kiemkeEntity.KiemKeId = kiemkeModel.KiemKeId;

                                kiemkeEntity.XoaYN = "Y";

                                kiemkeEntity = await repo.UpdatePartial(kiemkeEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoKiemKe.XoaYN)
                                    );

                                kiemkeModel.XoaYN = kiemkeEntity.XoaYN;
                            }
                        }
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listKhoKiemKe, null);
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
                _listKhoKiemKe = JsonConvert.DeserializeObject<List<KhoKiemKeActionModel>>(congViec);
            }
            catch
            {
                _KhoKiemKe = JsonConvert.DeserializeObject<KhoKiemKeActionModel>(congViec);
            }

        }
        #endregion

        #region private model
        private class KhoKiemKeActionModel
        {
            public int KiemKeId { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}
