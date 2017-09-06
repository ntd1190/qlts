
/*****************************************************************************
1. Create Date  : 2017.05.05
2. Creator      : Van Phu Hoi
3. Function     : QLDNMAIN/LoaiNghiPhep/List
4. Description  : Goi biz de lay danh sach Loai Nghi Phep voi dieu kien
5. History      : 
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.LoaiNghiPhep;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN;
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
    /// Action api Lấy danh sách Nghỉ phép theo điều kiện
    /// </summary>
    public class GetListLoaiNghiPhepByCriteriaAction
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
        /// Mã Form
        /// </summary>
        public string MA_FORM { get; set; }

        /// <summary>
        /// Danh sách các field cần lấy
        /// </summary>
        public string FIELD { get; set; }

        /// <summary>
        /// Chuỗi QUICK SEARCH
        /// </summary>
        public string SEARCH_STRING { get; set; }
        

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
        public GetListLoaiNghiPhepByCriteriaAction()
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

            sortName = string.IsNullOrEmpty(sortName) ? "MaLoaiNghiPhep" : sortName;
            sortDir = string.IsNullOrEmpty(sortDir) ? "desc" : sortDir;
            _length = _length < 1 ? 10 : _length;
            //FIELD = string.IsNullOrEmpty(FIELD) ? "NghiPhepId,NV.NhanVienId,TuNgay,DenNgay" : FIELD;

            MA_FORM = string.IsNullOrEmpty(MA_FORM) ? "FL0002" : MA_FORM;
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

                var _quicksearch = SEARCH_STRING;
                var orderClause = sortName + " " + sortDir;
                var total = 0;

                GetListLoaiNghiPhepByCriteriaBiz biz = new GetListLoaiNghiPhepByCriteriaBiz(context);

                biz.MA_FORM = MA_FORM;
                biz.FIELD = FIELD;
           
                biz.SEARCH_STRING = _quicksearch;
                biz.ORDER_CLAUSE = orderClause;
                biz.SKIP = _start;
                biz.TAKE = _length;

                IEnumerable<dynamic> listNghiPhep = await biz.Execute();
                if (listNghiPhep.Count() > 0)
                {
                    var obj = listNghiPhep.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNghiPhep, _metaData);
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