using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace SongAn.QLDN.Biz.QLKho.KhoTongHopXuatNhapTonTheoKy
{
    public class GetListTongHopXuatNhapTonTheoKyByCriteriaBiz : SongAn.QLDN.Data.QLKho.KhoTongHopXuatNhapTonTheoKy.GetListTongHopXuatNhapTonTheoKyByCriteriaDac
    {
        #region public properties

        #endregion

        #region private variable

        #endregion

        #region constructor
        /// <summary>
        /// Ham khoi tao, chi nhan vao bien moi truong va goi lop base
        /// </summary>
        /// <param name="context"></param>
        public GetListTongHopXuatNhapTonTheoKyByCriteriaBiz(ContextDto context) : base(context)
        {

        }
        #endregion

        #region init & validate
        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {

        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {

        }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public override async Task<IEnumerable<dynamic>> Execute()
        {
            Init();
            Validate();

            // to do:
            // biz se thuc hien viec abc o day truoc khi goi dac

            // goi lai ham execute cua tang dac
            var result = await base.Execute();

            // to do:
            // biz se thuc hien viec abc voi result truoc khi return
            foreach (dynamic item in result)
            {
                // Modify loaibaocao
                var itemLoaiBaoCao = item.LoaiBaoCao;
                if (itemLoaiBaoCao != null)
                {
                    int baocao = Protector.Int(itemLoaiBaoCao);

                    switch (baocao)
                    {
                        case 1:
                            item.TenLoaiBaoCao = "Hằng Tháng";
                            item.LoaiBaoCao = "THANG";
                            break;
                        case 2:
                            item.TenLoaiBaoCao = "Hằng Quý";
                            item.LoaiBaoCao = "QUY";
                            break;
                        case 3:
                            item.TenLoaiBaoCao = "Hằng Năm";
                            item.LoaiBaoCao = "NAM";
                            break;
                    }
                }

                var itemTrangThai = item.MaTrangThai;
                if (itemTrangThai != null)
                {
                    string trangthai = itemTrangThai;

                    switch (trangthai)
                    {
                        case "BCK_KN":
                            item.TenMaTrangThai = "Kiểm nghiệm";
                            break;
                        case "BCK_HT":
                            item.TenMaTrangThai = "Hoàn thành";
                            break;
                    }
                }

                //// Modify Xoa
                //var itemXoa = item.Xoa;
                //var itemMaTrangThai = item.MaTrangThai;
                //if (itemXoa != null && !string.IsNullOrWhiteSpace(itemMaTrangThai))
                //{
                //    if (string.Equals(itemMaTrangThai, "BL_KN"))
                //        item.Xoa = "Xóa";
                //}

                //// Modify TinhToan
                //var itemTinhToan = item.TinhToan;
                //if (itemTinhToan != null && !string.IsNullOrWhiteSpace(itemMaTrangThai))
                //{
                //    if (string.Equals(itemMaTrangThai, "BL_KN"))
                //        item.TinhToan = "Tính toán";
                //    else
                //        item.TinhToan = "Xem lại";
                //}

                var itemXoa = item.XoaYN; // N or Y
                if (itemXoa != null && !string.IsNullOrWhiteSpace(itemTrangThai))
                {
                    if (string.Equals(itemTrangThai, "BCK_KN"))
                        item.XoaYN = "Xóa";
                    else // N or Y
                    {
                        item.XoaYN = "";
                        item.Import = "";
                    }

                }

                var itemKyTruoc = item.KyTruoc;
                if (itemKyTruoc != null)
                {
                    if (item.KyTruoc > 0)
                        item.Import = "";
                }

                var itemXem = item.Xem;
                item.Xem = "Xem";

                var itemTinhToan = item.TinhToan;
                if (itemTinhToan != null && !string.IsNullOrWhiteSpace(itemTrangThai))
                {
                    if (string.Equals(itemTrangThai, "BCK_KN"))
                        item.TinhToan = "Tính toán";
                }

                var itemKho = item.KhoHangId;
                if (itemKho != null)
                {
                    if (item.KhoHangId == 0)
                        item.TenKho = "Tất cả";
                    //else
                    //    item.KhoHangId = "Kho " + item.KhoHangId;
                }

            }
            return result;
        }

        #endregion
    }
}
