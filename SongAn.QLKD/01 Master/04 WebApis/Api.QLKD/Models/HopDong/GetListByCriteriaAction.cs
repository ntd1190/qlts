using SongAn.QLKD.Biz.QLKD.HopDong;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.HopDong
{
    public class GetListByCriteriaAction
    {
        #region public
        public virtual string SEARCH { get; set; }
        public virtual string HOPDONGID { get; set; }
        public virtual string LOAIHOPDONGID { get; set; }
        public virtual string NHANVIENID { get; set; }
        public virtual string KHACHHANGID { get; set; }
        public virtual string DULIEUID { get; set; }
        public virtual string TRANGTHAI { get; set; }
        public virtual string STARTDATEHOPDONG { get; set; }
        public virtual string ENDDATEHOPDONG { get; set; }
        public virtual string STARTDATEHOADON { get; set; }
        public virtual string ENDDATEHOADON { get; set; }

        public virtual string FIELD { get; set; }
        public virtual string DRAW { get; set; }
        public virtual string SORTNAME { get; set; }
        public virtual string SORTDIR { get; set; }
        public virtual string START { get; set; }
        public virtual string LENGTH { get; set; }


        public virtual string USER_ID { get; set; }
        public virtual string NHANVIEN_ID { get; set; }
        #endregion

        #region private
        #endregion

        #region init & validate
        private void init() { }
        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                var biz = new GetListByCriteriaBiz(context);

                biz.SEARCH = Protector.String(SEARCH, string.Empty);
                biz.HOPDONGID = Protector.String(HOPDONGID, string.Empty);
                biz.LOAIHOPDONGID = Protector.String(LOAIHOPDONGID, string.Empty);
                biz.NHANVIENID = Protector.String(NHANVIENID, string.Empty);
                biz.KHACHHANGID = Protector.String(KHACHHANGID, string.Empty);
                biz.DULIEUID = Protector.String(DULIEUID, string.Empty);
                biz.TRANGTHAI = Protector.String(TRANGTHAI, string.Empty);
                biz.STARTDATEHOPDONG = Protector.String(STARTDATEHOPDONG, string.Empty);
                biz.ENDDATEHOPDONG = Protector.String(ENDDATEHOPDONG, string.Empty);
                biz.STARTDATEHOADON = Protector.String(STARTDATEHOADON, string.Empty);
                biz.ENDDATEHOADON = Protector.String(ENDDATEHOADON, string.Empty);

                biz.FIELD = Protector.String(FIELD, string.Empty);
                biz.ORDERCLAUSE = Protector.String(SORTNAME, "MAXCNT") + " " + Protector.String(SORTDIR, "asc");
                biz.SKIP = Protector.Int(START, 0);
                biz.TAKE = Protector.Int(LENGTH, 0);

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.USER_ID = Protector.Int(USER_ID);

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = Protector.Int(DRAW, 0);

                if (result.Count() > 0)
                {
                    _metaData.total = result.FirstOrDefault().MAXCNT;
                }

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
            }
            catch (BaseException ex)
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
