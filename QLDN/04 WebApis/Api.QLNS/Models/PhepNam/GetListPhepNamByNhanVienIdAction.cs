using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using SongAn.QLDN.Biz.QLNS.PhepNam;
using System.Globalization;

namespace SongAn.QLDN.Api.QLNS.Models.PhepNam
{
    public class GetListPhepNamByNhanVienIdAction
    {
        #region public properties

        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        public string nbd { get; set; }     // ngày bắt đầu
        public string nkt { get; set; }     // ngày kết thúc

        #endregion

        #region private variable

        int _id;
        DateTime _nbt;
        DateTime _nkt;

        #endregion

        #region constructor

        /// <summary>
        /// Ham khoi tao
        /// </summary>
        public GetListPhepNamByNhanVienIdAction()
        {

        }
        #endregion

        #region init & validate

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void Init()
        {
            _id = Protector.Int(id);
            _nbt = DateTime.ParseExact(nbd, "yyyyMMdd", CultureInfo.InvariantCulture);
            _nkt = DateTime.ParseExact(nkt, "yyyyMMdd", CultureInfo.InvariantCulture);
        }

        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void Validate()
        {
            if (_id < 1) { throw new FormatException("Id Empty"); }

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
            var _result = new ActionResultDto();
            try
            {
                Init();
                Validate();

                //var repo = new KhoXuatNhapTonTheoKyRepository(context);
                //var obj = await repo.GetById(_id);

                //if (obj == null)
                //{
                //    return ActionHelper.returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy Id '{0}'", _id));
                //}

                //return ActionHelper.returnActionResult(HttpStatusCode.OK, obj, null);

                GetListPhepNamByNhanVienIdBiz biz = new GetListPhepNamByNhanVienIdBiz(context);
                biz.NHAN_VIEN_ID = _id;
                biz.NGAY_BAT_DAU = _nbt;
                biz.NGAY_KET_THUC = _nkt;
                var PhepChiTiet = await biz.Execute();

                if (PhepChiTiet == null)
                {
                    return returnActionError(HttpStatusCode.BadRequest, string.Format("Không tìm thấy Nhân viên '{0}'", _id));
                }

                _result.ReturnCode = HttpStatusCode.OK;
                _result.ReturnData = new
                {
                    data = PhepChiTiet
                };

                return _result;
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

        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }
        #endregion
    }
}
