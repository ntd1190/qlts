﻿
using SongAn.QLDN.Biz.QLNS.KhoPhieuBaoHanhThongKe;
using SongAn.QLDN.Data.QLNS.KhoPhieuBaoHanhThongKe;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.KhoPhieuBaoHanhThongKe
    {
        public class GetListKhoPhieuBaoHanhThongKeByProjectionAction
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
            GetListPhieuBaoHanhThongKeByProjectionBiz biz = new GetListPhieuBaoHanhThongKeByProjectionBiz(context);
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

                        biz.ChiNhanh = search.Split('|')[4];
                    }
                    biz.LoginId = LoginId;
                    var orderClause = sortName + " " + sortDir;
                    var total = 0;
                    biz.FieldsField = fields;
                    biz.OrderClause = orderClause;
                    biz.Skip = _start;
                    biz.Take = _length;
                    IEnumerable<dynamic> listChamCong = await biz.Execute();


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