/*****************************************************************************
1. Create Date : 2017.04.14
2. Creator     : Nguyen Thanh Binh
3. Description : Lộc danh sách nhân viên
4. History     : 2017.04.14(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Biz.QLNS.BaoHiemXaHoi;
using SongAn.QLDN.Biz.QLNS.ChucVu;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.BaoHiemXaHoi
{
    public class UpdateBaoHiemXaHoiAction : Entity.MSSQL_QLDN_QLNS.Entity.BaoHiemXaHoi
    {
        #region public
        public string strNgay { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _loginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            strNgay = Protector.String(strNgay, "");
            var _ngay = Protector.DateTime(strNgay, "yyyy-MM-dd", true);
            if (_ngay == null)
            {
                throw new BaseException("Ngày tham gia BHXH không đúng.");
            }

            Ngay = _ngay.Value;

            SoBHXH = Protector.String(SoBHXH, "");
            SoBHYT = Protector.String(SoBHYT, "");

            _loginId = Protector.Int(loginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //if (BaoHiemXaHoiId == 0)
            //{
            //    throw new BaseException("Không tìm thấy bảo hiểm xã hội.");
            //}
            if (NhanVienId == 0)
            {
                throw new BaseException("Không tìm thấy nhân viên.");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateBaoHiemXaHoiBiz(context);
                biz.NhanVienId = NhanVienId;
                biz.BaoHiemXaHoiId = BaoHiemXaHoiId;
                biz.Ngay = Ngay;
                biz.SoBHXH = SoBHXH;
                biz.SoBHYT = SoBHYT;
                biz.BHXH = BHXH;
                biz.BHYT = BHYT;
                biz.BHTN = BHTN;
                biz.CongDoan = CongDoan;
                biz.CtrVersion = CtrVersion;
                biz.XoaYN = "N";

                var obj = await biz.Execute();

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "BaoHiemXaHoi", NhanVienId, "Update", _loginId);

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, obj, _metaData);
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
