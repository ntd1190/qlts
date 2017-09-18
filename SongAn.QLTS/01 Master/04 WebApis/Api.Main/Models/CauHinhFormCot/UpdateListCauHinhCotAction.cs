/*****************************************************************************
1. Create Date : 2017.04.21
2. Creator     : Nguyen Thanh Binh
3. Description : lấy danh sách cột
4. History     : 2017.04.21(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Biz.Main.CauHinhFormCot;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SongAn.QLTS.Data.Repository.QLTS_MAIN;

namespace SongAn.QLTS.Api.Main.Models.CauHinhFormCot
{
    public class UpdateListCauHinhCotAction
    {
        #region public
        public string listCot { get; set; }
        #endregion

        #region private
        private List<UpdateListCauHinhCotBiz.CauHinhFormCotBizModel> _listCot;
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _listCot = JsonConvert.DeserializeObject<List<UpdateListCauHinhCotBiz.CauHinhFormCotBizModel>>(listCot);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_listCot == null)
            {
                throw new FormatException("Dữ liệu không hợp lệ.");
            }
        }

        #endregion
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateListCauHinhCotBiz(context);
                biz.listCot = _listCot;

                IEnumerable<dynamic> data = await biz.Execute();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, data, null);
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

        #region Model
        #endregion
    }
}
