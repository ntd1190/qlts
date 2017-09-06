using SongAn.QLDN.Biz.QLNS.ChamCong;
using SongAn.QLDN.Data.QLNS.ChamCong;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.ChamCong
{
    public class GetListChamCongByProjectionAction
    {
        public string LoginId { get; set; }
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListChamCongByCriteraBiz biz = new GetListChamCongByCriteraBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "ChamCongId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "*" : fields;
                if (search != null && search != "")
                {
                    try
                    {
                        if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____") biz.TuNgay = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                    }
                    catch
                    {
                        biz.TuNgay = "";
                    }
                    try
                    {
                        if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____") biz.DenNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                    }
                    catch
                    {
                        biz.DenNgay = "";
                    }
                    biz.NhanVien = search.Split('|')[2];

                    biz.PhongBan = search.Split('|')[3];
                }
                biz.LoginId = LoginId;
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.FieldsField = fields;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listChamCong = await biz.Execute();
                if (listChamCong.Count() > 0)
                {

                    foreach (var chamcong in listChamCong)
                    {
                        if (chamcong.Thu != "CN")
                        {
                            if (chamcong.GioLam == "00:00" && chamcong.GioVe == "00:00")
                            {
                                CheckNghiByProjectionDac dac = new CheckNghiByProjectionDac(context);
                                dac.Ngay = chamcong.Ngay;
                                dac.NhanVien = chamcong.NhanVienId.ToString();
                                IEnumerable<dynamic> listNghiPhep = await dac.Execute();
                                if (listNghiPhep.FirstOrDefault().NghiPhep == 0) chamcong.NghiKhongPhep = "1";
                                if (listNghiPhep.FirstOrDefault().NghiPhep == 1)
                                {
                                    chamcong.NghiPhep = "1";
                                }
                                if (listNghiPhep.FirstOrDefault().NghiPhep == 2)
                                {
                                    chamcong.CongTac = "1";
                                }
                                
                            }
                            else
                            {
                                chamcong.Tong = "1";
                                if (chamcong.GioLam != "00:00")
                                {
                                    DateTime starhour = DateTime.ParseExact(chamcong.GioLam, "HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                                    if (starhour.TimeOfDay > DateTime.ParseExact("08:10", "HH:mm", CultureInfo.GetCultureInfo("fr-FR")).TimeOfDay)
                                    {
                                        chamcong.DiTre = "1";
                                    }

                                }
                                else chamcong.DiTre = "1";
                                if (chamcong.GioVe != "00:00" && chamcong.Thu != "Bảy")
                                {
                                    DateTime endhour = DateTime.ParseExact(chamcong.GioVe, "HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                                    if (endhour.TimeOfDay < DateTime.ParseExact("16:50", "HH:mm", CultureInfo.GetCultureInfo("fr-FR")).TimeOfDay)
                                    {
                                        chamcong.VeSom = "1";
                                    }

                                }
                                else if (chamcong.GioVe != "00:00" && chamcong.Thu == "Bảy")
                                {
                                    DateTime endhour = DateTime.ParseExact(chamcong.GioVe, "HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                                    if (endhour.TimeOfDay < DateTime.ParseExact("11:50", "HH:mm", CultureInfo.GetCultureInfo("fr-FR")).TimeOfDay)
                                    {
                                        chamcong.VeSom = "1";
                                    }
                                }
                                else chamcong.VeSom = "1";
                            }
                        }
                    }

                    
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listChamCong, _metaData);
            }
            catch (Exception ex)
            {
                result.ReturnCode = HttpStatusCode.InternalServerError;
                result.ReturnData = new
                {
                    error = new
                    {
                        code = HttpStatusCode.InternalServerError,
                        type = HttpStatusCode.InternalServerError.ToString(),
                        message = ex.InnerException != null ? ex.InnerException.Message : ex.Message
                    }
                };
                return result;
            }

        }
    }
}
