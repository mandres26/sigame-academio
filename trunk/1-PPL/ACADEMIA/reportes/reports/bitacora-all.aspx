<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="bitacora-all.aspx.cs" Inherits="PPLWEB.ACADEMIA.reportes.reports.bitacora_all" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <link rel="shortcut icon" href="/BOOTSTRAP/img/plantel/icono.ico" />
		<title>Generador de reportes  </title>
</head>
<body>
    <form id="form2" runat="server">
            <span>Nota: Por favor espere mientras que el sistema codifica el reporte. Esta operacion puede tardar varios minutos. (Limite de tiempo: 30 min) </span>
       
             <asp:ScriptManager ID="ScriptManager1" runat="server"  AsyncPostBackTimeout="1800"></asp:ScriptManager>    <rsweb:ReportViewer ID="ReportViewer1" runat="server" ZoomMode="FullPage" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Height="529px" style="text-align: center" Width="867px">
            <LocalReport ReportPath="ACADEMIA\reportes\reports_rdlc\bitacora-all.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObBitacora" Name="dsBitacora" />
                </DataSources>

            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ObjectDataSource ID="ObBitacora" runat="server" SelectMethod="c_bitacora" TypeName="DAL.RepoBitacora"></asp:ObjectDataSource>
    </form>
 
</body>
</html>
