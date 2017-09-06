/*****************************************************************************
1. Create Date : 2017.05.25
2. Creator     : Nguyen Thanh Binh
3. Description : action lấy danh sách hợp đồng của nhân viên
4. History     : 2017.05.25(Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
using SongAn.QLDN.Biz.QLNS.QuanLyHopDong;
using SongAn.QLDN.Biz.QLNS.QuaTrinhCongTac;
using SongAn.QLDN.Util.Common.CustomException;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.QuanLyHopDong
{
    public class GetListQuanLyHopDongByIdAction : Entity.MSSQL_QLDN_QLNS.Entity.QuanLyHopDong
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
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

            sortName = Protector.String(sortName, "TuNgay");
            sortDir = Protector.String(sortDir, "desc");
            _length = _length < 1 ? 100 : _length;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() {
            if (QuanLyHopDongId == 0)
            {
                throw new BaseException("Không tìm thấy thông tin hợp đồng.");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var orderClause = sortName + " " + sortDir;

                var biz = new GetListQuanLyHopDongByCriteriaBiz(context);
                biz.HOP_DONG_ID = QuanLyHopDongId;

                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDER_CLAUSE = orderClause;

                var list = (await biz.Execute());


                var total = 0;

                if (list.Count() > 0)
                {
                    var obj = list.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, list, _metaData);
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

    }
}
