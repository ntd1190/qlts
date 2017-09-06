/*****************************************************************************
1. Create Date : 2017.05.17
2. Creator     : Nguyen Thanh Binh
3. Description : action lấy danh sách quá trình công tác của nhân viên
4. History     : 2017.05.17(Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
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

namespace SongAn.QLDN.Api.QLNS.Models.PhieuCongTac
{
    public class UpdateQuaTrinhCongTacAction
    {
        #region public
        public string QuaTrinhCongTacId { get; set; }
        public string NhanVienId { get; set; }
        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string ChucVuId { get; set; }
        public string CongViecChinh { get; set; }
        public string ThanhTuu { get; set; }
        public string Hinh { get; set; }
        public string CtrVersion { get; set; }
        #endregion

        #region private
        private int _QuaTrinhCongTacId;
        private int _NhanVienId;
        private int _ChucVuId;
        private DateTime? _TuNgay;
        private DateTime? _DenNgay;
        private int _CtrVersion;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _QuaTrinhCongTacId = Protector.Int(QuaTrinhCongTacId, 0);
            _NhanVienId = Protector.Int(NhanVienId, 0);
            _TuNgay = Protector.DateTime(TuNgay, "yyyy-MM-dd", true);
            _DenNgay = Protector.DateTime(DenNgay, "yyyy-MM-dd", true);
            _ChucVuId = Protector.Int(ChucVuId, 0);
            CongViecChinh = Protector.String(CongViecChinh, "");
            ThanhTuu = Protector.String(ThanhTuu, "");
            Hinh = Protector.String(Hinh, "");
            _CtrVersion = Protector.Int(CtrVersion, -1);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_NhanVienId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin nhân viên.");
            }
            if (_TuNgay == null)
            {
                throw new BaseException("'TuNgay' không đúng.");
            }
            if (_DenNgay == null)
            {
                throw new BaseException("'DenNgay' không đúng.");
            }
            if (_ChucVuId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin chức vụ.");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateQuaTrinhCongTacBiz(context);
                biz.QuaTrinhCongTacId = _QuaTrinhCongTacId;
                biz.NhanVienId = _NhanVienId; // phải có nhân viên id để kiểm tra trạng thái xóa
                biz.TuNgay = _TuNgay.Value;
                biz.DenNgay = _DenNgay.Value;
                biz.ChucVuId = _ChucVuId;
                biz.CongViecChinh = CongViecChinh;
                biz.ThanhTuu = ThanhTuu;
                biz.Hinh = Hinh;
                biz.CtrVersion = _CtrVersion;

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
