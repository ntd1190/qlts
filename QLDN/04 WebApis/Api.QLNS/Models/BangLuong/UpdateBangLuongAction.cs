/*****************************************************************************
1. Create Date  : 2017.05.08
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuong/
4. Description  : Action api Update Bảng Lương theo id
5. History      : 2017.05.08(Tran Quoc Hung) - Tao moi
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

namespace SongAn.QLDN.Api.QLNS.Models.BangLuong
{
    /// <summary>
    /// Action api Update Bảng Lương theo id
    /// </summary>
    public class UpdateBangLuongAction : SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity.BangLuong
    {
        #region public properties

        /// <summary>
        /// Ngày bắt đầu
        /// </summary>
        public string strNgayBatDau { get; set; }

        /// <summary>
        /// Ngày kết thúc
        /// </summary>
        public string strNgayKetThuc { get; set; }

        /// <summary>
        /// Ngày trả lương
        /// </summary>
        public string strNgayTraLuong { get; set; }

        /// <summary>
        /// Tháng/Năm
        /// </summary>
        public string strThangNam { get; set; }

        #endregion

        #region private variable

        private int _Id;
        private int _CtrVersion;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public UpdateBangLuongAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _Id = Protector.Int(BangLuongId);
            _CtrVersion = Protector.Int(CtrVersion);

            var tempa = Protector.DateTime(strNgayBatDau, "dd/MM/yyyy");
            var tempb = Protector.DateTime(strNgayKetThuc, "dd/MM/yyyy");

            var tempc = Protector.DateTime(strNgayTraLuong, "dd/MM/yyyy");

            var monthyear = Protector.DateTime(strThangNam, "dd/MM/yyyy");

            this.NgayBatDau = tempa;
            this.NgayKetThuc = tempb;
            this.NgayTraLuong = tempc;
            this.ThangNam = monthyear;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            var _id = Protector.Int(BangLuongId);

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

                var repo = new BangLuongRepository(context);

                var entity = new Entity.MSSQL_QLDN_QLNS.Entity.BangLuong();
                entity.BangLuongId = this.BangLuongId;

                entity.TenBangLuong = this.TenBangLuong;
                entity.ThangNam = this.ThangNam;
                entity.TanSuatTraLuong = this.TanSuatTraLuong;
                entity.NgayBatDau = this.NgayBatDau;
                entity.NgayKetThuc = this.NgayKetThuc;
                entity.NgayTraLuong = this.NgayTraLuong;
                entity.SoNgay = this.SoNgay;
                entity.SoNguoi = this.SoNguoi;

                entity.CtrVersion = _CtrVersion;
                entity = await repo.UpdatePartial(entity,
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.TenBangLuong),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.ThangNam),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.TanSuatTraLuong),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.NgayBatDau),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.NgayKetThuc),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.NgayTraLuong),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.SoNgay),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.SoNguoi),
                 nameof(Entity.MSSQL_QLDN_QLNS.Entity.BangLuong.CtrVersion)
                  );

                InsertLuocSuAction ls = new InsertLuocSuAction();
                ls.InsertLuocSu(context, "BangLuong", _Id, "Update", entity.NguoiTao);

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