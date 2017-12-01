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
using System.Globalization;
using System.Web.UI;
using System.Web.UI.WebControls;

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
                else if (reportname == "rptBaoCaoDoanhThu.rpt")
                {
                    ReportBaoCaoDoanhThuByCriteriaBiz biz = new ReportBaoCaoDoanhThuByCriteriaBiz(context);

                    biz.OrderClause = "NgayHopDong asc";
                    biz.Skip = 0;
                    biz.Take = 10000;
                    

                    if (search != null && search != "")
                    {
                        if (search.Split('|').Length > 1)
                        {
                            biz.Search = search.Split('|')[0];
                            biz.SearchLoaiHopDongId = search.Split('|')[1];
                            biz.TuNgay = DateTime.ParseExact(search.Split('|')[2], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            biz.DenNgay = DateTime.ParseExact(search.Split('|')[3], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                            biz.UserId = search.Split('|')[4];
                            biz.NhanVienId = search.Split('|')[5];
                            ds = biz.ExecuteDac();
                        }
                    }
                }
                else if (reportname == "rptDanhGiaDoanhThu.rpt")
                {
                    ReportDanhGiaDoanhThuByCriteriaBiz biz = new ReportDanhGiaDoanhThuByCriteriaBiz(context);
                    if (search != null && search != "")
                    {
                        if (search.Split('|').Length > 1)
                        {
                            biz.Nam = Protector.Int(search.Split('|')[0]);
                            biz.NhanVienKDId = Protector.Int(search.Split('|')[1]);
                            biz.UserId = search.Split('|')[2];
                            biz.NhanVienId = search.Split('|')[3];
                            ds = biz.ExecuteDac();
                        }
                    }
                }

                //CrystalReportViewer1.SeparatePages = true;

                ds.Tables[0].TableName = "Tables";
                if (ds.Tables[0].Rows.Count <= 0)
                {
                    Response.Write("<script>alert('Không có dữ liệu !');</script>");
                }

                ds.WriteXmlSchema(@"D:\rptDanhGiaDoanhThu.xml");
                string filepath = Server.MapPath("~/CrystalReport/Report/" + reportname);
                reportdocument.Load(filepath);
                reportdocument.SetDataSource(ds);
                CrystalReportViewer1.ReportSource = reportdocument;
                CrystalReportViewer1.ToolPanelView = ToolPanelViewType.None;
                Session["ReportDocument"] = reportdocument;

                if (exportexcel == "1")
                {
                    DataTable tb = new DataTable();
                    if (reportname == "rptBaoCaoDoanhThu.rpt")
                    {
                        tb = ds.Tables[0];

                        tb.Columns.Remove("MAXCNT");
                        tb.Columns.Remove("NhanVienId");
                        tb.Columns.Remove("NgayHopDong");
                        tb.Columns.Remove("TuNgay");
                        tb.Columns.Remove("DeNgay");

                        tb.Columns["MaNhanVien"].ColumnName = "Mã NV";
                        tb.Columns["SoTien"].ColumnName = "Trị giá hợp đồng";
                        ExportToExcel(tb, "BaoCaoDoanhThu", "BẢNG DOANH THU");
                    }
                    else
                    {
                        Response.Buffer = false;
                        Response.ClearContent();
                        Response.ClearHeaders();
                        reportdocument.ExportToHttpResponse(ExportFormatType.Excel, Response, true, reportname.Replace(".rpt", "").Replace("rpt", ""));
                        Response.End();
                    }
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

        public void ExportToExcel(DataTable tb, string _name, string _title)
        {
            GridView GridView1 = new GridView();

            Response.Clear();
            string filename = String.Format(_name + "_{0}_{1}_{2}.xls", DateTime.Today.Day.ToString(), DateTime.Today.Month.ToString(), DateTime.Today.Year.ToString());
            Response.AddHeader("content-disposition", "attachment;filename=" + filename);
            Response.Charset = "";
            Response.ContentType = "application/vnd.xls";
            Response.ContentEncoding = System.Text.Encoding.Unicode;
            Response.BinaryWrite(System.Text.Encoding.Unicode.GetPreamble());
            System.IO.StringWriter stringWrite = new System.IO.StringWriter();
            System.Web.UI.HtmlTextWriter htmlWrite = new HtmlTextWriter(stringWrite);
            htmlWrite.Write("<table><tr><td colspan='6'>" + _title +"</td></tr>");
            GridView1.AllowPaging = false;
            GridView1.PageSize = 10000;
            GridView1.DataSource = tb;
            GridView1.DataBind();
            GridView1.RenderControl(htmlWrite);
            string style = @"<style> TD { mso-number-format:\@; } </style>";
            Response.Write(style);
            Response.Write(stringWrite.ToString());
            Response.End();
        }
    }
}