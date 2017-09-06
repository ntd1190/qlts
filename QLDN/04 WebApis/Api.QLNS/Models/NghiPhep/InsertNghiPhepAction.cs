/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/
4. Description  : Action api insert Nghỉ phép
5. History      : 2017.04.19(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuocSu;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace SongAn.QLDN.Api.QLNS.Models.NghiPhep
{
    /// <summary>
    /// Action api insert Nghỉ phép
    /// </summary>
    public class InsertNghiPhepAction: SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep
    {
        #region public properties

        public  string strTuNgay { get; set; }

        public  string strDenNgay { get; set; }

        #endregion

        #region private variable

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public InsertNghiPhepAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            var tempa = Protector.DateTime(strTuNgay, "dd/MM/yyyy");
            var tempb = Protector.DateTime(strDenNgay, "dd/MM/yyyy");

            this.TuNgay = tempa;
            this.DenNgay = tempb;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {

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

                var repo = new NghiPhepRepository(context);

                var nghiphep = new Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep();
                nghiphep.TuNgay = this.TuNgay;
                nghiphep.DenNgay = this.DenNgay;
                nghiphep.SoNgay = this.SoNgay;
                nghiphep.LoaiNgay = this.LoaiNgay;
                nghiphep.TieuDe = this.TieuDe == null? "" : this.TieuDe;
                nghiphep.LyDo = this.LyDo;
                nghiphep.NguoiBanGiao = this.NguoiBanGiao;
                nghiphep.NhanVienId = this.NhanVienId;
                nghiphep.NguoiTao = this.NguoiTao == 0 ? 1 :  this.NguoiTao;
                nghiphep.NgayTao = DateTime.Now;
                nghiphep.MaTrangThai = this.MaTrangThai;
                nghiphep.MaLoaiNghiPhep = this.MaLoaiNghiPhep;
                nghiphep.XoaYN = "N";
                nghiphep.CtrVersion = 1;

                await repo.Insert(nghiphep);

                if (nghiphep.NghiPhepId == 0)
                {
                    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, "Không thể thêm Nghỉ phép.");
                }

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "NghiPhep", nghiphep.NghiPhepId, "Insert",NguoiTao);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, nghiphep, null);
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