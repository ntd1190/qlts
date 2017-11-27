using SongAn.QLKD.Biz.QLKD.ChiTieu;
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
using Newtonsoft.Json;

namespace SongAn.QLKD.Api.QLKD.Models.ChiTieu
{
    public class InsertChiTieuAction
    {
        public string phieuChiTieu { get; set; }
        public string listChiTiet { get; set; }
        public string userId { get; set; }

        #region private
        private Entity.QLKD.Entity.KDChiTieu _phieuChiTieu;
        private List<Entity.QLKD.Entity.KDChiTieuChiTiet> _listChiTiet;
        private DataTable MyTable_ChiTieuChiTiet;

        private string _UserId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var bizHeader = new InsertChiTieuBiz(context);

                bizHeader.Nam = Protector.String(_phieuChiTieu.Nam);
                bizHeader.NguoiTao = Protector.Int(_phieuChiTieu.NguoiTao);
                bizHeader.UserId = _UserId;
                bizHeader.MyTable_ChiTieuChiTiet = MyTable_ChiTieuChiTiet;

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
            var __phieuChiTieu = JsonConvert.DeserializeObject<dynamic>(phieuChiTieu);
           
            phieuChiTieu = JsonConvert.SerializeObject(__phieuChiTieu);
            _phieuChiTieu = JsonConvert.DeserializeObject<Entity.QLKD.Entity.KDChiTieu>(phieuChiTieu);

            //////////////////////////////////////////////////////////////////////////

            var __phieuChiTieuChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuChiTieuChiTiet)
            {
                item.NgayCapNhat = DateTime.ParseExact(item.NgayCapNhat.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            }

            listChiTiet = JsonConvert.SerializeObject(__phieuChiTieuChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLKD.Entity.KDChiTieuChiTiet>>(listChiTiet);
            MyTable_ChiTieuChiTiet = new DataTable();
            MyTable_ChiTieuChiTiet.Columns.Add("ChiTieuId", typeof(int));
            MyTable_ChiTieuChiTiet.Columns.Add("NhanVienId", typeof(int));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang1", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang2", typeof(decimal)); 
            MyTable_ChiTieuChiTiet.Columns.Add("Thang3", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang4", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang5", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang6", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang7", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang8", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang9", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang10", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang11", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("Thang12", typeof(decimal));
            MyTable_ChiTieuChiTiet.Columns.Add("NgayCapNhat", typeof(DateTime));
            foreach (var item in _listChiTiet)
            {
                MyTable_ChiTieuChiTiet.Rows.Add(Protector.Int(item.ChiTieuId), Protector.Int(item.NhanVienId), Protector.Decimal(item.Thang1), Protector.Decimal(item.Thang2), Protector.Decimal(item.Thang3), Protector.Decimal(item.Thang4), Protector.Decimal(item.Thang5), Protector.Decimal(item.Thang6), Protector.Decimal(item.Thang7), Protector.Decimal(item.Thang8), Protector.Decimal(item.Thang9), Protector.Decimal(item.Thang10), Protector.Decimal(item.Thang11), Protector.Decimal(item.Thang12), Protector.DateTime(item.NgayCapNhat));
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
