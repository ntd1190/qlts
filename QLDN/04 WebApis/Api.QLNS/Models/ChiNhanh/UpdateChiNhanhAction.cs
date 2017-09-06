/*****************************************************************************
1. Create Date  : 2017.07.17
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/CHINHANH/LIST
4. Description  : CẬP NHẬT CHI NHÁNH
5. History      : 2017.07.17 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.ChiNhanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.ChiNhanh
{
    public class UpdateChiNhanhAction : Entity.MSSQL_QLDN_QLNS.Entity.ChiNhanh
    {
        #region PUBLIC
        public string LoginId { get; set; }
        #endregion

        #region private
        private int _LoginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _LoginId = Protector.Int(LoginId, 0);
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

                var biz = new UpdateChiNhanhBiz(context);
                biz.ChiNhanhId = ChiNhanhId;
                biz.MaChiNhanh = MaChiNhanh;
                biz.TenChiNhanh = TenChiNhanh;
                biz.DiaChi = DiaChi;
                biz.MoTa = MoTa;
                biz.ChiNhanhCha = ChiNhanhCha;
                biz.CtrVersion = CtrVersion;
                biz.LOGIN_ID = _LoginId;

                var result = await biz.Execute();


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
