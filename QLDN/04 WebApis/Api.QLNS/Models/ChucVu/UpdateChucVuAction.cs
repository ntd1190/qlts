/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Van Phu Hoi
3. Function     : QLDNMAIN/ChucVu/
4. Description  : Action api update thong tin chu vu theo id
5. History      : 2017.005.25(Van Phu Hoi) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLNS.ChucVu;
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
    public class UpdateChucVuAction
    {
        #region public
        public string ChucVuId { get; set; }
        public string MaChucVu { get; set; }
        public string TenChucVu { get; set; }
        public string GhiChu { get; set; }
        public string CtrVersion { get; set; }
        public string LoginId { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        private int _ChucVuId;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _draw = Protector.Int(draw);
            _start = Protector.Int(start);
            _length = Protector.Int(length);

            _length = _length < 1 ? 100 : _length;
            _ChucVuId = Protector.Int(ChucVuId, 0); 
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
                /*
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                */
                var biz = new UpdateChucVuBiz(context);
                biz.ChucVuId = _ChucVuId;
                biz.LoginId = _LoginId;
                biz.MaChucVu = MaChucVu;
                biz.TenChucVu = TenChucVu;
                biz.GhiChu = GhiChu;
                biz.CtrVersion = CtrVersion;

                var result = await biz.Execute();

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "ChucVu", _ChucVuId, "Update", _LoginId);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, null);
                /*
                IEnumerable<dynamic> list = await biz.Execute();

                if (list.Count() > 0)
                {
                    var obj = list.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;
                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
                */
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

    }
}

