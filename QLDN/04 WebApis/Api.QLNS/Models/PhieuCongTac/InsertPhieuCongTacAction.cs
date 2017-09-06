using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
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
    public class InsertPhieuCongTacAction
    {
        #region public
        public string NoiDung { get; set; }
        public string NgayDi { get; set; }
        public string NgayVe { get; set; }
        public string nhanVienId { get; set; }
        public string NguoiDuyetId { get; set; }
        public string SoNgay { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private DateTime? _NgayDi;
        private DateTime? _NgayVe;
        private int _NhanVienId;
        private int _NguoiDuyetId;
        private decimal _SoNgay;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _NgayDi = Protector.DateTime(NgayDi, "yyyy-MM-dd", true);
            _NgayVe = Protector.DateTime(NgayVe, "yyyy-MM-dd", true);
            _NhanVienId = Protector.Int(nhanVienId, 0);
            _NguoiDuyetId = Protector.Int(NguoiDuyetId, 0);
            _SoNgay = Protector.Decimal(SoNgay, 0);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_NgayDi == null)
            {
                throw new FormatException("Chưa nhập ngày đi");
            }
            if (_NgayVe == null)
            {
                throw new FormatException("Chưa nhập ngày đi");
            }
            if (_NgayDi > _NgayVe)
            {
                throw new FormatException("Ngày đi phải nhỏ hơn hoặc bằng ngày về");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();


                var biz = new InsertPhieuCongTacBiz(context);
                biz.NoiDung = NoiDung;
                biz.NgayDi = _NgayDi.Value;
                biz.NgayVe = _NgayVe.Value;
                biz.nhanVienId = _NhanVienId;
                biz.NguoiDuyetId = _NguoiDuyetId;
                biz.SoNgay = _SoNgay;
                biz.NguoiTao = _LoginId;

                var result = await biz.Execute();

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "PhieuCongTac", result.PhieuCongTacId, "Insert", _LoginId);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

    }
}
