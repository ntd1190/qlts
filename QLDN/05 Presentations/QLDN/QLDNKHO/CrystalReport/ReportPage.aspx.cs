using System;
using CrystalDecisions.CrystalReports.Engine;
using System.Data;
using System.Globalization;
using System.Collections;
using SongAn.QLDN.Util.Common.Dto;
using System.Configuration;
using BusinessRefinery.Barcode;
using System.Drawing.Imaging;
using System.Drawing;

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

                string KhoId = Request.QueryString["KhoId"];
                string HangHoaId = Request.QueryString["HangHoaId"];
                string NhomHangHoaId = Request.QueryString["NhomHangHoaId"];
                string TuNgay = Request.QueryString["TuNgay"];
                string DenNgay = Request.QueryString["DenNgay"];
                string LoginId = Request.QueryString["LoginId"];
                string strPath = Server.MapPath("~/CrystalReport/Series/"); 
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
                if (reportname == "rptPhieuNhapSeries.rpt")
                {
                    Biz.QLKho.KhoPhieuNhap.GetListSeriesReportPhieuNhapByIdBiz biz = new Biz.QLKho.KhoPhieuNhap.GetListSeriesReportPhieuNhapByIdBiz(context);
                    biz.PhieuNhapId = search;
                    ds = biz.Execute();

                }
                else if (reportname == "rptPhieuXuat.rpt")
                {
                    Biz.QLKho.KhoPhieuXuat.GetListReportPhieuXuatByCriteraBiz biz = new Biz.QLKho.KhoPhieuXuat.GetListReportPhieuXuatByCriteraBiz(context);
                    biz.PhieuXuatId = search;                      
                    ds = biz.Execute();

                }
                else if (reportname== "rptInMaVach2.rpt") {
                    Biz.QLKho.KhoPhieuXuat.GetListSeriesReportPhieuXuatByIdBiz biz = new Biz.QLKho.KhoPhieuXuat.GetListSeriesReportPhieuXuatByIdBiz(context);
                    biz.PhieuXuatId = search;
                    biz.isSeriesAuto = "Y";
                    biz.LoginId = LoginId;
                    ds = biz.Execute();
                    /*
                    string path = strPath.Replace(@"\\", @"/");
                    Linear barcode = new Linear();
                    barcode.Symbology = Symbology.CODE128;
                    barcode.Resolution = 104;
                    string pathImage = "";

                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        string series = dr["Series"].ToString().Trim();
                        barcode.Code = series;
                        barcode.Format = ImageFormat.Png;
                        barcode.BarcodeWidth = 131;
                        barcode.BarcodeHeight = 83;
                        //barcode.DisplayText = false;
                        pathImage = path + series + ".Png";
                        bool flag = System.IO.File.Exists(pathImage);
                        if (!flag & series.Length > 0)
                        {
                            barcode.drawBarcode2ImageFile(pathImage);
                        }
                    }*/
                }
                else if (reportname == "rptPhieuXuatSeries.rpt")
                {
                    Biz.QLKho.KhoPhieuXuat.GetListSeriesReportPhieuXuatByIdBiz biz = new Biz.QLKho.KhoPhieuXuat.GetListSeriesReportPhieuXuatByIdBiz(context);
                    biz.PhieuXuatId = search;
                    biz.isSeriesAuto = "N";
                    biz.LoginId = LoginId;
                    ds = biz.Execute();
                    //
                    string path = strPath.Replace(@"\\", @"/");
                    Linear barcode = new Linear();
                    barcode.Symbology = Symbology.CODE128;
                    barcode.Resolution = 104;
                    string pathImage = "";

                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        string series = dr["Series"].ToString().Trim();
                        barcode.Code = series;
                        barcode.Format = ImageFormat.Png;
                        barcode.BarcodeWidth = 131;
                        barcode.BarcodeHeight = 83;
                        barcode.DisplayText = false;
                        pathImage = path + series + ".Png";
                        //bool flag = System.IO.File.Exists(pathImage);
                        if (series.Length > 0) {
                            barcode.drawBarcode2ImageFile(pathImage);
                        }
                    }
                    //
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
                    biz.LoginId = LoginId;
                    ds = biz.Execute();

                }
                else if (reportname == "rptPhieuThu.rpt")
                {
                    Biz.QLKho.KhoPhieuThu.GetListReportPhieuThuByCriteraBiz biz = new Biz.QLKho.KhoPhieuThu.GetListReportPhieuThuByCriteraBiz(context);
                    biz.PhieuThuId = search;
                    biz.LoginId = LoginId;
                    ds = biz.Execute();

                }
                else if (reportname == "rptKiemKe.rpt")
                {
                    Biz.QLKho.KhoKiemKe.GetListReportKiemKeByCriteriaBiz biz = new Biz.QLKho.KhoKiemKe.GetListReportKiemKeByCriteriaBiz(context);
                    biz.KHO_ID = KhoId;
                    biz.NGAY = ngay;
                    ds = biz.Execute();

                }
                else if (reportname == "rptKhoXuatNhapTon.rpt")
                {
                    Biz.QLKho.KhoXuatNhapTon.GetListReportKhoXuatNhapTonByCriteriaBiz biz = new Biz.QLKho.KhoXuatNhapTon.GetListReportKhoXuatNhapTonByCriteriaBiz(context);
                    biz.KHO_ID = KhoId;
                    biz.TU_NGAY = TuNgay;
                    biz.DEN_NGAY = DenNgay;
                    biz.HANG_HOA_ID = HangHoaId;
                    biz.NHOM_HANG_HOA_ID = NhomHangHoaId;
                    biz.LOGIN_ID = LoginId;
                    ds = biz.Execute();
                }
                else if (reportname == "rptKhoSoDuTonKho.rpt")
                {

                    Biz.QLKho.KhoSoDuTonKho.GetListReportKhoSoDuTonKhoByCriteriaBiz biz = new Biz.QLKho.KhoSoDuTonKho.GetListReportKhoSoDuTonKhoByCriteriaBiz(context);
                    biz.FieldsField = "*";
                    if (search != null && search != "")
                    {
                        TuNgay = search.Split('|')[0];
                        DenNgay = search.Split('|')[1];

                        if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____")
                            biz.TuNgay = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                            biz.DenNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        biz.KhoHangId = search.Split('|')[2];
                        biz.HangHoaId = search.Split('|')[3];
                    }
                    biz.LoginId = LoginId;
                    biz.OrderClause = "";
                    ds = biz.Execute();
                }
                else if (reportname == "rptKhoCongNoNCC.rpt")
                {
                    Biz.QLKho.KhoCongNoNCC.GetListReportKhoCongNoNCCByProjectionBiz biz = new Biz.QLKho.KhoCongNoNCC.GetListReportKhoCongNoNCCByProjectionBiz(context);
                    if (search != null && search != "")
                    {
                        TuNgay = search.Split('|')[0];
                        DenNgay = search.Split('|')[1];

                        if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____")
                            biz.TuNgay = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                            biz.DenNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        biz.KhachHangId = search.Split('|')[2];
                    }
                    biz.LoginId = LoginId;
                    ds = biz.Execute();
                }
                else if (reportname == "rptKhoCongNoNCCChiTiet.rpt")
                {
                    Biz.QLKho.KhoCongNoNCC.GetListReportKhoCongNoNCCChiTietByProjectionBiz biz = new Biz.QLKho.KhoCongNoNCC.GetListReportKhoCongNoNCCChiTietByProjectionBiz(context);
                    if (search != null && search != "")
                    {
                        TuNgay = search.Split('|')[0];
                        DenNgay = search.Split('|')[1];
                        if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____")
                            biz.TuNgay = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____")
                            biz.DenNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        biz.KhachHangId = search.Split('|')[2];
                    }
                    biz.LoginId = LoginId;
                    ds = biz.Execute();
                }
                ds.Tables[0].TableName = "Tables";
                //ds.WriteXmlSchema(@"E:\rptPhieuXuatSeries.xml");
                string filepath = Server.MapPath("~/CrystalReport/Report/" + reportname);                
                reportdocument.Load(filepath);                
                reportdocument.SetDataSource(ds);
                CrystalReportViewer1.HasCrystalLogo = false;
                CrystalReportViewer1.SeparatePages = false;
                CrystalReportViewer1.ReportSource = reportdocument;
                Session["ReportDocument"] = reportdocument;
                
                if (reportname == "rptKhoCongNoNCC.rpt" || reportname == "rptKhoCongNoNCCChiTiet.rpt")
                {
                    reportdocument.DataDefinition.FormulaFields["TuNgay"].Text = "'" + TuNgay + "'";
                    reportdocument.DataDefinition.FormulaFields["DenNgay"].Text = "'" + DenNgay + "'";
                }
                else if (reportname == "rptPhieuXuatSeries.rpt" || reportname== "rptInMaVach2.rpt") {
                    reportdocument.DataDefinition.FormulaFields["picImage"].Text = @"'"+ strPath.Replace(@"\\",@"\")+"'";
                }
                else if (reportname == "rptKiemKe.rpt")
                {
                    if (search.IndexOf('|') > 0)
                    {
                        string[] arrTBUV = search.Split('|');
                        if (arrTBUV.Length == 9)
                        {
                            reportdocument.DataDefinition.FormulaFields["TruongBanTen"].Text = "'" + search.Split('|')[0] + "'";
                            reportdocument.DataDefinition.FormulaFields["TruongBanChucVu"].Text = "'" + search.Split('|')[1] + "'";
                            reportdocument.DataDefinition.FormulaFields["TruongBanDaiDien"].Text = "'" + search.Split('|')[2] + "'";

                            reportdocument.DataDefinition.FormulaFields["UyVienTen"].Text = "'" + search.Split('|')[3] + "'";
                            reportdocument.DataDefinition.FormulaFields["UyVienChucVu"].Text = "'" + search.Split('|')[4] + "'";
                            reportdocument.DataDefinition.FormulaFields["UyVienDaiDien"].Text = "'" + search.Split('|')[5] + "'";

                            reportdocument.DataDefinition.FormulaFields["UyVienTen2"].Text = "'" + search.Split('|')[6] + "'";
                            reportdocument.DataDefinition.FormulaFields["UyVienChucVu2"].Text = "'" + search.Split('|')[7] + "'";
                            reportdocument.DataDefinition.FormulaFields["UyVienDaiDien2"].Text = "'" + search.Split('|')[8] + "'";
                        }
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
    }
}