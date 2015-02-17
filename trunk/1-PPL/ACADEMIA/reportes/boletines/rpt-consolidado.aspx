<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="rpt-consolidado.aspx.cs" Inherits="PPLWEB.ACADEMIA.reportes.boletines.rpt_consolidado" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Generador de reportes  </title>
    <link rel="shortcut icon" href="/BOOTSTRAP/img/plantel/icono.ico" />
</head>
<body>
    <form id="form2" runat="server">
      <span>Nota: Por favor espere mientras que el sistema codifica el reporte. Esta operacion puede tardar varios minutos. (Limite de tiempo: 30 min) </span>
        <asp:ScriptManager ID="ScriptManager1" runat="server"  AsyncPostBackTimeout="1800"></asp:ScriptManager> 
       <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Height="613px" style="text-align: center" Width="1000px">
            <LocalReport ReportPath="ACADEMIA\reportes\boletines\rpt-consolidado.rdlc">
              

                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObjCONSOLIDADO" Name="dsCONSOLIDADO" />
                </DataSources>
              

            </LocalReport>
        </rsweb:ReportViewer>
           
        <asp:ObjectDataSource ID="ObjCONSOLIDADO" runat="server" SelectMethod="c_reporteConsolidado" TypeName="DAL.RepoReport">
            <SelectParameters>
                <asp:SessionParameter Name="idGrupo"  SessionField="id_grupoC" Type="String" />
            </SelectParameters>
        </asp:ObjectDataSource>
           
    
    </form>
    
</body>
</html>
