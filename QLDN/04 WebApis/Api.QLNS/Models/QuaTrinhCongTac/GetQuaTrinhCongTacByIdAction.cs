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
    public class GetQuaTrinhCongTacByIdAction
    {
        #region public
        public string quaTrinhCongTacId { get; set; }
        public string draw { get; set; }
        #endregion

        #region private
        private int _quaTrinhCongTacId;
        private int _draw;
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
            _quaTrinhCongTacId = Protector.Int(quaTrinhCongTacId, 0);
            _draw = Protector.Int(draw, 0);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
            if (_quaTrinhCongTacId == 0)
            {
                throw new BaseException("Không tìm thấy quá trình công tác.");
            }
        }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetListQuaTrinhCongTacByCriteriaBiz(context);
                biz.QUA_TRINH_CONG_TAC_ID = _quaTrinhCongTacId;

                var list = (await biz.Execute()).ToList();

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
