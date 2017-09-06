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
using SongAn.QLDN.Util.Common.Dto;
using System.Configuration;

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
                ContextDto context = new ContextDto();
                context.dbMainConnection = ConfigurationManager.ConnectionStrings["dbMainConnection"].ConnectionString;
                context.dbQLNSConnection = ConfigurationManager.ConnectionStrings["dbQLNSConnection"].ConnectionString;
                DataSet ds = new DataSet();
                if (reportname == "rptPhieuNhap.rpt")
                {
                    Biz.QLKho.KhoPhieuNhap.GetListReportPhieuNhapByCriteraBiz biz = new Biz.QLKho.KhoPhieuNhap.GetListReportPhieuNhapByCriteraBiz(context);
                    biz.PhieuNhapId = search;
                    ds = biz.Execute();

                }
                else if (reportname == "rptPhieuXuat.rpt")
                {
                    Biz.QLKho.KhoPhieuXuat.GetListReportPhieuXuatByCriteraBiz biz = new Biz.QLKho.KhoPhieuXuat.GetListReportPhieuXuatByCriteraBiz(context);
                    biz.PhieuXuatId = search;
                    ds = biz.Execute();

                }
                else if (reportname == "rptPhieuChuyen.rpt")
                {
                    Biz.QLKho.KhoPhieuChuyen.GetListReportPhieuChuyenByCriteraBiz biz = new Biz.QLKho.KhoPhieuChuyen.GetListReportPhieuChuyenByCriteraBiz(context);
                    biz.PhieuChuyenId = search;
                    ds = biz.Execute();

                }
                else if (reportname == "rptPhieuChi.rpt")
                {
                    Biz.QLKho.KhoPhieuChi.GetListReportPhieuChiByCriteraBiz biz = new Biz.QLKho.KhoPhieuChi.GetListReportPhieuChiByCriteraBiz(context);
                    biz.PhieuChiId = search;
                    ds = biz.Execute();

                }
                else if (reportname == "rptPhieuThu.rpt")
                {
                    Biz.QLKho.KhoPhieuThu.GetListReportPhieuThuByCriteraBiz biz = new Biz.QLKho.KhoPhieuThu.GetListReportPhieuThuByCriteraBiz(context);
                    biz.PhieuThuId = search;
                    ds = biz.Execute();

                }
                ds.Tables[0].TableName = "Tables";
                //ds.WriteXmlSchema(@"E:\PhieuChi.xml");
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