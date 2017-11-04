/*****************************************************************************
1. Create Date  : 2017.07.31
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : 
5. History      : 2017.07.31 (NGUYỄN THANH BÌNH) - Tao moi
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
    public class GetThongTinByDienThoaiAction
    {

        #region PUBLIC
        public virtual string DienThoai { get; set; }
        public virtual string LoaiBaoHanh { get; set; }
        public string loginId { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        #endregion

        #region private
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
            DienThoai = Protector.String(DienThoai, "");

            _draw = Protector.Int(draw, 0);
            _start = Protector.Int(start, 0);
            _length = Protector.Int(length, 100);
            _LoginId = Protector.Int(loginId, 0);

            sortName = Protector.String(sortName, "MAXCNT");
            sortDir = Protector.String(sortDir, "asc");
            _orderClause = sortName + " " + sortDir;
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate() { }

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new GetThongTinByDienThoaiBiz(context);
                biz.DIENTHOAI = DienThoai;
                biz.LOGIN_ID = _LoginId;
                biz.LOAI_BAO_HANH = LoaiBaoHanh;
                biz.SKIP = _start;
                biz.TAKE = _length;

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = 0;
                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }

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
