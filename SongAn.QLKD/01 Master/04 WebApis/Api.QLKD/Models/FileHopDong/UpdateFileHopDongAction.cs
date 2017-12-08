using SongAn.QLKD.Biz.QLKD.FileHopDong;
using SongAn.QLKD.Util.Common.CustomException;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.FileHopDong
{
    public class UpdateFileHopDongAction : Entity.QLKD.Entity.KDFileHopDong
    {
        #region public
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
                var biz = new UpdateFileHopDongBiz(context);

                biz.FileHopDong = new Entity.QLKD.Entity.KDFileHopDong();
                biz.FileHopDong.FileHopDongId = Protector.Int(FileHopDongId, 0);
                biz.FileHopDong.HopDongId = Protector.Int(HopDongId, 0);
                biz.FileHopDong.DaLam = Protector.String(DaLam, "");
                biz.FileHopDong.NguoiLam = Protector.String(NguoiLam, "");
                biz.FileHopDong.DaChuyen = Protector.String(DaChuyen, "");
                biz.FileHopDong.NguoiChuyen = Protector.String(NguoiChuyen, "");
                biz.FileHopDong.NgayChuyen = DateTime.ParseExact(NgayChuyen, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                biz.FileHopDong.NguoiNhan = Protector.String(NguoiNhan, "");
                biz.FileHopDong.NgayNhan = DateTime.ParseExact(NgayNhan, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                biz.FileHopDong.FileMem = Protector.String(FileMem, "");
                biz.FileHopDong.FileCung = Protector.String(FileCung, "");
                biz.FileHopDong.GhiChu = Protector.String(GhiChu, "");
                biz.FileHopDong.NguoiTao = Protector.Int(NguoiTao, 0);
                biz.FileHopDong.NgayTao = DateTime.Now;
                biz.FileHopDong.CtrVersion = Protector.Int(CtrVersion, 0);

                biz.NHANVIEN_ID = Protector.Int(NHANVIEN_ID);
                biz.USER_ID = Protector.Int(USER_ID);

                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

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
