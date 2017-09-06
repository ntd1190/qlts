/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/LoaiNghiPhep/
4. Description  : Action api Lấy Loai Nghỉ phép theo MaLoaiNghiPhep
5. History      : 2017.04.19(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLDN.Api.QLNS.Models.LoaiNghiPhep
{
    /// <summary>
    /// Action api Lấy Loai Nghỉ phép theo MaLoaiNghiPhep
    /// </summary>
    public class GetLoaiNghiPhepByMaLoaiNghiPhepAction
    {
        #region public properties

        /// <summary>
        /// id
        /// </summary>
        public string MaLoaiNghiPhep { get; set; }

        #endregion

        #region private variable

        string _maloainghiphep;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetLoaiNghiPhepByMaLoaiNghiPhepAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _maloainghiphep = Protector.String(MaLoaiNghiPhep);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            if (string.IsNullOrEmpty(_maloainghiphep)) {throw new FormatException("MaLoaiNghiPhep Empty");}

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

                var repo = new LoaiNghiPhepRepository(context);
                var loainghiphep = await repo.GetByMaLoaiNghiPhep(_maloainghiphep);

                if (loainghiphep == null)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy MaLoaiNghiPhep '{0}'", _maloainghiphep));
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, loainghiphep, null);
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