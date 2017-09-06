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
using SongAn.QLDN.Biz.QLKho.KhoTongHopXuatNhapTonTheoKy;

namespace SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTonTheoKy
{
    public class UpdateXoaTongHopXuatNhapTonTheoKyAction
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
        public UpdateXoaTongHopXuatNhapTonTheoKyAction()
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
                    var repo = new KhoXuatNhapTonTheoKyRepository(context);

                    foreach (var obj in _listObj)
                    {

                        if (obj.ID > 0)
                        {
                            //var objEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy();
                            //objEntity.KyId = obj.ID;

                            //objEntity.XoaYN = "Y";

                            //objEntity = await repo.UpdatePartial(objEntity,
                            //    nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.XoaYN)
                            //    );

                            //obj.XoaYN = objEntity.XoaYN;

                            var biz = new DeleteKhoKyChiTietByKyIdBiz(context);
                            biz.KyId = obj.ID;
                            var result = await biz.Execute();

                            dynamic _metaData = new System.Dynamic.ExpandoObject();

                            return ActionHelper.returnActionResult(HttpStatusCode.OK, _listObj, null);
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
