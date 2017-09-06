/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/TangCa/
4. Description  : Action api Xoa Tăng Ca theo id
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
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
    /// Action api Xoa Tăng Ca theo id
    /// </summary>
    public class DeleteListTangCaAction
    {
        #region public properties

        /// <summary>
        /// id
        /// </summary>
        public string ids { get; set; }

        #endregion

        #region private variable

        private List<int> _listId;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public DeleteListTangCaAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            var _ids = ids.Split(',');

            _listId = new List<int>();

            for (int i = 0; i < _ids.Length; i++)
            {
                _listId.Add(Protector.Int(_ids[i]));
                _listId.Add(Protector.Int(_ids[i]));
            }
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            for (int i = 0; i < _listId.Count; i++)
            {
                if (_listId[i] < 1)
                {
                    throw new FormatException("Id không hợp lệ");
                }
            }
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

                var count = 0;

                var repo = new TangCaRepository(context);

                for (int i = 0; i < _listId.Count; i++)
                {
                    if (_listId[i] > 0 && await repo.Delete(_listId[i]))
                    {

                        InsertLuocSuAction ls = new InsertLuocSuAction();
                        ls.InsertLuocSu(context, "TangCa", _listId[i], "Delete",0);
                        count++;
                    }
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, count, null);

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