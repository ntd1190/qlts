using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using System.Globalization;

namespace SongAn.QLDN.Api.QLNS.Models.ImportExcel
{
    public class ImportExcelChamCongAction
    {

        #region public
        public string chamCong { get; set; }
        #endregion

        #region private
        private List<ChamCongActionModel> _listChamCong;
        #endregion

        public async Task<dynamic> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                var ChamCong = new Entity.MSSQL_QLDN_QLNS.Entity.ChamCong();
                ChamCongRepository repo = new ChamCongRepository(context);
                if (_listChamCong.Count > 0)
                {
                    foreach(var chamcongmodel  in _listChamCong)
                    {
                        ChamCong.MaNhanVien = Protector.String(chamcongmodel.MaNhanVien);
                        ChamCong.Thu = Protector.String(chamcongmodel.Thu);
                        //ChamCong.Giolam = DateTime.ParseExact(chamcongmodel.Ngay + " " + (chamcongmodel.Vao == "" ? "00:00" : chamcongmodel.Vao), "M/d/yy HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                        //ChamCong.GioVe = DateTime.ParseExact(chamcongmodel.Ngay + " " + (chamcongmodel.Ra == "" ? "00:00" : chamcongmodel.Ra), "M/d/yy HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                        ChamCong.Giolam = DateTime.ParseExact(chamcongmodel.Ngay + " " + (checkVaoRa(chamcongmodel.Vao, chamcongmodel.Vao2, chamcongmodel.Vao3)), "M/d/yy HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                        ChamCong.GioVe = DateTime.ParseExact(chamcongmodel.Ngay + " " + (checkVaoRa(chamcongmodel.Ra3, chamcongmodel.Ra2, chamcongmodel.Ra)), "M/d/yy HH:mm", CultureInfo.GetCultureInfo("fr-FR"));
                        await repo.Insert(ChamCong);
                    }
                }

                    return ActionHelper.returnActionResult(HttpStatusCode.OK, _listChamCong, null);
            }
            catch (FormatException ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return ActionHelper.returnActionError(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        private string checkVaoRa(string vaora1, string vaora2, string vaora3)
        {
            if (vaora1 == "" || vaora1 == null)
            {
                if (vaora2 == "" || vaora2 == null)
                {
                    if (vaora3 == "" || vaora3 == null)
                        return "00:00";
                    else
                        return vaora3;
                }
                else
                {
                    return vaora2;
                }
            }
            else
            {
                return vaora1;
            }
        }

        #region init & validate
        /// <summary>
        /// Ham chuan hoa gia tri cac bien
        /// </summary>
        private void validate()
        {
        }

        /// <summary>
        /// Ham khoi tao gia tri mac dinh cho cac bien
        /// </summary>
        private void init()
        {
                _listChamCong = JsonConvert.DeserializeObject<List<ChamCongActionModel>>(chamCong);

        }
        #endregion

        #region private model
        private class ChamCongActionModel
        {
            public string MaNhanVien { get; set; }
            public string Ngay { get; set; }
            public string Thu { get; set; }
            public string Vao { get; set; }
            public string Ra { get; set; }
            public string Vao2 { get; set; }
            public string Ra2 { get; set; }
            public string Vao3 { get; set; }
            public string Ra3 { get; set; }
        }
        #endregion


    }

}
