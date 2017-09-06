using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using SongAn.QLDN.Util.Common.Helper;
using System.Globalization;
using SongAn.QLDN.Api.QLNS.Models.LuocSu;

namespace SongAn.QLDN.Api.QLNS.Models.CongViec
{
    public class UpdateCongViecAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.CongViec
    {
        private int _CtrVersion;
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                var repo = new CongViecRepository(context);
                await repo.UpdatePartial(this,
                    nameof(DuAnId),
                    nameof(TieuDe),
                    nameof(MoTa),
                    nameof(NgayBatDau),
                    nameof(NgayKetThuc),
                    nameof(NgayThatSuBatDau),
                    nameof(NgayThatSuKetThuc),
                    nameof(SoNgay),
                    nameof(TienDo),
                    nameof(NoiDungCongViec),
                    nameof(ThuanLoiKhoKhan),
                    nameof(GiaiPhapKienNghi),
                    nameof(MaTrangThai),
                    nameof(NguoiXuLy)
                  );
                result.data = this;
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "CongViec", CongViecId, "Update", NguoiTao);
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
            var _id = Protector.Int(CongViecId);

            if (_id < 1)
            {
                throw new FormatException("CongViecId is empty");
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
