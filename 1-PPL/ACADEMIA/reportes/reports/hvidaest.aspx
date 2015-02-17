<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="hvidaest.aspx.cs" Inherits="PPLWEB.ACADEMIA.reportes.reports.hvidaest" %>

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
          <span>Nota: Por favor espere mientras que el sistema codifica el reporte. Esta operacion puede tardar varios minutos. (Limite de tiempo: 10 min) </span>
       
             <asp:ScriptManager ID="ScriptManager1" runat="server"  AsyncPostBackTimeout="600">
             </asp:ScriptManager> 
               <rsweb:ReportViewer ID="ReportViewer1" runat="server" ZoomMode="FullPage" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Height="529px" style="text-align: center; margin-top: 0px;" Width="867px">
            <LocalReport ReportPath="ACADEMIA\reportes\reports_rdlc\hvidaest.rdlc">
                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="obHoj" Name="dsHoja" />
                    <rsweb:ReportDataSource DataSourceId="obAcudi" Name="dsAcudidos" />
                    <rsweb:ReportDataSource DataSourceId="obMatri" Name="dsMatri" />
                </DataSources>
            </LocalReport>
        </rsweb:ReportViewer>
        <asp:ObjectDataSource ID="obMatri" runat="server" SelectMethod="c_hmatriculasEst" TypeName="DAL.RepoReport">
            <SelectParameters>
                <asp:SessionParameter Name="id" SessionField="idS" Type="String" />
                <asp:SessionParameter Name="rol" SessionField="rolS" Type="String" />

            </SelectParameters>
        </asp:ObjectDataSource>
        <asp:ObjectDataSource ID="obAcudi" runat="server" SelectMethod="c_hacudidosEst" TypeName="DAL.RepoReport">
            <SelectParameters>
                  <asp:SessionParameter Name="id" SessionField="idS" Type="String" />
                <asp:SessionParameter Name="rol" SessionField="rolS" Type="String" />
            </SelectParameters>
        </asp:ObjectDataSource>
        <asp:ObjectDataSource ID="obHoj" runat="server" SelectMethod="c_hvidaEst" TypeName="DAL.RepoReport">
            <SelectParameters>
                  <asp:SessionParameter Name="id" SessionField="idS" Type="String" />
                <asp:SessionParameter Name="rol" SessionField="rolS" Type="String" />
            </SelectParameters>
        </asp:ObjectDataSource>
  
    </form>
</body>
</html>
