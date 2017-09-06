/*****************************************************************************
1. Create Date : 2017.05.25
2. Creator     : Nguyen Thanh Binh
3. Description : action cập nhật thông tin hợp đồng của nhân viên
4. History     : 2017.05.25(Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
using SongAn.QLDN.Biz.QLNS.QuanLyHopDong;
using SongAn.QLDN.Biz.QLNS.QuaTrinhCongTac;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.QuanLyHopDong
{
    public class UpdateQuanLyHopDongAction : Entity.MSSQL_QLDN_QLNS.Entity.QuanLyHopDong
    {
        #region public
        public string strTuNgay { get; set; }
        public string strDenNgay { get; set; }
        public string strNgayKetThucSom { get; set; }
        #endregion

        #region private
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            var _TuNgay = Protector.DateTime(strTuNgay, "yyyy-MM-dd", true);
            if (_TuNgay == null)
            {
                throw new BaseException("TuNgay không dúng.");
            }
            TuNgay = _TuNgay.Value;

            var _DenNgay = Protector.DateTime(strDenNgay, "yyyy-MM-dd", true);
            if (_DenNgay == null)
            {
                throw new BaseException("DenNgay không dúng.");
            }
            DenNgay = _DenNgay.Value;

            NgayKetThucSom = Protector.DateTime(strNgayKetThucSom, "yyyy-MM-dd", true);
            HopDong = Protector.String(HopDong, "");
            HuongLuong = Protector.Decimal(HuongLuong, 0);
            Luong = Protector.Int(Luong, 0);
            Hinh = Protector.String(Hinh, "");
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (NhanVienId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin nhân viên.");
            }
            if (QuanLyHopDongId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin hợp đồng.");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateQuanLyHopDongBiz(context);
                biz.NhanVienId = NhanVienId;
                biz.QuanLyHopDongId = QuanLyHopDongId;
                biz.TuNgay = TuNgay;
                biz.DenNgay = DenNgay;
                biz.HopDong = HopDong;
                biz.HuongLuong = HuongLuong;
                biz.Luong = Luong;
                biz.Hinh = Hinh;
                biz.NgayKetThucSom = NgayKetThucSom;
                biz.CtrVersion = CtrVersion;

                var list = (await biz.Execute());

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
            }
            catch (BaseException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

    }
}
