/*****************************************************************************
1. Create Date  : 2017.04.27
2. Creator      : Nguyen Ngoc Tan
3. Function     : Phan quyen
4. Description  : Action api lấy quyền tác vụ bằng mã chức năng và mã vai trò
5. History      : 2017.04.27(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Data.Main.PhanQuyen;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLKD.Api.Main.Models.PhanQuyen
{
    /// <summary>
    /// Action api Lấy Nghỉ phép theo id
    /// </summary>
    public class GetQuyenTacVuByMaChucNangAndMaVaiTroAction
    {
        #region public properties

        /// <summary>
        /// Mã Chức Năng
        /// </summary>
        public string MACHUCNANG { get; set; }

        /// <summary>
        /// Mã Vai trò
        /// </summary>
        public string MAVAITRO { get; set; }

        /// <summary>
        /// User Id
        /// </summary>
        public string USERID { get; set; }

        #endregion

        #region private variable

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetQuyenTacVuByMaChucNangAndMaVaiTroAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {

        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(MACHUCNANG) ) {throw new FormatException("MACHUCNANG Empty");}

            if (string.IsNullOrWhiteSpace(MAVAITRO)) { throw new FormatException("MAVAITRO Empty"); }
        }

        #endregion

        #region execute

        /// <summary>
        /// Ham xu ly chinh, chi nhan 1 bien moi truong
        /// </summary>
        /// <param name="context">Bien moi truong</param>
        /// <returns></returns>
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                Init();
                Validate();

                var dac = new GetQuyenTacVuByMaChucNangAndMaVaiTroDac(context);

                dac.MACHUCNANG = MACHUCNANG;
                dac.MAVAITRO = MAVAITRO;

                var config = await dac.Execute();

                if (config == null)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy quyentacvu '{0}-{1}'", MACHUCNANG,MAVAITRO));
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, config, null);
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
        #endregion
    }
}