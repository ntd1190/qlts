using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Web;
using System.Data;
using System.Reflection;
using System.Globalization;
using System.Collections;
using SongAn.QLDN.Biz.QLNS.CongViec;
using SongAn.QLDN.Util.Common.Dto;
using System.Configuration;
using SongAn.QLDN.Data.QLNS.CongViec;

namespace SongAn.QLDN.UI.QLDNMAIN.CrystalReport
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
                if (reportname == "rptBaoCaoCongViec.rpt")
                {
                    GetListBaoCaoCongViecByCriteraBiz biz = new GetListBaoCaoCongViecByCriteraBiz(context);
                    if (search != null && search != "")
                        if (search.Split('|').Length > 1)
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
                            biz.LoginId = search.Split('|')[4];
                            ds = biz.Execute();
                        }
                }
                ds.Tables[0].TableName = "Tables";
                //ds.WriteXmlSchema(@"E:\rptBaoCaoCongViec.xml");
                string filepath = Server.MapPath("~/CrystalReport/Report/" + reportname);
                reportdocument.Load(filepath);
                reportdocument.SetDataSource(ds);
                reportdocument.DataDefinition.FormulaFields["tungay"].Text = "'" + search.Split('|')[0] + "'";
                reportdocument.DataDefinition.FormulaFields["denngay"].Text = "'" + search.Split('|')[1] + "'";
                CrystalReportViewer1.HasCrystalLogo = false;
                //CrystalReportViewer1.SeparatePages = false;
                //CrystalReportViewer1.ToolPanelView = ToolPanelViewType.GroupTree;
                CrystalReportViewer1.Zoom(105);
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