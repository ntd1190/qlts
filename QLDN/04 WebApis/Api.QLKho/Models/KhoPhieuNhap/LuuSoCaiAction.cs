/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUNHAP/LIST
4. Description  : THÊM THÔNG TIN PHIẾU NHẬP
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuNhap;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuNhap
{
    public class LuuSoCaiAction
    {

        #region PUBLIC
        public string phieuNhapId { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private int _phieuNhapId;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _phieuNhapId = Protector.Int(phieuNhapId, 0);
            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_phieuNhapId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin phiếu nhập kho");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                // TODO load chi tiêt
                var bizGetListChiTiet = new GetListChiTietByPhieuNhapIdBiz(context);
                bizGetListChiTiet.PHIEU_NHAP_ID = _phieuNhapId;
                bizGetListChiTiet.LOGIN_ID = _LoginId;

                var listChiTiet = await bizGetListChiTiet.Execute();

                if (listChiTiet.Count() < 1)
                {
                    throw new BaseException("Không tìm thấy thông tin chi tết");
                }

                var affected = 0;
                var biz = new LuuSoCaiBiz(context);
                foreach (var chitiet in listChiTiet)
                {
                    biz.PHIEU_NHAP_CHI_TIET_ID = chitiet.PhieuNhapChiTietId;
                    var result = await biz.Execute();
                    if (result.Count() > 0 && string.IsNullOrEmpty(biz.MESSAGE))
                    {
                        affected = affected + 1;
                    }
                    else
                    {
                        throw new BaseException(biz.MESSAGE.Split('|')[2]);
                    }
                }

                // TODO đổi trang thai phiếu nhập
                var repoPhieuNhap = new KhoPhieuNhapRepository(context);
                var phieunhap = new Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhap();
                phieunhap.PhieuNhapId = _phieuNhapId;
                phieunhap.MaTrangThai = "KPN_LSC";
                var resultUpdatePhieuNhap = await repoPhieuNhap.UpdatePartial(phieunhap
                    , nameof(phieunhap.MaTrangThai));

                var ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoPhieuNhap", _phieuNhapId, "Update", _LoginId);

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, resultUpdatePhieuNhap, _metaData);
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

        #region HELPERS

        #endregion
    }
}
