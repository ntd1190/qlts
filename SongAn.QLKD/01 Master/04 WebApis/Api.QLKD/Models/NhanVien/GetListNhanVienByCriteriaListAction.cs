
using SongAn.QLKD.Biz.QLKD.NhanVien;
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class GetListNhanVienByCriteriaListAction
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string maForm { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }

        public string ngayFrom { get; set; }
        public string ngayTo { get; set; }
        public string nhanVien { get; set; }
        public string chucVu { get; set; }
        public string phongBan { get; set; }
        public string duAn { get; set; }
        public string dangLamViec { get; set; }
        public string maTrangThai { get; set; }
        public string Xoa { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        private DateTime? _ngayTuyenDungFrom;
        private DateTime? _ngayTuyenDungTo;
        private bool? _dangLamViec;
        private int _loginId;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _draw = Protector.Int(draw);
            _start = Protector.Int(start);
            _length = Protector.Int(length);

            sortName = string.IsNullOrEmpty(sortName) ? "NV_ID" : sortName;
            sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
            _length = _length < 1 ? 10 : _length;
            _loginId = Protector.Int(loginId);

            fields = string.IsNullOrEmpty(fields) ? "" : fields;
            search = string.IsNullOrEmpty(search) ? "" : search;
            _ngayTuyenDungFrom = Protector.DateTime(ngayFrom, "yyyyMMdd", true);
            _ngayTuyenDungTo = Protector.DateTime(ngayTo, "yyyyMMdd", true);
            nhanVien = string.IsNullOrEmpty(nhanVien) ? "" : nhanVien;
            phongBan = string.IsNullOrEmpty(phongBan) ? "" : phongBan;
            duAn = string.IsNullOrEmpty(duAn) ? "" : duAn;
            chucVu = string.IsNullOrEmpty(chucVu) ? "" : chucVu;
            _dangLamViec = string.IsNullOrEmpty(dangLamViec) ? false : Protector.Bool(dangLamViec, true, true);
            maForm = string.IsNullOrEmpty(maForm) ? "" : maForm;
            maTrangThai = string.IsNullOrEmpty(maTrangThai) ? "" : maForm;
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

                var orderClause = sortName + " " + sortDir;
                var total = 0;

                var biz = new GetListNhanVienByCriteriaListBiz(context);
                biz.FIELD = fields;
                biz.SEARCH_STRING = search;
                biz.NGAY_FROM = _ngayTuyenDungFrom;
                biz.NGAY_TO = _ngayTuyenDungTo;
                biz.CHUC_VU = chucVu;
                biz.PHONG_BAN = phongBan;
                biz.DU_AN = duAn;
                biz.NHAN_VIEN = nhanVien;
                biz.DANG_LAM_VIEC = _dangLamViec;
                biz.MA_TRANG_THAI = maTrangThai;
                biz.MA_FORM = maForm;
                biz.XOA = Xoa;
                biz.LOGIN_ID = _loginId;

                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDER_CLAUSE = orderClause;

                IEnumerable<dynamic> listNhanVien = await biz.Execute();


                if (listNhanVien.Count() > 0)
                {
                    var obj = listNhanVien.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNhanVien, _metaData);
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

    }
}
