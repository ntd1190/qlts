<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportPage.aspx.cs" Inherits="SongAn.QLDN.UI.QLDNKHO.CrystalReport.ReportPage" %>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.2000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Báo biểu</title>
</head>
<body>
    <form id="form2" runat="server">
        <div id="dvReport">
            <CR:CrystalReportViewer ID="CrystalReportViewer1" runat="server" AutoDataBind="True" ClientIDMode="Static" HasCrystalLogo="False" PrintMode="ActiveX" ToolPanelWidth="70px" />
        </div>
    </form>
    <script src="../lib/jquery/jquery-3.1.1.js"></script>
    <script src="../lib/jquery-ui/jquery-ui.min.js"></script>
        <script type="text/javascript">
        $(document).ready(function () {
            
            $('img#IconImg_CrystalReportViewer1_toptoolbar_print').bind('click', function () {
               Print();
                return false;
            });
        })
  function Print() {  
        var dvReport = document.getElementById("dvReport");  
        var frame1 = dvReport.getElementsByTagName("iframe")[0];  
        if (navigator.appName.indexOf("Internet Explorer") != -1 || navigator.appVersion.indexOf("Trident") != -1) {  
            frame1.name = frame1.id;  
            window.frames[frame1.id].focus();  
            window.frames[frame1.id].print();  
        } else {  
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;  
            frameDoc.print();  
        }  
    }  
    </script>
</body>
</html>
