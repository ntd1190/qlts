/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/TangCa/
4. Description  : Action api Update Tăng Ca theo id
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.TangCa
{
    /// <summary>
    /// Action api Update Tăng Ca theo id
    /// </summary>
    public class UpdateTangCaAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.TangCa
    {
        #region public properties

        /// <summary>
        /// Ngày tăng ca
        /// </summary>
        public string strNgayTangCa { get; set; }

        /// <summary>
        /// Giờ bắt đầu
        /// </summary>
        public string strGioBatDau { get; set; }

        /// <summary>
        /// Giờ kết thúc
        /// </summary>
        public string strGioKetThuc { get; set; }

        #endregion

        #region private variable

        private int _Id;
        private int _CtrVersion;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateTangCaAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _Id = Protector.Int(TangCaId);
            _CtrVersion = Protector.Int(CtrVersion);

            var tempa = Protector.DateTime(strNgayTangCa, "dd/MM/yyyy");

            var time1 = Protector.DateTime(strGioBatDau, "dd/MM/yyyy HH:mm");

            var time2 = Protector.DateTime(strGioKetThuc, "dd/MM/yyyy HH:mm");

            this.NgayTangCa = tempa;
            this.GioBatDau = time1;
            this.GioKetThuc = time2;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            var _id = Protector.Int(TangCaId);

            if (_id < 1)
            {
                throw new FormatException("Id is empty");
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

                var repo = new TangCaRepository(context);

                var entity = new Entity.MSSQL_QLDN_QLNS.Entity.TangCa();
                entity.TangCaId = this.TangCaId;
                entity.NgayTangCa = this.NgayTangCa;
                entity.GioBatDau = this.GioBatDau;
                entity.GioKetThuc = this.GioKetThuc;
                entity.SoGio = this.SoGio == 0 ? 1 : this.SoGio;
                entity.Loai = this.Loai;
                entity.TieuDe = this.TieuDe == null ? "" : this.TieuDe;
                entity.LyDo = this.LyDo;
                entity.NhanVienId = this.NhanVienId;
                entity.MaTrangThai = this.MaTrangThai;
                entity.CtrVersion = _CtrVersion;
                entity = await repo.UpdatePartial(entity,
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.NgayTangCa),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.GioBatDau),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.GioKetThuc),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.SoGio),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.Loai),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.TieuDe),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.LyDo),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.NhanVienId),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.MaTrangThai),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.TangCa.CtrVersion)
                  );

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "TangCa", _Id, "Update",NguoiTao);

                return ActionHelper.returnActionResult(HttpStatusCode.OK, entity, null);
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