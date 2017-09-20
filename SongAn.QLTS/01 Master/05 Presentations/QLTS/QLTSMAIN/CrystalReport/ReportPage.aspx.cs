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

namespace SongAn.QLDN.UI.QLDNKHO.CrystalReport
{
    public partial class ReportPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            CrystalDecisions.CrystalReports.Engine.ReportDocument reportdocument = new ReportDocument();
            reportdocument = ReportFactory.GetReport(reportdocument.GetType());

            if (!IsPostBack)
            {
                string reportname = Request.QueryString["Name"] + ".rpt";
                string search = Request.QueryString["Data"];
                string ngay = Request.QueryString["Ngay"];
                DataSet ds = new DataSet();
                if (reportname == "rptKeHoachMuaSam.rpt")
                {
                    ReportKeHoachMuaSamBiz biz = new ReportKeHoachMuaSamBiz();
                   

                }
                ds.Tables[0].TableName = "Tables";
                //ds.WriteXmlSchema(@"E:\rptKiemKe.xml");
                string filepath = Server.MapPath("~/CrystalReport/Report/" + reportname);
                reportdocument.Load(filepath);
                reportdocument.SetDataSource(ds);
                CrystalReportViewer1.HasCrystalLogo = false;
                CrystalReportViewer1.SeparatePages = false;
                CrystalReportViewer1.ReportSource = reportdocument;
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