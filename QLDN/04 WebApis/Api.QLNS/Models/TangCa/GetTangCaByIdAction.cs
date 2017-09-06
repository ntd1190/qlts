/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/TangCa/
4. Description  : Action api Lấy Tăng ca theo id
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.TangCa
{
    /// <summary>
    /// Action api Lấy Tăng ca theo id
    /// </summary>
    public class GetTangCaByIdAction
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
        public GetTangCaByIdAction()
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
            if (_id < 1) {throw new FormatException("Id Empty");}

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

                var repo = new TangCaRepository(context);
                var obj = await repo.GetById(_id);

                if (obj == null)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy Id '{0}'", _id));
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, obj, null);
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