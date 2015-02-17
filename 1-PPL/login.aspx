<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="PPLWEB.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
        <link rel="shortcut icon" href="/BOOTSTRAP/img/plantel/icono.ico" />
		<title>SIGAME ACADÉMICO || Login</title>
		<meta name="description" content="description"/>
		<meta name="author" content="Evgeniya"/>
		<meta name="keyword" content="keywords">
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/BOOTSTRAP/plugins/bootstrap/bootstrap.css" rel="stylesheet" />
		<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>
		<link href='http://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css'/>
        <link href="/BOOTSTRAP/css/style.css" rel="stylesheet" />
        <script src="/BOOTSTRAP/plugins/jquery/jquery-2.1.0.min.js"></script>
        <script src="/LOGIN/test.js"></script>
        <script src="validaciones-tools.js"></script>
        <script src="/BOOTSTRAP/plugins/bootstrap/bootstrap.min.js"></script>
       
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    <div class="modal fade" id="Modal" tabindex="-1 " role="dialog" aria-labelledby="tituloModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Cerrar</span>
                    </button>
                    <h4 id="tituloModal" class="modal-title"></h4>
                </div>
                <div id="textoModal" class="modal-body"></div>
                <div id="ModalFooter" class="modal-footer"></div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalRol" role="dialog" aria-labelledby="tituloModal" >
        <div class="modal-backdrop">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="H1" class="modal-title"> Rol secundario habilitado</h4>
                </div>
                <div id="Div1" class="modal-body"> Estimado usuario, usted tiene asignado el rol: <strong> ACUDIENTE</strong> como secundario. ¿Le gustaria iniciar sección por ese es rol? </div>
                <br />
                <button id="btnSI" class="btn btn-success col-sm-5 col-lg-5"> SI</button>
                <div class="col-lg-2 col-sm-2"> </div>
                <button id="btnNO" class="btn btn-danger col-sm-5 col-lg-5" data-dismiss="modal">NO</button>
                <br />
                 <div id="Div2" class="modal-footer">
                 
                    <img src="/BOOTSTRAP/img/plantel/eslogan.png" class="img-thumbnail" /> 

                </div>
            </div>
        </div>
    </div>

       <div class="container-fluid">
            <div id="page-login" class="row">
                <div class="col-xs-12 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
                  
                    <div class="box">
                        <div class="box-content">
                            <div class="text-center">
                                <h3 class="page-header">¡Bienvenido al Inicio de Sesión!</h3>
                            </div>
                            <!-- Botones para realizar pruebas-->
                           
                            <div id="alerta"  class="text-center"></div>
                           
                               <strong> RECUERDA:</strong>
                                "Todo lo que hagas, hazlo de buena gana como si fuera para Dios y no para los hombres. Ten presente que de El recibiras la recompensa por tu trabajo" - Col 3:23 (Parafraseado)

                            <div class="form-group">
                                <label class="control-label">Identificación</label>
                                <input type="text" class="form-control" onkeydown="return validarNo(event)" name="username" id="iduser" placeholder="No. de Identificacion " autofocus />
                            </div>
                            <div class="form-group">
                                <label class="control-label">Contraseña</label>
                                <input type="password" class="form-control" name="password" id="pass" placeholder="Digite su Contraseña " />
                            </div>
                            <img id="imgload" src="BOOTSTRAP/img/devoops_getdata.gif" />
                            <div  id="Exito" class="text-center">
                                <h6 class="page-header text-primary">Estamos trabajando en su sección, por favor espere...</h6>
                            </div>
                           <div  class="txt-info text-center"  id="Urlplantel"><a  href="#" class="txt-info text-center" >Pagina principal de la institución</a> </div>

                            <div class="text-center"> 
                                <a id="BtnSeccion" class="btn-primary btn-block btn-lg text-center" data-loading-text="CARGANDO...">
                                    INICIAR SECCIÓN
                                </a>
                            </div>

                            <div class="text-center">
                                <img src="/BOOTSTRAP/img/plantel/logo.png" class="img-responsive text-center" />
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
       

    </div>
    </form>
</body>
</html>
