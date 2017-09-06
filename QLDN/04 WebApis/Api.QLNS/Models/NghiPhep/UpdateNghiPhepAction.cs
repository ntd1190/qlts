/*****************************************************************************
1. Create Date  : 2017.04.19
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/
4. Description  : Action api Update Nghỉ phép theo id
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
    /// Action api Update Nghỉ phép theo id
    /// </summary>
    public class UpdateNghiPhepAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep
    {
        #region public properties

        public string strTuNgay { get; set; }

        public string strDenNgay { get; set; }

        #endregion

        #region private variable

        private int _nghiphepId;
        private int _CtrVersion;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateNghiPhepAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _nghiphepId = Protector.Int(NghiPhepId);
            _CtrVersion = Protector.Int(CtrVersion);

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
            var _id = Protector.Int(NghiPhepId);

            if (_id < 1)
            {
                throw new FormatException("NghiPhepId is empty");
            }

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
                nghiphep.NghiPhepId = _nghiphepId;
                nghiphep.TuNgay = this.TuNgay == null ? DateTime.Today : this.TuNgay;
                nghiphep.DenNgay = this.DenNgay == null ? DateTime.Today : this.DenNgay;
                nghiphep.SoNgay = this.SoNgay == 0 ? 1 : this.SoNgay;
                nghiphep.LoaiNgay = this.LoaiNgay;
                nghiphep.MaLoaiNghiPhep = this.MaLoaiNghiPhep;
                nghiphep.TieuDe = this.TieuDe == null ? "" : this.TieuDe;
                nghiphep.LyDo = this.LyDo;
                nghiphep.NguoiBanGiao = this.NguoiBanGiao;
                nghiphep.NhanVienId = this.NhanVienId;
                nghiphep.CtrVersion = _CtrVersion;
                nghiphep = await repo.UpdatePartial(nghiphep,
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.TuNgay),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.DenNgay),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.SoNgay),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.LoaiNgay),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.MaLoaiNghiPhep),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.TieuDe),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.LyDo),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.NguoiBanGiao),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.NhanVienId),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.NghiPhep.CtrVersion)
                  );

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "NghiPhep", _nghiphepId, "Update", NhanVienId);

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