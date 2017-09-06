using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System.Threading.Tasks;
using System;
using SongAn.QLDN.Util.Common.Helper;
using System.Net;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoLoaiHangHoa;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SongAn.QLDN.Api.QLKho.Models.KhoLoaiHangHoa
{
    public class UpdateXoaListKhoLoaiHangHoaAction
    {
        #region public
        public string listLoaiHangHoa { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoLoaiHangHoa> _list;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _list = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoLoaiHangHoa>>(listLoaiHangHoa);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var _ids = new List<int>();
                foreach (var loai in _list)
                {
                    _ids.Add(loai.LoaiHangHoaId);
                }

                var biz = new UpdateXoaListKhoLoaiHangHoaBiz(context);

                biz.LOAI_HANG_HOA_IDS = String.Join("|", _ids);
                biz.LOGIN_ID = _LoginId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                var ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "LoaiHangHoa", 0, "Delete", _LoginId);

                dynamic metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
