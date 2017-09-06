using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using System.Globalization;
using SongAn.QLDN.Biz.QLKho.KhoImportDauKy;

namespace SongAn.QLDN.Api.QLKho.Models.KhoImportDauKy
{
    public class ImportDauKyAction
    {
        #region public
        public string dauKy { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private List<KhoBaoCaoTheoKyActionModel> _listDauKy;
        private string _loginId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                int i = 0;
                int count_list = _listDauKy.Count;

                var biz = new ImportDauKyBiz(context);
                foreach (var kychitietmodel in _listDauKy)
                {
                    i++;
                    biz = new ImportDauKyBiz(context);
                    biz.MA_KHO = Protector.String(kychitietmodel.MaKho);
                    biz.MA_HANG_HOA = Protector.String(kychitietmodel.MaHangHoa);
                    biz.TEN_HANG_HOA = Protector.String(kychitietmodel.TenHangHoa);
                    biz.DON_VI_TINH = Protector.String(kychitietmodel.DonViTinh);
                    biz.LO_HANG = Protector.String(kychitietmodel.LoHang);
                    biz.THANG_NAM = Protector.String(kychitietmodel.ThangNam);
                    biz.TON_DAU = Protector.Decimal(kychitietmodel.TonDau);
                    biz.GIA_NHAP = Protector.Decimal(kychitietmodel.GiaNhap);
                    biz.LOGIN_ID = loginId;
                    if (i == count_list)
                    {
                        biz.IMPORT_YN = "Y";
                    }
                    else
                        biz.IMPORT_YN = "N";
                    var result = await biz.Execute();
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, _listDauKy, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        #region init & validate
        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
        }

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _listDauKy = JsonConvert.DeserializeObject<List<KhoBaoCaoTheoKyActionModel>>(dauKy);
            _loginId = loginId;
        }
        #endregion

        #region private model
        private class KhoBaoCaoTheoKyActionModel
        {
            public string MaKho { get; set; }
            public string MaHangHoa { get; set; }
            public string TenHangHoa { get; set; }
            public string DonViTinh { get; set; }
            public string LoHang { get; set; }
            public string ThangNam { get; set; }
            public decimal TonDau { get; set; }
            public decimal GiaNhap { get; set; }
            
        }
        #endregion

    }
}
