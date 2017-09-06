/*****************************************************************************
1. Create Date  : 2017.08.10
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/NHANVIEN/EDIT
4. Description  : THÊM CÔNG VIỆC TRƯỚC ĐÂY
5. History      : 2017.08.10 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.CongViecTruocDay;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.CongViecTruocDay
{
    public class UpdateCongViecTruocDayAction: Entity.MSSQL_QLDN_QLNS.Entity.CongViecTruocDay
    {
        #region PUBLIC
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
            _loginId = Protector.Int(loginId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateCongViecTruocDayBiz(context);
                biz.CongViecTruocDayId = CongViecTruocDayId;
                biz.NhanVienId = NhanVienId;
                biz.CongTy = CongTy;
                biz.MoTa = MoTa;
                biz.TuNgay = TuNgay;
                biz.DenNgay = DenNgay;
                biz.CtrVersion = CtrVersion;
                biz.LOGIN_ID = _loginId;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

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
    }
}
