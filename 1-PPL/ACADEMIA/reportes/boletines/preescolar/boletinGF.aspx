<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="boletinGF.aspx.cs" Inherits="PPLWEB.ACADEMIA.reportes.boletines.preescolar.boletinGF" %>

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
      <span>Nota: Por favor espere mientras que el sistema codifica el reporte. Esta operacion puede tardar varios minutos. (Limite de tiempo: 20 min) </span>
        <asp:ScriptManager ID="ScriptManager1" runat="server"  AsyncPostBackTimeout="1800"></asp:ScriptManager> 

    <rsweb:ReportViewer ID="ReportViewer1" runat="server" ZoomMode="FullPage" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Height="529px" style="text-align: center" Width="867px">
            <LocalReport ReportPath="ACADEMIA\reportes\boletines\preescolar\boletinGF.rdlc">
              

                <DataSources>
                    <rsweb:ReportDataSource DataSourceId="ObjBOLETINF" Name="dsBOLETINF" />
                </DataSources>
              

            </LocalReport>
        </rsweb:ReportViewer>
           
        <asp:ObjectDataSource ID="ObjBOLETINF" runat="server" SelectMethod="c_reporteFinalGrupal" TypeName="DAL.RepoReport">
            <SelectParameters>
                 <asp:SessionParameter Name="idPeriodo" SessionField="id_periodo"  Type="String" />
                <asp:SessionParameter Name="idGrupo"  SessionField="id_grupo" Type="String" />
                <asp:SessionParameter Name="observacion"  SessionField="observacion"  Type="String" />

            </SelectParameters>
        </asp:ObjectDataSource>
           
    
    </form>
        
</body>
</html>
