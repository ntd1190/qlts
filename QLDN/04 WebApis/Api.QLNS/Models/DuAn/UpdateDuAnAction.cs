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
namespace SongAn.QLDN.Api.QLNS.Models.DuAn
{
    public class UpdateDuAnAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.DuAn
    {
        private int _CtrVersion;
        public string NhanVien { get; set; }
        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                dynamic result = new System.Dynamic.ExpandoObject();
                var repo = new DuAnRepository(context);
                await repo.UpdatePartial(this,
                    nameof(TenDuAn),
                    nameof(MoTa),
                    nameof(MaTrangThai),
                    nameof(PhongBan),
                    nameof(QuanLy),
                    nameof(NgayBatDau),
                    nameof(NgayThatSuBatDau),
                    nameof(NgayKetThuc),
                    nameof(CtrVersion),
                    nameof(NgayThatSuKetThuc)
                     );
                result.data = this;
                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "DuAn", DuAnId, "Update",NguoiTao);
                Data.QLNS.DuAn.DeleteOneNhanVienDuAnDac dac = new Data.QLNS.DuAn.DeleteOneNhanVienDuAnDac(context);
                dac.DuAnId = DuAnId.ToString();
                await dac.Execute();
                if (NhanVien!=null && NhanVien!="")
                {
                    var nvda = new Entity.MSSQL_QLDN_QLNS.Entity.NhanVienDuAn();
                    var nvids = NhanVien.Split('|');
                    foreach (var nv in nvids)
                    {
                        nvda.DuAnId = DuAnId;
                        nvda.XoaYN = "N";
                        nvda.NhanVienId = Protector.Int(nv);
                        await repo.InsertNV(nvda);
                    }
                   
                }
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
            var _id = Protector.Int(DuAnId);

            if (_id < 1)
            {
                throw new FormatException("IsuaeId is empty");
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
