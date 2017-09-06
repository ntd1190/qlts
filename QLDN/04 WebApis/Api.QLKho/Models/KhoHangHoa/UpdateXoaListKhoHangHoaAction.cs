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

namespace SongAn.QLDN.Api.QLKho.Models.KhoHangHoa
{
    public class UpdateXoaListKhoHangHoaAction
    {
        #region public
        public string congViec { get; set; }
        #endregion

        #region private
        private List<KhoHangHoaActionModel> _listKhoHangHoa;
        private KhoHangHoaActionModel _KhoHangHoa;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var repo = new KhoHangHoaRepository(context);
                if (_KhoHangHoa != null)
                {
                    var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa();
                    congviecEntity.HangHoaId = _KhoHangHoa.HangHoaId;

                    congviecEntity.XoaYN = "Y";

                    congviecEntity = await repo.UpdatePartial(congviecEntity,
                        nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa.XoaYN)
                        );

                    _KhoHangHoa.XoaYN = congviecEntity.XoaYN;
                    InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                    ls.InsertKhoLuocSu(context, "KhoHangHoa", _KhoHangHoa.HangHoaId, "Delete", 0);
                }
                else
                {
                    if (_listKhoHangHoa != null && _listKhoHangHoa.Count > 0)
                    {
                        

                        foreach (var congviecModel in _listKhoHangHoa)
                        {

                            if (congviecModel.HangHoaId > 0)
                            {
                                var congviecEntity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa();
                                congviecEntity.HangHoaId = congviecModel.HangHoaId;

                                congviecEntity.XoaYN = "Y";

                                congviecEntity = await repo.UpdatePartial(congviecEntity,
                                    nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoHangHoa.XoaYN)
                                    );

                                congviecModel.XoaYN = congviecEntity.XoaYN;
                                InsertKhoLuocSuAction ls = new InsertKhoLuocSuAction();
                                ls.InsertKhoLuocSu(context, "KhoHangHoa", congviecEntity.HangHoaId, "Delete", congviecEntity.NguoiTao);
                            }
                        }
                    }
                }
                
                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listKhoHangHoa, null);
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
                _listKhoHangHoa = JsonConvert.DeserializeObject<List<KhoHangHoaActionModel>>(congViec);
            }
            catch {
                _KhoHangHoa = JsonConvert.DeserializeObject<KhoHangHoaActionModel>(congViec);
            }
           
        }
        #endregion

        #region private model
        private class KhoHangHoaActionModel
        {
            public int HangHoaId { get; set; }
            public string XoaYN { get; set; }
        }
        #endregion
    }
}