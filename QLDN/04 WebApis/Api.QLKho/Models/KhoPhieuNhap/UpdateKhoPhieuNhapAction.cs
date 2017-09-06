/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUNHAP/LIST
4. Description  : THÊM THÔNG TIN PHIẾU NHẬP, update bằng stored sp_KhoPhieuNhap_UpdateKhoPhieuNhap
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuNhap;
using SongAn.QLDN.Data.QLKho.KhoPhieuNhap.Dto;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuNhap
{
    public class UpdateKhoPhieuNhapAction
    {

        #region PUBLIC
        public string PhieuNhap { get; set; }
        public string listChiTiet { get; set; }
        public string LoginId { get; set; }
        #endregion

        #region private
        private UpdateKhoPhieuNhapDto _PhieuNhap;
        private List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhapChiTiet> _listChiTiet;
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            PhieuNhap = Protector.String(PhieuNhap, "{}");
            var __PhieuNhap = JsonConvert.DeserializeObject<dynamic>(PhieuNhap);
            __PhieuNhap.strNgayChungTu = Protector.String(__PhieuNhap.strNgayChungTu, "");
            __PhieuNhap.strNgayThanhToan = Protector.String(__PhieuNhap.strNgayThanhToan, "");

            __PhieuNhap.NgayThanhToan = Protector.DateTime(__PhieuNhap.strNgayThanhToan, "yyyy-MM-dd", true);
            __PhieuNhap.NgayNhap = Protector.DateTime(__PhieuNhap.strNgayNhap, "yyyy-MM-dd", true);
            __PhieuNhap.NgayChungTu = Protector.DateTime(__PhieuNhap.strNgayChungTu, "yyyy-MM-dd", true);
            __PhieuNhap.NgayChungTu = __PhieuNhap.NgayChungTu ?? DateTime.Now;
            
            PhieuNhap = JsonConvert.SerializeObject(__PhieuNhap);
            _PhieuNhap = JsonConvert.DeserializeObject<UpdateKhoPhieuNhapDto>(PhieuNhap);

            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.MSSQL_QLDN_QLNS.Entity.KhoPhieuNhapChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(LoginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new BaseException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateKhoPhieuNhapBiz(context);
                biz.PhieuNhap = _PhieuNhap;
                biz.ListChiTiet = _listChiTiet;
                var result = await biz.Execute();

                var ls = new InsertKhoLuocSuAction();
                ls.InsertKhoLuocSu(context, "KhoPhieuNhap", _PhieuNhap.PhieuNhapId, "Update", _LoginId);

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
