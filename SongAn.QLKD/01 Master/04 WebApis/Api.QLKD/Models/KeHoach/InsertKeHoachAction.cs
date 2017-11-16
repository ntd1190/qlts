using Newtonsoft.Json;
using SongAn.QLKD.Biz.QLKD.KeHoach;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.KeHoach
{
    public class InsertKeHoachAction
    {
        public string phieuKeHoach { get; set; }
        public string listChiTiet { get; set; }
        public string userId { get; set; }

        #region private
        private Entity.QLKD.Entity.KDKeHoach _phieuKeHoach;
        private List<Entity.QLKD.Entity.KDKeHoachChiTiet> _listChiTiet;
        private DataTable MyTable_KeHoachChiTiet;
        
        private string _UserId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHeader = new InsertKeHoachBiz(context);

                bizHeader.KyKeHoach = Protector.String(_phieuKeHoach.KyKeHoach);
                bizHeader.Nam = Protector.String(_phieuKeHoach.Nam);
                bizHeader.SoPhieu = Protector.String(_phieuKeHoach.SoPhieu);
                bizHeader.KhachHangId = Protector.Int(_phieuKeHoach.KhachHangId);
                bizHeader.NguoiTao = Protector.Int(_phieuKeHoach.NguoiTao);
                bizHeader.UserId = _UserId;
                bizHeader.MyTable_KeHoachChiTiet = MyTable_KeHoachChiTiet;

                var result = await bizHeader.Execute();


                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        private void init()
        {
            var __phieuKeHoach = JsonConvert.DeserializeObject<dynamic>(phieuKeHoach);
           
            phieuKeHoach = JsonConvert.SerializeObject(__phieuKeHoach);
            _phieuKeHoach = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDKeHoach>(phieuKeHoach);

            //////////////////////////////////////////////////////////////////////////

            var __phieuKiemKeChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);
            listChiTiet = JsonConvert.SerializeObject(__phieuKiemKeChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.KDKeHoachChiTiet>>(listChiTiet);
            MyTable_KeHoachChiTiet = new DataTable();
            MyTable_KeHoachChiTiet.Columns.Add("KeHoachId", typeof(int));
            MyTable_KeHoachChiTiet.Columns.Add("HangHoaId", typeof(int));
            MyTable_KeHoachChiTiet.Columns.Add("LoaiHangHoa", typeof(int));
            MyTable_KeHoachChiTiet.Columns.Add("SoLuong", typeof(decimal));
            MyTable_KeHoachChiTiet.Columns.Add("DonGia", typeof(decimal));
            MyTable_KeHoachChiTiet.Columns.Add("NgayDuKien", typeof(DateTime));
            MyTable_KeHoachChiTiet.Columns.Add("TrangThai", typeof(int));
            MyTable_KeHoachChiTiet.Columns.Add("NgayTao", typeof(DateTime));
            foreach (var item in _listChiTiet)
            {
                MyTable_KeHoachChiTiet.Rows.Add(Protector.Int(item.KeHoachId), Protector.Int(item.HangHoaId), Protector.Int(item.LoaiHangHoa), Protector.Decimal(item.SoLuong), Protector.Decimal(item.DonGia), Protector.DateTime(item.NgayDuKien), Protector.Int(item.TrangThai), Protector.DateTime(item.NgayTao));
            }

           
            //////////////////////////////////////////////////////////////////////////
            _UserId = Protector.String(userId);

        }

        private void validate()
        {

        }

        #region helpers
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

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
        #endregion
    }
}
