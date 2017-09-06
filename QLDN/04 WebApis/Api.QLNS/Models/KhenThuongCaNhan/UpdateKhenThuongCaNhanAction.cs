using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;

namespace SongAn.QLDN.Api.QLNS.Models.KhenThuongCaNhan
{
    public class UpdateKhenThuongCaNhanAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhenThuongCaNhan
    {
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                var repo = new KhenThuongCaNhanRepository(context);
                await repo.UpdatePartial(this,
                     nameof(NhanVienId),
                    nameof(Ngay),
                    nameof(Tien),
                    nameof(BangChu),
                    nameof(LyDo),
                    nameof(HinhThuc),
                    nameof(VanBanSo)
                     );
                result.data = this;
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "KhenThuongCaNhan", KhenThuongCaNhanId, "Update",NguoiTao);
                return returnActionResult(this, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        private void validate()
        {
            var _id = Protector.Int(KhenThuongCaNhanId);

            if (_id < 1)
            {
                throw new FormatException("KhenThuongCaNhanId is empty");
            }
        }

        private void init()
        {
           
            _CtrVersion = Protector.Int(CtrVersion);
        }

        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }

        private ActionResultDto returnActionResult(object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = HttpStatusCode.OK;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
    }
}
