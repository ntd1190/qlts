using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using System.Data;
using System.Reflection;
using System.Globalization;
using System.Collections;
using System.Configuration;
using SongAn.QLTS.Biz.QLTS.CrystalReport;
using SongAn.QLTS.Util.Common.Dto;
using CrystalDecisions.Web;
using SongAn.QLTS.Util.Common.Helper;
using CrystalDecisions.Shared;

namespace SongAn.QLDN.UI.QLDNKHO.CrystalReport
{
    public partial class ReportPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            CrystalDecisions.CrystalReports.Engine.ReportDocument reportdocument = new ReportDocument();
            reportdocument = ReportFactory.GetReport(reportdocument.GetType());

            ContextDto context = new ContextDto();
            context.dbQLTSConnection = ConfigurationManager.ConnectionStrings["dbQLTSConnection"].ConnectionString;
            if (!IsPostBack)
            {
                string reportname = Request.QueryString["Name"] + ".rpt";
                string search = Request.QueryString["Data"];
                string ngay = Request.QueryString["Ngay"];
                string exportexcel = Request.QueryString["export"];

                CrystalReportViewer1.HasCrystalLogo = false;
                CrystalReportViewer1.SeparatePages = false;

                DataSet ds = new DataSet();
                if (reportname == "rptKeHoachMuaSam.rpt")
                {
                    ReportKeHoachMuaSamBiz biz = new ReportKeHoachMuaSamBiz(context);
                    biz.MuaSamId = search;
                    ds = biz.ExecuteBiz();

                }
                else if (reportname == "rptDeNghiTrangCapById.rpt")
                {
                    ReportDeNghiTrangCapByIdBiz biz = new ReportDeNghiTrangCapByIdBiz(context);
                    biz.DeNghiId = search;
                    ds = biz.ExecuteDac();
                }
                else if (reportname == "rptGhiTangById.rpt")
                {
                    ReportGhiTangByIdBiz biz = new ReportGhiTangByIdBiz(context);
                    biz.GhiTangId = search;
                    ds = biz.ExecuteDac();
                }
                else if (reportname == "rptDieuChuyenById.rpt")
                {
                    ReportDieuChuyenByIdBiz biz = new ReportDieuChuyenByIdBiz(context);
                    biz.DieuChuyenId = search;
                    ds = biz.ExecuteDac();
                }
                else if (reportname == "rptBaoDuongById.rpt")
                {
                    ReportBaoDuongByIdBiz biz = new ReportBaoDuongByIdBiz(context);
                    biz.BaoDuongId = search;
                    ds = biz.ExecuteDac();
                }
                else if (reportname == "rptKiemKeById.rpt")
                {
                    ReportKiemKeByIdBiz biz = new ReportKiemKeByIdBiz(context);
                    biz.KiemKeId = search;
                    ds = biz.ExecuteDac();
                }
                else if (reportname == "rptSuDungById.rpt")
                {
                    ReportSuDungByIdBiz biz = new ReportSuDungByIdBiz(context);
                    biz.SuDungId = search;
                    ds = biz.ExecuteDac();
                }
                else if (reportname == "rptTongHopTaiSanCoDinh.rpt" || reportname == "rptTongHopTaiSanCoDinhExcel.rpt")
                {
                    ReportTongHopTaiSanCoDinhBiz biz = new ReportTongHopTaiSanCoDinhBiz(context);

                    if (search != null && search != "")
                    {
                        if (search.Split('|').Length > 1)
                        {
                            if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                                biz.TuNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            if (search.Split('|')[2] != "" && search.Split('|')[2] != "__/__/____")
                                biz.DenNgay = DateTime.ParseExact(search.Split('|')[2], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            biz.CoSoId = Protector.Int(search.Split('|')[3]);
                            biz.NhanVienId = Protector.Int(search.Split('|')[4]);
                            ds = biz.ExecuteDac();
                        }
                    }
                }
                else if (reportname == "rptTongHopGhiTang.rpt")
                {
                    ReportTongHopGhiTangBiz biz = new ReportTongHopGhiTangBiz(context);

                    if (search != null && search != "")
                    {
                        if (search.Split('|').Length > 1)
                        {
                            if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                                biz.TuNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            if (search.Split('|')[2] != "" && search.Split('|')[2] != "__/__/____")
                                biz.DenNgay = DateTime.ParseExact(search.Split('|')[2], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            biz.CoSoId = Protector.Int(search.Split('|')[3]);
                            biz.NhanVienId = Protector.Int(search.Split('|')[4]);
                            ds = biz.ExecuteDac();
                        }
                    }
                }
                else if (reportname == "rptTongHopGhiGiam.rpt")
                {
                    ReportTongHopGhiGiamBiz biz = new ReportTongHopGhiGiamBiz(context);

                    if (search != null && search != "")
                    {
                        if (search.Split('|').Length > 1)
                        {
                            if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                                biz.TuNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            if (search.Split('|')[2] != "" && search.Split('|')[2] != "__/__/____")
                                biz.DenNgay = DateTime.ParseExact(search.Split('|')[2], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            biz.CoSoId = Protector.Int(search.Split('|')[3]);
                            biz.NhanVienId = Protector.Int(search.Split('|')[4]);
                            ds = biz.ExecuteDac();
                        }
                    }
                }
                else if (reportname == "rptTongHopTangGiamTSCD.rpt")
                {
                    ReportTongHopTangGiamTSCDBiz biz = new ReportTongHopTangGiamTSCDBiz(context);

                    if (search != null && search != "")
                    {
                        if (search.Split('|').Length > 1)
                        {
                            if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                                biz.TuNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            if (search.Split('|')[2] != "" && search.Split('|')[2] != "__/__/____")
                                biz.DenNgay = DateTime.ParseExact(search.Split('|')[2], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            biz.CoSoId = Protector.Int(search.Split('|')[3]);
                            biz.NhanVienId = Protector.Int(search.Split('|')[4]);
                            ds = biz.ExecuteDac();
                        }
                    }
                }
                if (reportname == "rptGhiGiam.rpt")
                {
                    ReportGhiGiamBiz biz = new ReportGhiGiamBiz(context);
                    biz.GhiGiamId = search;
                    ds = biz.ExecuteBiz();

                }

                /* REPORT THAY ĐỔI THÔNG TIN */
                if (reportname == "rptTDTT_Nha.rpt")
                {
                    var biz = new ReportTDTTNhaByIdBiz(context);
                    biz.ThayDoiThongTinId = search;
                    ds = biz.ExecuteBiz();
                }
                if (reportname == "rptTDTT_Oto.rpt")
                {
                    var biz = new ReportTDTTNhaByIdBiz(context);
                    biz.ThayDoiThongTinId = search;
                    ds = biz.ExecuteBiz();
                }
                if (reportname == "rptTDTT_Tren500.rpt")
                {
                    var biz = new ReportTDTTNhaByIdBiz(context);
                    biz.ThayDoiThongTinId = search;
                    ds = biz.ExecuteBiz();
                }

                /* REPORT ĐÁNH GIÁ LẠI TÀI SẢN */
                if (reportname == "rptDanhGia_Nha.rpt")
                {
                    var biz = new ReportDanhGiaByIdBiz(context);
                    biz.ThayDoiThongTinId = search;
                    ds = biz.ExecuteBiz();
                }
                if (reportname == "rptDanhGia_Oto.rpt")
                {
                    var biz = new ReportDanhGiaByIdBiz(context);
                    biz.ThayDoiThongTinId = search;
                    ds = biz.ExecuteBiz();
                }
                if (reportname == "rptDanhGia_Tren500.rpt")
                {
                    var biz = new ReportDanhGiaByIdBiz(context);
                    biz.ThayDoiThongTinId = search;
                    ds = biz.ExecuteBiz();
                }

                /* REPORT BÁO CÁO KÊ KHAI TÀI SẢN */
                if (reportname == "rptTaiSan_KeKhai.rpt")
                {

                    CrystalReportViewer1.SeparatePages = true;
                    var biz = new ReportTaiSanKeKhaiByIdBiz(context);
                    biz.TaiSanId = Request.QueryString["TaiSanId"];
                    biz.LoaiKeKhai = Request.QueryString["LoaiKeKhai"];
                    ds = biz.ExecuteBiz();
                }

                ds.Tables[0].TableName = "Tables";
                if (reportname == "rptKiemKeById.rpt")
                {
                    ds.Tables[1].TableName = "Tables1";
                }
                //ds.WriteXmlSchema(@"D:\rptTongHopTangGiamTSCD.xml");
                string filepath = Server.MapPath("~/CrystalReport/Report/" + reportname);
                reportdocument.Load(filepath);
                reportdocument.SetDataSource(ds);
                CrystalReportViewer1.ReportSource = reportdocument;
                CrystalReportViewer1.ToolPanelView = ToolPanelViewType.None;
                Session["ReportDocument"] = reportdocument;

                if (exportexcel == "1")
                {
                    Response.Buffer = false;
                    Response.ClearContent();
                    Response.ClearHeaders();
                    reportdocument.ExportToHttpResponse(ExportFormatType.Excel, Response, true, reportname.Replace(".rpt", "").Replace("rpt", ""));
                    Response.End();
                }
            }
            else
            {
                reportdocument = Session["ReportDocument"] as ReportDocument;
                CrystalReportViewer1.ReportSource = reportdocument;
            }
        }
        public class ReportFactory
        {
            protected static Queue reportQueue = new Queue();

            protected static ReportDocument CreateReport(Type reportClass)
            {
                object report = Activator.CreateInstance(reportClass);
                reportQueue.Enqueue(report);
                return (ReportDocument)report;
            }

            public static ReportDocument GetReport(Type reportClass)
            {
                //75 is my print job limit.
                if (reportQueue.Count > 30) ((ReportDocument)reportQueue.Dequeue()).Dispose();
                return CreateReport(reportClass);
            }
        }
    }
}