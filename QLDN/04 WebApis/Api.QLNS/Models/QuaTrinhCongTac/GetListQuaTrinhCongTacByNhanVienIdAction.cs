/*****************************************************************************
1. Create Date : 2017.05.17
2. Creator     : Nguyen Thanh Binh
3. Description : action lấy danh sách quá trình công tác của nhân viên
4. History     : 2017.05.17(Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
using SongAn.QLDN.Biz.QLNS.PhieuCongTac;
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

namespace SongAn.QLDN.Api.QLNS.Models.PhieuCongTac
{
    public class GetListQuaTrinhCongTacByNhanVienIdAction
    {
        #region public
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }

        public string nhanVienId { get; set; }
        #endregion

        #region private
        private int _draw;
        private int _start;
        private int _length;
        private int _nhanVienId;
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

            _nhanVienId = Protector.Int(nhanVienId, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_nhanVienId == 0)
            {
                throw new BaseException("Không tìm thấy nhân viên id='" + _nhanVienId + "'.");
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
                var total = 0;

                var biz = new GetListQuaTrinhCongTacByCriteriaBiz(context);
                biz.NHAN_VIEN_ID = _nhanVienId;
                biz.SKIP = _start;
                biz.TAKE = _length;
                biz.ORDER_CLAUSE = orderClause;

                var list = (await biz.Execute()).ToList();

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
