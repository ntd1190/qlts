

using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class DeleteListNhanVienAction
    {
        #region public
        public string ids { get; set; }
        #endregion

        #region private
        private List<int> _listId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var count = 0;

                var repo = new NhanVienRepository(context);

                for (int i = 0; i < _listId.Count; i++)
                {
                    if (_listId[i] > 0 && await repo.Delete(_listId[i]))
                    {
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

        private void init()
        {
            var _ids = ids.Split(',');
            _listId = new List<int>();

            for (int i = 0; i < _ids.Length; i++)
            {
                _listId.Add(Protector.Int(_ids[i]));
            }
        }

        private void validate()
        {
            for (int i = 0; i < _listId.Count; i++)
            {
                if (_listId[i] < 1)
                {
                    throw new FormatException("NhanVienId không hợp lệ");
                }
            }
        }
    }
}