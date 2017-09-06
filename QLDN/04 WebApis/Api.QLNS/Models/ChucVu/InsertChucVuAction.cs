/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Van Phu Hoi
3. Function     : QLDNMAIN/ChucVu/
4. Description  : Action api insert thong tin chu vu theo id
5. History      : 2017.005.25(Van Phu Hoi) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLNS.ChucVu;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.ChucVu
{
    public class InsertChucVuAction
    {
        #region public
        //public string ChucVuId { get; set; }
        public string MaChucVu { get; set; }
        public string TenChucVu { get; set; }
        public string GhiChu { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new FormatException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();


                var biz = new InsertChucVuBiz(context);
                biz.ChucVuId = 0;
                biz.MaChucVu = MaChucVu;
                biz.TenChucVu = TenChucVu;
                biz.GhiChu = GhiChu;
                biz.LoginId = _LoginId;

                var list = await biz.Execute();
                if (list.Count() > 0)
                {
                    var obj = list.FirstOrDefault();

                    InsertLuocSuAction ls = new InsertLuocSuAction();
                    ls.InsertLuocSu(context, "ChucVu", obj.ChucVuId, "Insert", _LoginId);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest,  ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

    }
}

