using System;
using CrystalDecisions.CrystalReports.Engine;
using System.Data;
using System.Collections;
using System.Configuration;
using SongAn.QLKD.Util.Common.Dto;
using CrystalDecisions.Web;
using CrystalDecisions.Shared;
using SongAn.QLKD.Biz.QLKD.CrystalReport;
using SongAn.QLKD.Util.Common.Helper;

namespace SongAn.QLKD.UI.QLKDMAIN.CrystalReport
{
    public partial class ReportPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            CrystalDecisions.CrystalReports.Engine.ReportDocument reportdocument = new ReportDocument();
            reportdocument = ReportFactory.GetReport(reportdocument.GetType());

            ContextDto context = new ContextDto();
            context.dbQLKDConnection = ConfigurationManager.ConnectionStrings["dbQLKDConnection"].ConnectionString;
            if (!IsPostBack)
            {
                string reportname = Request.QueryString["Name"] + ".rpt";
                string search = Request.QueryString["Data"];
                string exportexcel = Request.QueryString["export"];

                CrystalReportViewer1.HasCrystalLogo = false;
                CrystalReportViewer1.SeparatePages = false;

                DataSet ds = new DataSet();
                if (reportname == "rptDonHangById.rpt")
                {
                    var biz = new ReportDonHangByIdBiz(context);
                    biz.DonHangId = search;
                    ds = biz.ExecuteBiz();
                }
                else if (reportname == "rptBaoGiaById.rpt")
                {
                    var biz = new ReportBaoGiaByIdBiz(context);
                    biz.BaoGiaId = search;
                    ds = biz.ExecuteBiz();
                }

                //CrystalReportViewer1.SeparatePages = true;

                ds.Tables[0].TableName = "Tables";
                if (ds.Tables[0].Rows.Count <= 0)
                {
                    Response.Write("<script>alert('Không có dữ liệu !');</script>");
                }
                //if (reportname == "abc.rpt")
                //{
                //    ds.Tables[1].TableName = "Tables1";
                //}
                //ds.WriteXmlSchema(@"D:\rptBaoGiaById.xml");
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