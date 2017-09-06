/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : Lộc danh sách nhân viên
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.LuongPhuCap;
using SongAn.QLDN.Data.QLNS.LuongPhuCap.Dto;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.LuongPhuCap
{
    public class UpdateLuongPhuCapAction
    {
        #region public
        public string LuongPhuCapId { get; set; }
        public string NhanVienId { get; set; }
        public string LuongCoBan { get; set; }
        public string LuongChinhThuc { get; set; }
        public string HuongLuong { get; set; }
        public string ComTrua { get; set; }
        public string DienThoai { get; set; }
        public string TrachNhiem { get; set; }
        public string DongPhuc { get; set; }
        public string Khac { get; set; }
        public string CtrVersion { get; set; }
        #endregion

        #region private
        private int _LuongPhuCapId;
        private int _NhanVienId;
        private int _LuongCoBan;
        private int _LuongChinhThuc;
        private decimal _HuongLuong;
        private int _ComTrua;
        private int _DienThoai;
        private int _TrachNhiem;
        private int _DongPhuc;
        private int _Khac;
        private int _CtrVersion;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LuongPhuCapId = Protector.Int(LuongPhuCapId, 0);
            _NhanVienId = Protector.Int(NhanVienId, 0);
            _LuongCoBan = Protector.Int(LuongCoBan, 0);
            _LuongChinhThuc = Protector.Int(LuongChinhThuc, 0);
            _HuongLuong = Protector.Decimal(HuongLuong, 0);
            _ComTrua = Protector.Int(ComTrua);
            _DienThoai = Protector.Int(DienThoai, 0);
            _TrachNhiem = Protector.Int(TrachNhiem, 0);
            _DongPhuc = Protector.Int(DongPhuc, 0);
            _Khac = Protector.Int(Khac, 0);
            _CtrVersion = Protector.Int(CtrVersion, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new FormatException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateLuongPhuCapBiz(context);
                biz.LuongPhuCapId = _LuongPhuCapId;
                biz.NhanVienId = _NhanVienId;
                biz.LuongCoBan = _LuongCoBan;
                biz.LuongChinhThuc = _LuongChinhThuc;
                biz.HuongLuong = _HuongLuong;
                biz.ComTrua = _ComTrua;
                biz.DienThoai = _DienThoai;
                biz.TrachNhiem = _TrachNhiem;
                biz.DongPhuc = _DongPhuc;
                biz.Khac = _Khac;
                biz.CtrVersion = _CtrVersion;

                var luongPhuCap = await biz.Execute();

                var _metaData = new System.Dynamic.ExpandoObject();

                if (luongPhuCap.LuongPhuCapId == 0)
                {
                    throw new BaseException("Không thể lưu thông tin lương phụ cấp.");
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, luongPhuCap, _metaData);
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
