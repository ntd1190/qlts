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

                if (reportname == "rptGhiGiam.rpt")
                {
                    ReportGhiGiamBiz biz = new ReportGhiGiamBiz(context);
                    biz.GhiGiamId = search;
                    ds = biz.ExecuteBiz();

                }
                
                ds.Tables[0].TableName = "Tables";
                if (reportname == "rptKiemKeById.rpt")
                {
                    ds.Tables[1].TableName = "Tables1";
                }
                //ds.WriteXmlSchema(@"D:\rptKiemKeById.xml");
                string filepath = Server.MapPath("~/CrystalReport/Report/" + reportname);
                reportdocument.Load(filepath);
                reportdocument.SetDataSource(ds);
                CrystalReportViewer1.HasCrystalLogo = false;
                CrystalReportViewer1.SeparatePages = false;
                CrystalReportViewer1.ReportSource = reportdocument;
                CrystalReportViewer1.ToolPanelView = ToolPanelViewType.None;
                Session["ReportDocument"] = reportdocument;
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