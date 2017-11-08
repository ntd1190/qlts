
using SongAn.QLKD.Biz.QLKD.ChucVu;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SongAn.QLKD.Api.QLKD.Models.ChucVu
{
    public class UpdateXoaListChucVuAction
    {
        #region public
        public string listChucVu { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private List<Entity.QLKD.Entity.ChucVu> _listChucVu;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _listChucVu = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.ChucVu>>(listChucVu);
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
        private string getListIdString(List<Entity.QLKD.Entity.ChucVu> list)
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

