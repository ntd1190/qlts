/*****************************************************************************
1. Create Date  : 2017.05.04
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuongCaNhan/
4. Description  : Action api Lấy danh sách Bảng Lương cá nhân theo điều kiện
5. History      : 2017.05.04(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.BangLuongCaNhan;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.BangLuongCaNhan
{
    /// <summary>
    /// Action api Lấy danh sách Bảng Lương cá nhân theo điều kiện
    /// </summary>
    public class GetListBangLuongCaNhanByCriteriaAction
    {
        #region public properties

        /// <summary>
        /// draw
        /// </summary>
        public string draw { get; set; }

        /// <summary>
        /// start
        /// </summary>
        public string start { get; set; }

        /// <summary>
        /// length
        /// </summary>
        public string length { get; set; }

        /// <summary>
        /// sortName
        /// </summary>
        public string sortName { get; set; }

        /// <summary>
        /// sortDir
        /// </summary>
        public string sortDir { get; set; }

        /// <summary>
        /// Bảng lương Id
        /// </summary>
        public string BANGLUONG_ID { get; set; }

        /// <summary>
        /// Nhân viên Id
        /// </summary>
        public string NHANVIEN_ID { get; set; }

        /// <summary>
        /// Mã trạng thái
        /// </summary>
        public string MA_TRANG_THAI { get; set; }

        /// <summary>
        /// Ngày bắt đầu.
        /// </summary>
        public string NGAY_BAT_DAU { get; set; }

        /// <summary>
        /// Ngày kết thúc.
        /// </summary>
        public string NGAY_KET_THUC { get; set; }

        /// <summary>
        /// Xóa YN
        /// </summary>
        public string XOA_YN { get; set; }

        #endregion

        #region private variable

        private int _draw;

        private int _start;

        private int _length;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetListBangLuongCaNhanByCriteriaAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _draw = Protector.Int(draw);
            _start = Protector.Int(start);
            _length = Protector.Int(length);

            sortName = string.IsNullOrEmpty(sortName) ? "MaNhanVien" : sortName;
            sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
            _length = _length < 1 ? 100 : _length;

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

                var orderClause = sortName + " " + sortDir;
                var total = 0;

                GetListBangLuongCaNhanByCriteriaBiz biz = new GetListBangLuongCaNhanByCriteriaBiz(context);

                biz.NHANVIEN_ID = NHANVIEN_ID;
                biz.BANGLUONG_ID = BANGLUONG_ID;
                biz.MA_TRANG_THAI = MA_TRANG_THAI;
                biz.NGAY_BAT_DAU = NGAY_BAT_DAU;
                biz.NGAY_KET_THUC = NGAY_KET_THUC;
                biz.XOA_YN = XOA_YN;
                biz.ORDER_CLAUSE = orderClause;
                biz.SKIP = _start;
                biz.TAKE = _length;

                IEnumerable<dynamic> list = await biz.Execute();
                if (list.Count() > 0)
                {
                    var obj = list.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult( HttpStatusCode.OK, list, _metaData);
            }
            catch(FormatException ex)
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