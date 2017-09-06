/*****************************************************************************
1. Create Date  : 2017.07.27
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUBAOHANH/LIST
4. Description  : DANH SÁCH PHIẾU BẢO HÀNH
5. History      : 2017.07.27 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuBaoHanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuBaoHanh
{
    public class UpdateXoaListPhieuBaoHanhAction
    {

        #region PUBLIC
        public string  listPhieuBaoHanh { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private List<dynamic> _list;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<dynamic>>(listPhieuBaoHanh);
            _LoginId = Protector.Int(loginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateXoaListPhieuBaoHanhBiz(context);
                var ls = new InsertKhoLuocSuAction();
                foreach (var item in _list)
                {
                    biz.PHIEUBAOHANH_ID = item.KPBH_ID;
                    biz.CTRVERSION = Protector.Int(item.KPBH_CTRVERSION, -1);
                    var result = await biz.Execute();
                    if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                    {
                        throw new BaseException(biz.MESSAGE.Split('|')[2]);
                    }

                    item.XoaYN = "Y";
                    ls.InsertKhoLuocSu(context, "KhoPhieuBaoHanh", biz.PHIEUBAOHANH_ID, "Delete", _LoginId);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _list, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region HELPERS

        #endregion
    }
}
