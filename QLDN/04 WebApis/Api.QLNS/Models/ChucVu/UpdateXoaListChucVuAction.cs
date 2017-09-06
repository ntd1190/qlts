/*****************************************************************************
1. Create Date  : 2017.06.02
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNMAIN/ChucVu/
4. Description  : Action api update xoa thong tin chu vu theo id
5. History      : 2017.06.02(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLNS.ChucVu;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SongAn.QLDN.Api.QLNS.Models.ChucVu
{
    public class UpdateXoaListChucVuAction
    {
        #region public
        public string listChucVu { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.MSSQL_QLDN_QLNS.Entity.ChucVu> _listChucVu;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _listChucVu = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.ChucVu>>(listChucVu);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new BaseException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateXoaListChucVuBiz(context);
                biz.ChucVuId = getListIdString(_listChucVu);

                var result = (await biz.Execute()).ToList();

                InsertLuocSuAction ls = new InsertLuocSuAction();
                for (int i = 0; i < result.Count(); i++)
                {
                    if (result[i].XoaYN == "Y")
                    {
                        ls.InsertLuocSu(context, "ChucVu", result[i].ChucVuId, "Delete", _LoginId);
                    }
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
        private string getListIdString(List<Entity.MSSQL_QLDN_QLNS.Entity.ChucVu> list)
        {
            List<string> _ids = new List<string>();

            foreach (var id in list)
            {
                _ids.Add(id.ChucVuId.ToString());
            }
            return String.Join("|", _ids);
        }
    }
}

