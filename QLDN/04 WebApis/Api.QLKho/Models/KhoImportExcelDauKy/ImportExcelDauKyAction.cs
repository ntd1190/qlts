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
using SongAn.QLDN.Biz.QLKho.KhoImportExcelDauKy;

namespace SongAn.QLDN.Api.QLKho.Models.KhoImportExcelDauKy
{
    public class ImportExcelDauKyAction
    {
        #region public
        public string dauKy { get; set; }
        public int kyId { get; set; }
        #endregion

        #region private
        private List<KhoBaoCaoTheoKyActionModel> _listDauKy;
        private int _kyId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                /* b repo */
                //var KyChiTiet = new Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKyChiTiet();
                //KhoBaoCaoTheoKyChiTietRepository repo = new KhoBaoCaoTheoKyChiTietRepository(context);
                //await repo.Delete(45);
                //if (_listDauKy.Count > 0)
                //{
                //    // delete old data
                //    //foreach (var kychitietmodel in _listDauKy)
                //    //{
                //    //    int kyId_del = Protector.Int(kychitietmodel.KyId);
                //    //    await repo.Delete(kyId_del);
                //    //    break;
                //    //}

                //    foreach (var kychitietmodel in _listDauKy)
                //    {
                //        KyChiTiet.KyId = Protector.Int(kychitietmodel.KyId);
                //        KyChiTiet.KhoHangId = Protector.Int(kychitietmodel.KhoHangId);
                //        KyChiTiet.HangHoaId = Protector.Int(kychitietmodel.HangHoaId);
                //        KyChiTiet.SoLuongTonDau = Protector.Decimal(kychitietmodel.SoLuongTonDau);
                //        KyChiTiet.GiaTriTonDau = Protector.Decimal(kychitietmodel.GiaTriTonDau);
                //        KyChiTiet.SoLuongNhapTrongKy = Protector.Decimal(kychitietmodel.SoLuongNhapTrongKy);
                //        KyChiTiet.GiaTriNhapTrongKy = Protector.Decimal(kychitietmodel.GiaTriNhapTrongKy);
                //        KyChiTiet.SoLuongXuatTrongKy = Protector.Decimal(kychitietmodel.SoLuongXuatTrongKy);
                //        KyChiTiet.DonGiaXuatBinhQuan = Protector.Decimal(kychitietmodel.DonGiaXuatBinhQuan);
                //        KyChiTiet.SoLuongTonCuoi = Protector.Decimal(kychitietmodel.SoLuongTonCuoi);
                //        KyChiTiet.GiaTriTonCuoi = Protector.Decimal(kychitietmodel.GiaTriTonCuoi);
                //        await repo.Insert(KyChiTiet);
                //    }
                //}
                /* e repo */
                var biz = new ImportExcelDauKyBiz(context);
                int index = 1;
                foreach (var kychitietmodel in _listDauKy)
                {
                    biz = new ImportExcelDauKyBiz(context);
                    biz.KY_ID = _kyId;      //Protector.Int(kychitietmodel.KyId);
                    biz.KHO_HANG_ID = 0;    //Protector.Int(kychitietmodel.KhoHangId);
                    biz.HANG_HOA_ID = 0;    //Protector.Int(kychitietmodel.HangHoaId);
                    biz.MA_HANG_HOA = Protector.String(kychitietmodel.MaHangHoa);
                    biz.SL_TON_DAU = Protector.Decimal(kychitietmodel.SoLuongTonDau);
                    biz.GT_TON_DAU = Protector.Decimal(kychitietmodel.GiaTriTonDau);
                    biz.SL_NHAP_TRONG_KY = Protector.Decimal(kychitietmodel.SoLuongNhapTrongKy);
                    biz.GT_NHAP_TRONG_KY = Protector.Decimal(kychitietmodel.GiaTriNhapTrongKy);
                    biz.SL_XUAT_TRONG_KY = Protector.Decimal(kychitietmodel.SoLuongXuatTrongKy);
                    biz.DG_XUAT_BINH_QUAN = Protector.Decimal(kychitietmodel.DonGiaXuatBinhQuan);
                    biz.SL_TON_CUOI = Protector.Decimal(kychitietmodel.SoLuongTonCuoi);
                    biz.GT_TON_CUOI = Protector.Decimal(kychitietmodel.GiaTriTonCuoi);
                    biz.XOA = index;
                    var result = await biz.Execute();
                    index = 2;
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

            _kyId = kyId;
            _listDauKy = JsonConvert.DeserializeObject<List<KhoBaoCaoTheoKyActionModel>>(dauKy);

        }
        #endregion

        #region private model
        private class KhoBaoCaoTheoKyActionModel
        {
            public int KyId { get; set; }
            public int KhoHangId { get; set; }
            public int HangHoaId { get; set; }
            public string MaHangHoa { get; set; }
            public decimal SoLuongTonDau { get; set; }
            public decimal GiaTriTonDau { get; set; }
            public decimal SoLuongNhapTrongKy { get; set; }
            public decimal GiaTriNhapTrongKy { get; set; }
            public decimal SoLuongXuatTrongKy { get; set; }
            public decimal DonGiaXuatBinhQuan { get; set; }
            public decimal SoLuongTonCuoi { get; set; }
            public decimal GiaTriTonCuoi { get; set; }
        }
        #endregion

    }
}
