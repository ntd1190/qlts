/*****************************************************************************
1. Create Date  : 2017.07.27
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : QLDNKHO/KHOPHIEUBAOHANH/LIST
4. Description  : DANH SÁCH PHIẾU BẢO HÀNH
5. History      : 2017.07.27 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLKho.KhoPhieuBaoHanh;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuBaoHanh
{
    public class GetListKhoPhieuBaoHanhByCriteriaAction
    {

        #region PUBLIC
        public string field { get; set; }
        public string strStartDate { get; set; }
        public string strEndDate { get; set; }
        public string Series { get; set; }
        public string DienThoai { get; set; }
        public string thongTinKhachHang { get; set; }
        public string sanPhamCty { get; set; }

        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }

        public string maForm { get; set; }
        public string loginId { get; set; }
        #endregion

        #region private
        private DateTime? startDate;
        private DateTime? endDate;
        private int _draw;
        private int _start;
        private int _length;
        private int _LoginId;
        private string _orderClause;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            field = Protector.String(field, "");
            Series = Protector.String(Series, "");
            DienThoai = Protector.String(DienThoai, "");
            thongTinKhachHang = Protector.String(thongTinKhachHang, "");
            sanPhamCty = Protector.String(sanPhamCty, "");

            strStartDate = Protector.String(strStartDate, "");
            startDate = Protector.DateTime(strStartDate, "yyyy-MM-dd", true);

            strEndDate = Protector.String(strEndDate, "");
            endDate = Protector.DateTime(strEndDate, "yyyy-MM-dd", true);

            _draw = Protector.Int(draw, 0);
            _start = Protector.Int(start, 0);
            _length = Protector.Int(length, 0);
            _LoginId = Protector.Int(loginId, 0);

            sortName = Protector.String(sortName, "KPBH_ID");
            sortDir = Protector.String(sortDir, "asc");
            _orderClause = sortName + " " + sortDir;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            //throw new BaseException("hello");
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListKhoPhieuBaoHanhByCriteriaBiz(context);
                biz.FIELD = field;
                biz.START_DATE = startDate;
                biz.END_DATE = endDate;
                biz.SERIES = Series;
                biz.DIENTHOAI = DienThoai;
                biz.THONG_TIN_KHACH_HANG = thongTinKhachHang;
                biz.SAN_PHAM_CTY = sanPhamCty;
                biz.ORDER_CLAUSE = _orderClause;
                biz.SKIP = _start;
                biz.TAKE = _length;

                biz.MA_FORM = maForm;
                biz.LOGIN_ID = _LoginId;

                var result = await biz.Execute();

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }
                _metaData.draw = _draw;


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

        #region HELPERS

        #endregion
    }
}
