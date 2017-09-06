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
    public class UpdatePhieuCongTacAction
    {
        #region public
        public string PhieuCongTacId { get; set; }
        public string NoiDung { get; set; }
        public string NgayDi { get; set; }
        public string NgayVe { get; set; }
        public string nhanVienId { get; set; }
        public string SoNgay { get; set; }
        public string CtrVersion { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private DateTime? _NgayDi;
        private DateTime? _NgayVe;
        private int _PhieuCongTacId;
        private int _LoginId;
        private int _NhanVienId;
        private int _CtrVersion;
        private decimal _SoNgay;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _NgayDi = Protector.DateTime(NgayDi, "yyyy-MM-dd", true);
            _NgayVe = Protector.DateTime(NgayVe, "yyyy-MM-dd", true);
            _PhieuCongTacId = Protector.Int(PhieuCongTacId, 0);
            _NhanVienId = Protector.Int(nhanVienId, 0);
            _LoginId = Protector.Int(LoginId, 0);
            _SoNgay = Protector.Decimal(SoNgay, 0);
            _CtrVersion = Protector.Int(CtrVersion, 0);
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

                var biz = new UpdatePhieuCongTacBiz(context);
                biz.PhieuCongTacId = _PhieuCongTacId;
                biz.NoiDung = NoiDung;
                biz.NgayDi = _NgayDi.Value;
                biz.NgayVe = _NgayVe.Value;
                biz.nhanVienId = _NhanVienId;
                biz.SoNgay = _SoNgay;
                biz.CtrVersion = _CtrVersion;

                var result = await biz.Execute();

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "PhieuCongTac", _PhieuCongTacId, "Update", _LoginId);

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
