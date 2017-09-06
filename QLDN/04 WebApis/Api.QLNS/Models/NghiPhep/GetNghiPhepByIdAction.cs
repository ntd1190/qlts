/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/
4. Description  : Action api Lấy Nghỉ phép theo id
5. History      : 2017.04.19(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.NghiPhep
{
    /// <summary>
    /// Action api Lấy Nghỉ phép theo id
    /// </summary>
    public class GetNghiPhepByIdAction
    {
        #region public properties

        /// <summary>
        /// id
        /// </summary>
        public string id { get; set; }

        #endregion

        #region private variable

        int _id;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetNghiPhepByIdAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _id = Protector.Int(id);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            if (_id < 1) {throw new FormatException("NghiPhepId Empty");}

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
                Init();
                Validate();

                var repo = new NghiPhepRepository(context);
                var nghiphep = await repo.GetById(_id);

                if (nghiphep == null)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy NghiPhepId '{0}'", _id));
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, nghiphep, null);
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