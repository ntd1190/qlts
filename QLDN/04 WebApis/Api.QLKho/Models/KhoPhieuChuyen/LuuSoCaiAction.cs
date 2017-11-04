/*****************************************************************************
1. Create Date  : 2017.06.07
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUNHAP/LIST
4. Description  : THÊM THÔNG TIN PHIẾU NHẬP
5. History      : 2017.06.07 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLDN.Api.QLNS.Models.KhoLuocSu;
using SongAn.QLDN.Biz.QLKho.KhoPhieuChuyen;
using SongAn.QLDN.Data.QLKho.KhoPhieuChuyen;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuChuyen
{
    public class LuuSoCaiAction
    {

        #region PUBLIC
        public string listChiTiet { get; set; }
        public string LoginId { get; set; }
        public string KhoXuatId { get; set; }
        public string KhoNhapId { get; set; }
        public string NgayXuat { get; set; }
        public string KhoaMo { get; set; }
        #endregion

        #region private
        private List<KhoPhieuChuyenChiTiet> _listChiTiet;
        private int _LoginId;
        private DateTime? _NgayXuat;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {


            listChiTiet = Protector.String(listChiTiet, "{}");
            _listChiTiet = JsonConvert.DeserializeObject<List<KhoPhieuChuyenChiTiet>>(listChiTiet);
            _LoginId = Protector.Int(LoginId, 0);
            _NgayXuat= Protector.DateTime(NgayXuat, "dd/MM/yyyy", true);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if(_NgayXuat == null)
            {
                throw new BaseException("Ngày xuất không hợp lệ");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var HangHoaerror = "";
                var result = "";
                dynamic _metaData = new System.Dynamic.ExpandoObject();

               
               
                if(HangHoaerror=="")
                {
                    var dacsc = new GetListLuuSoCaiDac(context);
                    dacsc.PHIEUID = _listChiTiet.FirstOrDefault().PhieuChuyenId;
                    dacsc.PHIEUCHITIETID = _listChiTiet.FirstOrDefault().PhieuChuyenChiTietId;
                    dacsc.KHOHANGNHAPID = Protector.Int(KhoNhapId);
                    dacsc.KHOHANGXUATID = Protector.Int(KhoXuatId);
                    dacsc.HANGHOAID = _listChiTiet.FirstOrDefault().HangHoaId;
                    dacsc.SOLUONG = _listChiTiet.FirstOrDefault().SoLuong;
                    dacsc.DONGIA = _listChiTiet.FirstOrDefault().DonGia;
                    dacsc.LOGIN_ID = _LoginId;
                    dacsc.KHOA_MO = KhoaMo;
                    await dacsc.Execute();
            
                    if (string.IsNullOrEmpty(dacsc.MESSAGE) == false)
                    {
                        throw new BaseException(dacsc.MESSAGE.Split('|')[2]);
                    }

                    result = "Khóa phiếu thành công! ";
                }
                else
                {
                    result = "Không tồn tại  hoặc số lượng kho xuất không đủ những hàng hóa sau :\n" + HangHoaerror + " \nVui lòng kiểm tra lại! ";
                }

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
        public  class KhoPhieuChuyenChiTiet
        {
            public virtual int PhieuChuyenChiTietId { get; set; }
            public virtual int PhieuChuyenId { get; set; }
            public virtual int HangHoaId { get; set; }
            public virtual string TenHangHoa { get; set; }
            public virtual string LoHang { get; set; }
            public virtual decimal SoLuong { get; set; }
            public virtual decimal DonGia { get; set; }
        }
        #endregion
    }
}
