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
    public class InsertChiTietAction
    {
        #region public
        public string PhieuCongTacId { get; set; }
        public string Ngay { get; set; }
        public string NoiDung { get; set; }
        public string SoLuong { get; set; }
        public string DonGia { get; set; }
        public string GhiChu { get; set; }
        #endregion

        #region private
        private int _PhieuCongTacId;
        private DateTime? _Ngay;
        private short _SoLuong;
        private int _DonGia;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _PhieuCongTacId = Protector.Int(PhieuCongTacId, 0);
            _Ngay = Protector.DateTime(Ngay, "yyyyMMdd", true);
            NoiDung = Protector.String(NoiDung, "");
            _SoLuong = Protector.Short(SoLuong, 0);
            _DonGia = Protector.Int(DonGia, 0);
            GhiChu = Protector.String(GhiChu, "");
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_SoLuong > 1000)
            {
                throw new FormatException("Số lượng phải nhỏ hơn 1000");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();


                var biz = new InsertChiTietBiz(context);
                biz.NoiDung = NoiDung;
                biz.PhieuCongTacId = _PhieuCongTacId;
                biz.Ngay = _Ngay;
                biz.SoLuong = _SoLuong;
                biz.DonGia = _DonGia;
                biz.GhiChu = GhiChu;

                var result = await biz.Execute();

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
