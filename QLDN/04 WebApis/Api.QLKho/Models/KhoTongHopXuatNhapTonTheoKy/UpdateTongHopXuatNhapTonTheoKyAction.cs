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

namespace SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTonTheoKy
{
    public class UpdateTongHopXuatNhapTonTheoKyAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy
    {
        #region public properties

        public string strNgayBatDau { get; set; }

        public string strNgayKetThuc { get; set; }

        public string strThangNam { get; set; }

        public Int16 _loaiBaoCao { get; set; }

        #endregion

        #region private variable

        private int _Id;
        private int _CtrVersion;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateTongHopXuatNhapTonTheoKyAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _Id = Protector.Int(KyId);
            //_CtrVersion = Protector.Int(CtrVersion);

            var tempa = Protector.DateTime(strNgayBatDau, "dd/MM/yyyy");
            var tempb = Protector.DateTime(strNgayKetThuc, "dd/MM/yyyy");

            var monthyear = Protector.DateTime(strThangNam, "dd/MM/yyyy");

            this.NgayBatDau = tempa;
            this.NgayKetThuc = tempb;
            this.ThangNam = monthyear;
            this.LoaiBaoCao = _loaiBaoCao;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            var _id = Protector.Int(KyId);

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

                var repo = new KhoXuatNhapTonTheoKyRepository(context);

                var entity = new Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy();
                entity.KyId = this.KyId;
                entity.KyTruoc = this.KyTruoc;
                entity.Ten = this.Ten;
                entity.ThangNam = this.ThangNam;
                entity.LoaiBaoCao = this.LoaiBaoCao;
                entity.NgayBatDau = this.NgayBatDau;
                entity.NgayKetThuc = this.NgayKetThuc;
                entity.KhoHangId = this.KhoHangId;
                entity.GhiChu = this.GhiChu;
                entity.NguoiTao = this.NguoiTao;
                entity.MaTrangThai = this.MaTrangThai;

                entity = await repo.UpdatePartial(entity,
                nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.KyTruoc),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.Ten),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.ThangNam),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.LoaiBaoCao),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.NgayBatDau),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.NgayKetThuc),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.KhoHangId),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.GhiChu),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.NguoiTao),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.KhoBaoCaoTheoKy.MaTrangThai)
                  );

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "KhoXuatNhapTonTheoKy", _Id, "Update", entity.NguoiTao);

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
