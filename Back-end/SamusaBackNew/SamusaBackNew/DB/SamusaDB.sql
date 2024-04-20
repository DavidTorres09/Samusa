CREATE DATABASE SamusaV2	
GO

USE SamusaV2
GO

CREATE TABLE Rol(
	Id		INT  NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Rol		VARCHAR(50) NOT NULL
)
GO

CREATE TABLE Colaborador (
	Id					INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Direccion			VARCHAR (250) NOT NULL,
    Dni					VARCHAR(250) NOT NULL,
	Nombre				VARCHAR(250) NOT NULL, 
	Telefono			VARCHAR(25) NULL,
	Email				VARCHAR(250) NOT NULL, 
	EsNacional			BIT NOT NULL,
	Usuario				VARCHAR(250) NOT NULL,
	Contrasenna			VARCHAR(500) NOT NULL,
	RolId				INT NOT NULL,
	Foto				VARCHAR(500),
	Estado				BIT NOT NULL,
	EsTemporal			BIT NOT NULL
)
GO

use SamusaV2;
alter table cliente drop column Foto;

alter table cliente add FOTO nvarchar(max) NULL;


select * from cliente;

CREATE TABLE Cliente (
	Id					INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Direccion			VARCHAR (250) NOT NULL,
    Dni					VARCHAR(250) NOT NULL,
	Nombre				VARCHAR(250) NOT NULL, 
	Telefono			VARCHAR(25) NULL,
	Email				VARCHAR(250) NOT NULL, 
	EsNacional			BIT NOT NULL,
	Usuario				VARCHAR(250) NOT NULL,
	Contrasenna			VARCHAR(500) NOT NULL,
	RolId				INT NOT NULL,
	Foto				VARCHAR(500),
	Estado				BIT NOT NULL,
	EsTemporal			BIT NOT NULL
)
GO

CREATE TABLE RevisionVehiculo(
	Id				INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	VIN				VARCHAR(35) NOT NULL,
	Marca			VARCHAR(50) NOT NULL,
    Modelo			VARCHAR(50) NOT NULL,
    Extras			VARCHAR(250) NOT NULL,
    Color			VARCHAR(50) NOT NULL,
    CostoVehiculo	DECIMAL(10,2) DEFAULT 0 NOT NULL,
    AnnoVehiculo	VARCHAR(25) NOT NULL,
	DniDuenno		VARCHAR(250) NOT NULL,
    Placa			VARCHAR(25) NULL,
    EstadoOP		VARCHAR(50) NOT NULL
)
GO

CREATE TABLE RevisionContenedor (
	Id					INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	PuertoOrigen		VARCHAR(80) NOT NULL,
	PuertoDestino		VARCHAR(80) NOT NULL,
    Naviera				VARCHAR(80) NOT NULL,
    Transportista		VARCHAR(80) NOT NULL,
	DniDuenno			VARCHAR(250) NOT NULL,
    Estado				VARCHAR(20) NOT NULL
)
GO

CREATE TABLE Importacion (
	Id						INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ImpSeguimientoId		INT NOT NULL,
	ClienteId				INT NOT NULL,
    RevVehiculoId			INT NULL,
    RevContenedorId			INT NULL,
	FechaInicio				DATETIME NOT NULL,
	FechaFinalizacion		DATETIME NULL,
	FechaEsperada			DATETIME NULL,
	Prioridad				VARCHAR (80) NOT NULL,
    Descripcion				VARCHAR (250) NULL,
)
GO

CREATE TABLE Exportacion (
	Id						INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ExpSeguimientoId		INT NOT NULL,
	ClienteId				INT NOT NULL,
    RevVehiculoId			INT NULL,
    RevContenedorId			INT NULL,
	FechaInicio				DATETIME NOT NULL,
	FechaFinalizacion		DATETIME NULL,
	FechaEsperada			DATETIME NULL,
	Prioridad				VARCHAR (80) NOT NULL,
    Descripcion				VARCHAR (250) NULL
)
GO

CREATE TABLE Paqueteria (
	Id				INT	NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ClienteId		INT NOT NULL,
	NumCasillero	VARCHAR (80) NOT NULL,
	NumTracking		VARCHAR (80) NOT NULL,
	TipoProducto	VARCHAR (80) NOT NULL,
	DirectOrigen	VARCHAR (200) NOT NULL,
	DirectDestino	VARCHAR (200) NOT NULL,
	FechaRegistro	DATETIME NOT NULL,
	FechaEsperada	DATETIME NULL,
)
GO

CREATE TABLE Cotizacion (
	Id					INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ColaboradorId		INT NOT NULL,
	TipoProducto		VARCHAR(50) NOT NULL,
	Producto			VARCHAR(80) NOT NULL,
	PorcentajeIMP		INT NOT NULL,
	EnlaceRef			VARCHAR(500) NOT NULL,
	FechaCreacion		DATETIME NOT NULL,
)
GO

CREATE TABLE Ticket (
    Id				INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    Estado			VARCHAR(50),
    Prioridad		VARCHAR(50),
    Descripcion		VARCHAR(500),
    ClienteId		INT NOT NULL,
    ColaboradorId	INT NOT NULL,
)
GO

CREATE TABLE Alarma (
	Id			INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	Descripcion VARCHAR(300) NOT NULL
)
GO

CREATE TABLE Documento(
	Id					INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	ImportacionId		INT NULL,
	ExportacionId		INT NULL,
	Url					VARCHAR(500) NULL,
)
GO

ALTER TABLE Colaborador
ADD CONSTRAINT FK_Colaborador_Rol FOREIGN KEY (RolId) REFERENCES Rol(Id)
GO

ALTER TABLE Cliente
ADD CONSTRAINT FK_Cliente_Rol FOREIGN KEY (RolId) REFERENCES Rol(Id)
GO

ALTER TABLE Paqueteria
ADD CONSTRAINT FK_Paqueteria_Persona FOREIGN KEY (ClienteId) REFERENCES Cliente(Id)
GO

ALTER TABLE Importacion
ADD CONSTRAINT FK_Importaciones_Persona FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
	CONSTRAINT FK_Importaciones_RevA FOREIGN KEY (RevVehiculoId) REFERENCES RevisionVehiculo(Id),
	CONSTRAINT FK_Importaciones_RevC FOREIGN KEY (RevContenedorId) REFERENCES RevisionContenedor(Id)
GO

ALTER TABLE Exportacion
ADD CONSTRAINT FK_Exportaciones_Persona FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
	CONSTRAINT FK_Exportaciones_RevA FOREIGN KEY (RevVehiculoId) REFERENCES RevisionVehiculo(Id),
	CONSTRAINT FK_Exportaciones_RevC FOREIGN KEY (RevContenedorId) REFERENCES RevisionContenedor(Id)
GO

ALTER TABLE Cotizacion
ADD CONSTRAINT FK_Cotizacion_Colaborador FOREIGN KEY (ColaboradorId) REFERENCES Colaborador(Id);
GO

ALTER TABLE Ticket
ADD CONSTRAINT FK_Ticket_Cliente FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
	CONSTRAINT FK_Ticket_Colaborador FOREIGN KEY (ColaboradorId) REFERENCES Colaborador(Id)
GO

ALTER TABLE Documento
ADD CONSTRAINT FK_Documentos_Importaciones FOREIGN KEY (ImportacionId) REFERENCES Importacion(Id),
	CONSTRAINT FK_Documentos_Exportaciones FOREIGN KEY (ExportacionId) REFERENCES Exportacion(Id)
GO

INSERT INTO Rol (Rol)
VALUES ('Usuario'), ('Administrador'), ('Supervisor'), ('Gerente')
GO

INSERT INTO RevisionVehiculo (VIN, Marca, Modelo, Extras, Color, CostoVehiculo, AnnoVehiculo, DniDuenno, Placa, EstadoOP)
VALUES 
    ('S/D', 'S/D', 'S/D', 'S/D', 'S/D', 0.00, 'S/D', 'S/D', 'S/D', 'S/D');
GO

INSERT INTO RevisionContenedor (PuertoOrigen, PuertoDestino, Naviera, Transportista, DniDuenno, Estado)
VALUES  ('S/D', 'S/D', 'S/D', 'S/D', 'S/D', 'S/D')
GO

CREATE PROCEDURE AgregarCliente (
	@Direccion		VARCHAR(250),
    @Dni			VARCHAR(50),
    @Nombre			VARCHAR(250),
    @Telefono		VARCHAR(25),
    @Email			VARCHAR(250),
    @EsNacional		BIT,
    @Usuario		VARCHAR(250),
    @Contrasenna	VARCHAR(250),
    @Foto			VARCHAR(500)
)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Usuario = @Usuario)
    BEGIN
		IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Dni = @Dni)
		BEGIN
			IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Email = @Email)
			BEGIN
				INSERT INTO Cliente (Direccion, Dni, Nombre, Telefono, Email, EsNacional, Usuario, Contrasenna, RolId, Foto, Estado, EsTemporal)
				VALUES (@Direccion, @Dni, @Nombre, @Telefono, @Email, @EsNacional, @Usuario, @Contrasenna, 1, @Foto, 1, 0);
			END
		END
	END
END
GO

drop procedure modificarCliente;
CREATE PROCEDURE ModificarCliente(
	@Id				INT,
	@Direccion		VARCHAR(250),
    @Dni			VARCHAR(50),
    @Nombre			VARCHAR(250),
    @Telefono		VARCHAR(25),
    @Email			VARCHAR(40),
    @EsNacional		BIT,
    @Usuario		VARCHAR(250),
    @Contrasenna	VARCHAR(250),
    @RolId			INT,
    @Foto			nvarchar(max)
	)
AS
BEGIN
     IF EXISTS (SELECT 1 FROM Cliente WHERE id = @Id)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Email = @Email  AND Dni <> @Dni)
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Usuario = @Usuario AND Dni <> @Dni)
            BEGIN
                UPDATE Cliente
                SET Direccion = @direccion,
					Dni = @Dni,
					Nombre = @Nombre,
                    Telefono = @Telefono,
                    Email = @Email,
                    EsNacional = @EsNacional,
                    Usuario = @Usuario,
                    Contrasenna = @Contrasenna,
                    RolId = @RolId,
                    Foto = @Foto
                WHERE id = @Id;
            END
        END
    END
END
GO

CREATE PROCEDURE ObtenerClientes
AS
BEGIN
	SELECT
		C.Id,
		C.Dni,
		C.Nombre,
		C.Telefono,
		C.Email,
		C.EsNacional,
		C.Usuario,
		C.Contrasenna,
		C.Direccion,
		R.Id AS 'RolId',
		R.Rol AS 'NombreRol',
		C.Foto
	FROM
		Cliente C
	JOIN Rol R ON C.RolId = R.Id
END
GO

CREATE PROCEDURE ObtenerCliente (
    @Id INT
)
AS
BEGIN
	SELECT
		C.Id,
		C.Dni,
		C.Nombre,
		C.Telefono,
		C.Email,
		C.EsNacional,
		C.Usuario,
		C.Contrasenna,
		C.Direccion,
		R.Id AS 'RolId',
		R.Rol AS 'NombreRol',
		C.Foto
	FROM
		Cliente C
	JOIN 
		Rol R ON C.RolId = R.Id
	WHERE
		C.Id = @Id;
END
GO

CREATE PROCEDURE EliminarCliente (
    @Id INT
)
AS
BEGIN
    DELETE FROM Cliente
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE AgregarColaborador (
	@Direccion		VARCHAR(250),
    @Dni			VARCHAR(250),
    @Nombre			VARCHAR(250),
    @Telefono		VARCHAR(25),
    @Email			VARCHAR(250),
    @EsNacional		BIT,
    @Usuario		VARCHAR(250),
    @Contrasenna	VARCHAR(250),
    @RolId			INT,
    @Foto			VARCHAR(500)
)
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Usuario = @Usuario)
    BEGIN
		IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Dni = @Dni)
		BEGIN
			IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Email = @Email)
			BEGIN
				INSERT INTO Colaborador (Direccion, Dni, Nombre, Telefono, Email, EsNacional, Usuario, Contrasenna, RolId, Foto, Estado, EsTemporal)
				VALUES (@Direccion, @Dni, @Nombre, @Telefono, @Email, @EsNacional, @Usuario, @Contrasenna, @RolId, @Foto, 1, 0);
			END
		END
	END
END
GO

CREATE PROCEDURE ModificarColaborador(
	@Id				INT,
	@Direccion		VARCHAR(250),
    @Dni			VARCHAR(250),
    @Nombre			VARCHAR(250),
    @Telefono		VARCHAR(25),
    @Email			VARCHAR(40),
    @EsNacional		BIT,
    @Usuario		VARCHAR(250),
    @Contrasenna	VARCHAR(250),
    @RolId			INT,
    @Foto			VARCHAR(500)
	)
AS
BEGIN
     IF EXISTS (SELECT 1 FROM Colaborador WHERE id = @Id)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Email = @Email  AND Dni <> @Dni)
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Usuario = @Usuario AND Dni <> @Dni)
            BEGIN
                UPDATE Colaborador
                SET Direccion = @direccion,
					Dni = @Dni,
					Nombre = @Nombre,
                    Telefono = @Telefono,
                    Email = @Email,
                    EsNacional = @EsNacional,
                    Usuario = @Usuario,
                    Contrasenna = @Contrasenna,
                    RolId = @RolId,
                    Foto = @Foto
                WHERE id = @Id;
            END
        END
    END
END
GO

CREATE PROCEDURE ObtenerColaboradores
AS
BEGIN
	SELECT
		C.Id,
		C.Dni,
		C.Nombre,
		C.Telefono,
		C.Email,
		C.EsNacional,
		C.Usuario,
		C.Contrasenna,
		C.Direccion,
		R.Id AS 'RolId',
		R.Rol AS 'NombreRol',
		C.Foto
	FROM
		Colaborador C
	JOIN Rol R ON C.RolId = R.Id
END
GO

CREATE PROCEDURE ObtenerColaborador (
    @Id INT
)
AS
BEGIN
	SELECT
		C.Id,
		C.DNI,
		C.Nombre,
		C.Telefono,
		C.Email,
		C.EsNacional,
		C.Usuario,
		C.Contrasenna,
		C.Direccion,
		R.Id AS 'RolID',
		R.Rol AS 'NombreRol',
		C.Foto
	FROM
		Colaborador C
	JOIN 
		Rol R ON C.RolId = R.Id
	WHERE
		C.Id = @Id;
END
GO

CREATE PROCEDURE EliminarColaborador (
    @Id INT
)
AS
BEGIN
    DELETE FROM Colaborador
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE AgregarExportacion (
	@ExpSeguimientoId	INT,
	@ClienteId			INT,
	@RevVehiculoId		INT,
	@RevContenedorId	INT,
	@FechaInicio		DATETIME,
	@FechaFinalizacion	DATETIME,
	@FechaEsperada		DATETIME,
	@Prioridad			VARCHAR(80),
	@Descripcion		VARCHAR(250)
)
AS
IF NOT EXISTS (SELECT 1 FROM Exportacion WHERE ExpSeguimientoId = @ExpSeguimientoId)
BEGIN
	INSERT INTO Exportacion (ExpSeguimientoId, ClienteId, RevVehiculoId, RevContenedorId, FechaInicio, FechaFinalizacion, FechaEsperada, Prioridad, Descripcion)
	VALUES (@ExpSeguimientoId, @ClienteId, @RevVehiculoId, @RevContenedorId, @FechaInicio, @FechaFinalizacion, @FechaEsperada, @Prioridad, @Descripcion);
END
GO

CREATE PROCEDURE ModificarExportacion (
	@Id					INT,
	@ExpSeguimientoId	INT,
	@ClienteId			INT,
	@RevVehiculoId		INT,
	@RevContenedorId	INT,
	@FechaFinalizacion	DATETIME,
	@FechaEsperada		DATETIME,
	@Prioridad			VARCHAR(80),
	@Descripcion		VARCHAR(250)
)
AS
IF EXISTS (SELECT 1 FROM Exportacion WHERE ExpSeguimientoId = @ExpSeguimientoId)
BEGIN
	UPDATE Exportacion
	SET ExpSeguimientoId = @ExpSeguimientoId,
		ClienteId = @ClienteId,
		RevVehiculoId = @RevVehiculoId,
		RevContenedorId = @RevContenedorId,
		FechaFinalizacion = @FechaFinalizacion,
		FechaEsperada = @FechaEsperada,
		Prioridad = @Prioridad,
		Descripcion = @Descripcion
	WHERE ExpSeguimientoId = @ExpSeguimientoId;
END
GO

CREATE PROCEDURE ObtenerExportaciones
AS
BEGIN
	SELECT
		E.Id,
		E.ExpSeguimientoId,
		E.ClienteId,
		E.RevVehiculoId,
		E.RevContenedorId,
		E.FechaInicio,
		E.FechaFinalizacion,
		E.FechaEsperada,
		E.Prioridad,
		E.Descripcion
	FROM
		Exportacion E
END
GO

CREATE PROCEDURE ObtenerExportacion (
	@Id INT
)
AS
BEGIN
	SELECT
		E.Id,
		E.ExpSeguimientoId,
		E.ClienteId,
		E.RevVehiculoId,
		E.RevContenedorId,
		E.FechaInicio,
		E.FechaFinalizacion,
		E.FechaEsperada,
		E.Prioridad,
		E.Descripcion
	FROM
		Exportacion E
	WHERE E.Id = @Id
END
GO

CREATE PROCEDURE EliminarExportacion (
	@Id INT
)
AS
BEGIN
	DELETE FROM Exportacion
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE AgregarImportacion (
	@ImpSeguimientoId	INT,
	@ClienteId			INT,
	@RevVehiculoId		INT,
	@RevContenedorId	INT,
	@FechaInicio		DATETIME,
	@FechaFinalizacion	DATETIME,
	@FechaEsperada		DATETIME,
	@Prioridad			VARCHAR(80),
	@Descripcion		VARCHAR(250)
)
AS
IF NOT EXISTS (SELECT 1 FROM Importacion WHERE ImpSeguimientoId = @ImpSeguimientoId)
BEGIN
	INSERT INTO Importacion (ImpSeguimientoId, ClienteId ,RevVehiculoId ,RevContenedorId, FechaInicio, FechaFinalizacion, FechaEsperada, Prioridad, Descripcion)
	VALUES (@ImpSeguimientoId, @ClienteId, @RevVehiculoId, @RevContenedorId, @FechaInicio, @FechaFinalizacion, @FechaEsperada, @Prioridad, @Descripcion);
END
GO

CREATE PROCEDURE ModificarImportacion (
	@Id					INT,
	@ImpSeguimientoId	INT,
	@ClienteId			INT,
	@RevVehiculoId		INT,
	@RevContenedorId	INT,
	@FechaFinalizacion	DATETIME,
	@FechaEsperada		DATETIME,
	@Prioridad			VARCHAR(80),
	@Descripcion		VARCHAR(250)
)
AS
IF EXISTS (SELECT 1 FROM Importacion WHERE ImpSeguimientoId = @ImpSeguimientoId)
BEGIN
	UPDATE Importacion
	SET ImpSeguimientoId = @ImpSeguimientoId,
		RevVehiculoId = @RevVehiculoId,
		RevContenedorId = @RevContenedorId,
		FechaFinalizacion = @FechaFinalizacion,
		FechaEsperada = @FechaEsperada,
		Prioridad = @Prioridad,
		Descripcion = @Descripcion
	WHERE Id = @Id
END
GO

CREATE PROCEDURE ObtenerImportaciones
AS
BEGIN
	SELECT
		Id,
		ImpSeguimientoId,
		ClienteId,
		RevVehiculoId,
		RevContenedorId,
		FechaInicio,
		FechaFinalizacion,
		FechaEsperada,
		Prioridad,
		Descripcion
	FROM
		Importacion 
END
GO

CREATE PROCEDURE ObtenerImportacion (
	@Id INT
)
AS
BEGIN
	SELECT
		Id,
		ImpSeguimientoId,
		ClienteId,
		RevVehiculoId,
		RevContenedorId,
		FechaInicio,
		FechaFinalizacion,
		FechaEsperada,
		Prioridad,
		Descripcion
	FROM
		Importacion 
	WHERE Id = @Id
END
GO

CREATE PROCEDURE EliminarImportacion (
	@id INT
)
AS
BEGIN
	DELETE FROM Importacion
	WHERE Id = @id;
END
GO

CREATE PROCEDURE AgregarPaqueteria (
		@ClienteId		INT,
		@NumCasillero	VARCHAR(80),
		@NumTracking	VARCHAR(80),
		@TipoProducto	VARCHAR(80),
		@DirectOrigen	VARCHAR(200),
		@DirectDestino	VARCHAR(200),
		@FechaRegistro	DATETIME,
		@FechaEsperada	DATETIME
	)
AS
	INSERT INTO Paqueteria (ClienteId, NumCasillero, NumTracking, TipoProducto, DirectOrigen, DirectDestino, FechaRegistro, FechaEsperada)
	VALUES (@ClienteId, @NumCasillero, @NumTracking, @TipoProducto, @DirectOrigen, @DirectDestino, @FechaRegistro, @FechaEsperada);
GO

CREATE PROCEDURE ModificarPaqueteria (
		@Id				INT,
		@ClienteId		INT,
		@NumCasillero	VARCHAR(80),
		@NumTracking	VARCHAR(80),
		@TipoProducto	VARCHAR(80),
		@DirectOrigen	VARCHAR(200),
		@DirectDestino	VARCHAR(200),
		@FechaEsperada	DATETIME
	)
AS
IF EXISTS (SELECT 1 FROM Paqueteria WHERE Id = @Id)
BEGIN
	UPDATE Paqueteria
	SET ClienteId = @ClienteId,
		NumCasillero = @NumCasillero,
		NumTracking = @NumTracking,
		TipoProducto = @TipoProducto,
		DirectOrigen = @DirectOrigen,
		DirectDestino = @DirectDestino,
		FechaEsperada = @FechaEsperada
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE ObtenerPaqueterias
AS
BEGIN
	SELECT
		P.Id,
		P.ClienteId,
		P.NumCasillero,
		P.NumTracking,
		P.TipoProducto,
		P.DirectOrigen,
		P.DirectDestino,
		P.FechaRegistro,
		P.FechaEsperada
	FROM
		Paqueteria P
END
GO

CREATE PROCEDURE ObtenerPaqueteria (
	@Id INT
)
AS
BEGIN
	SELECT
		P.Id,
		P.ClienteId,
		P.NumCasillero,
		P.NumTracking,
		P.TipoProducto,
		P.DirectOrigen,
		P.DirectDestino,
		P.FechaRegistro,
		P.FechaEsperada
	FROM
		Paqueteria P
	WHERE
		P.Id = @Id;
END
GO

CREATE PROCEDURE EliminarPaqueteria (
	@Id INT
)
AS
BEGIN
	DELETE FROM Paqueteria
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE AgregarCotizacion (
	@ColaboradorId	INT,
	@TipoProducto	VARCHAR(50),
	@Producto		VARCHAR(20),
	@PorcentajeIMP	INT,
	@EnlaceRef		VARCHAR(500),
	@FechaCreacion	DATETIME
)
AS
	INSERT INTO Cotizacion (ColaboradorId,TipoProducto, Producto, PorcentajeIMP, EnlaceRef, FechaCreacion)
	VALUES ( @ColaboradorId, @TipoProducto, @Producto, @PorcentajeIMP, @EnlaceRef, @FechaCreacion);
GO

CREATE PROCEDURE ModificarCotizacion (
		@Id				INT,
		@ColaboradorId	INT,
		@TipoProducto	VARCHAR(50),
		@Producto		VARCHAR(20),
		@PorcentajeIMP	INT,
		@EnlaceRef		VARCHAR(500)
	)
AS
	UPDATE Cotizacion
	SET ColaboradorId = @ColaboradorId,
		TipoProducto = @TipoProducto,
		Producto = @Producto,
		PorcentajeIMP = @PorcentajeIMP,
		EnlaceRef = @EnlaceRef
	WHERE Id = @Id;
GO

CREATE PROCEDURE ObtenerCotizaciones
AS
BEGIN
	SELECT
		C.Id,
		C.ColaboradorId,
		C.TipoProducto,
		C.Producto,
		C.PorcentajeIMP,
		C.EnlaceRef,
		C.FechaCreacion
	FROM
		Cotizacion C
END
GO

CREATE PROCEDURE ObtenerCotizacion (
	@id INT
)
AS
BEGIN
	SELECT
		C.Id,
		C.ColaboradorId,
		C.TipoProducto,
		C.Producto,
		C.PorcentajeIMP,
		C.EnlaceRef,
		C.FechaCreacion
	FROM
		Cotizacion C
	WHERE
		C.Id = @Id;
END
GO

CREATE PROCEDURE EliminarCotizacion (
	@id INT
)
AS
BEGIN
	DELETE FROM Cotizacion
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE AgregarRevisionContenedor (
	@PuertoOrigen	VARCHAR(80),
	@PuertoDestino	VARCHAR(80),
	@Naviera		VARCHAR(80),
	@Transportista	VARCHAR(80),
	@DniDuenno		VARCHAR(250),
	@Estado			VARCHAR(20)
)
AS
BEGIN
	INSERT INTO RevisionContenedor (PuertoOrigen, PuertoDestino, Naviera, Transportista, DniDuenno, Estado)
	VALUES ( @PuertoOrigen, @PuertoDestino, @Naviera, @Transportista, @DniDuenno, @Estado);
END
GO

CREATE PROCEDURE ModificarRevisionContenedor (
	@Id				INT,		
	@PuertoOrigen	VARCHAR(80),
	@PuertoDestino	VARCHAR(80),
	@Naviera		VARCHAR(80),
	@Transportista	VARCHAR(80),
	@DniDuenno		VARCHAR(250),
	@Estado			VARCHAR(20)
)
AS
BEGIN
	UPDATE RevisionContenedor
	SET PuertoOrigen = @PuertoOrigen,
		PuertoDestino = @PuertoDestino,
		Naviera = @Naviera,
		Transportista = @Transportista,
		DniDuenno = @DniDuenno,
		Estado = @Estado
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE ObtenerRevisionContenedores
AS
BEGIN
	SELECT
		Id,
		PuertoOrigen,
		PuertoDestino,
		Naviera,
		Transportista,
		DniDuenno,
		Estado
	FROM
		RevisionContenedor 
END
GO

CREATE PROCEDURE ObtenerRevisionContenedor (
	@id INT
)
AS
BEGIN
	SELECT
		Id,
		PuertoOrigen,
		PuertoDestino,
		Naviera,
		Transportista,
		DniDuenno,
		Estado
	FROM
		RevisionContenedor 
	WHERE
		Id = @id;
END
GO

CREATE PROCEDURE EliminarRevisionContenedor (
	@id INT
)
AS
BEGIN
	DELETE FROM RevisionContenedor
	WHERE Id = @id;
END
GO

CREATE PROCEDURE AgregarRevisionVehiculo (
	@VIN			VARCHAR(35),
	@Marca			VARCHAR(50),
	@Modelo			VARCHAR(50),
	@Extras			VARCHAR(250),
	@Color			VARCHAR(50),
	@CostoVehiculo	DECIMAL(10,2),
	@AnnoVehiculo	VARCHAR(25),
	@DniDuenno		VARCHAR(250),
	@Placa			VARCHAR(25),
	@EstadoOP		VARCHAR(25)
)
AS
BEGIN
	INSERT INTO RevisionVehiculo (VIN, Marca, Modelo, Extras, Color, CostoVehiculo, AnnoVehiculo, DniDuenno, Placa, EstadoOP)
	VALUES (@VIN, @Marca, @Modelo, @Extras, @Color, @CostoVehiculo, @AnnoVehiculo, @DniDuenno, @Placa, @EstadoOP);
END
GO

CREATE PROCEDURE ModificarRevisionVehiculo (
	@Id				INT,
	@VIN			VARCHAR(35),
	@Marca			VARCHAR(50),
	@Modelo			VARCHAR(50),
	@Extras			VARCHAR(250),
	@Color			VARCHAR(50),
	@CostoVehiculo	DECIMAL(10,2),
	@AnnoVehiculo	VARCHAR(25),
	@DniDuenno		VARCHAR(250),
	@Placa			VARCHAR(25),
	@EstadoOP		VARCHAR(25)
)
AS
IF EXISTS (SELECT 1 FROM RevisionVehiculo WHERE Id = @Id)
BEGIN
	UPDATE RevisionVehiculo
	SET VIN = @VIN,
		Marca = @Marca,
		Modelo = @Modelo,
		Extras = @Extras,
		Color = @Color,
		CostoVehiculo = @CostoVehiculo,
		AnnoVehiculo = @AnnoVehiculo,
		DniDuenno = @DniDuenno,
		Placa = @Placa,
		EstadoOP = @EstadoOP
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE ObtenerRevisionVehiculos
AS
BEGIN
	SELECT
		Id,
		VIN,
		Marca,
		Modelo,
		Extras,
		Color,
		CostoVehiculo,
		AnnoVehiculo,
		DniDuenno,
		Placa,
		EstadoOP
	FROM
		RevisionVehiculo 
END
GO

CREATE PROCEDURE ObtenerRevisionVehiculo (
	@id INT
)
AS
BEGIN
	SELECT
		Id,
		VIN,
		Marca,
		Modelo,
		Extras,
		Color,
		CostoVehiculo,
		AnnoVehiculo,
		DniDuenno,
		Placa,
		EstadoOP
	FROM
		RevisionVehiculo 
	WHERE
		Id = @id;
END
GO

CREATE PROCEDURE EliminarRevisionVehiculo (
	@Id INT
)
AS
BEGIN
	DELETE FROM RevisionVehiculo
	WHERE Id = @Id;
END
GO



CREATE PROCEDURE AgregarRol (
	@Rol VARCHAR(50)
)
AS
IF NOT EXISTS (SELECT 1 FROM Rol WHERE Rol = @Rol)
BEGIN
	INSERT INTO Rol (Rol)
	VALUES (@Rol);
END
GO

CREATE PROCEDURE ModificarRol (
	@Id INT,
	@Rol VARCHAR(50)
)
AS
IF EXISTS (SELECT 1 FROM Rol WHERE Id = @Id)
BEGIN
	UPDATE Rol
	SET Rol = @Rol
	WHERE ID = @ID;
END
GO

CREATE PROCEDURE ObtenerRoles
AS
BEGIN
	SELECT
		Id,
		Rol
	FROM
		Rol
END
GO

CREATE PROCEDURE ObtenerRol (
	@id INT
)
AS
	BEGIN
	SELECT
		Id,
		Rol
	FROM
		Rol
	WHERE
		Id = @id;
END
GO

CREATE PROCEDURE EliminarRol (
	@id INT
)
AS
BEGIN
	DELETE FROM Rol
	WHERE Id = @id;
END
GO

CREATE PROCEDURE AgregarTicket (
	@Estado			VARCHAR(50),
	@Prioridad		VARCHAR(50),
	@Descripcion	VARCHAR(500),
	@ClienteId		INT,
	@ColaboradorId	INT
)
AS
IF NOT EXISTS (SELECT 1 FROM Ticket WHERE Estado = @Estado AND Prioridad = @Prioridad AND Descripcion = @Descripcion AND ClienteId = @ClienteId AND ColaboradorId = @ColaboradorId)
BEGIN
	INSERT INTO Ticket (Estado, Prioridad, Descripcion, ClienteId, ColaboradorId)
	VALUES (@Estado, @Prioridad, @Descripcion, @ClienteId, @ColaboradorId);
END
GO

CREATE PROCEDURE ModificarTicket (
	@Id				INT,
	@Estado			VARCHAR(50),
	@Prioridad		VARCHAR(50),
	@Descripcion	VARCHAR(500),
	@ClienteId		INT,
	@ColaboradorId	INT
)
AS
IF EXISTS (SELECT 1 FROM Ticket WHERE Id = @Id)
BEGIN
	UPDATE Ticket
	SET Estado = @Estado,
		Prioridad = @Prioridad,
		Descripcion = @Descripcion,
		ClienteId = @ClienteId,
		ColaboradorId = @ColaboradorId
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE ObtenerTickets
AS
BEGIN
	SELECT
		Id,
		Estado,
		Prioridad,
		Descripcion,
		ClienteId,
		ColaboradorId
	FROM
		Ticket
END
GO

CREATE PROCEDURE ObtenerTicket (
	@Id INT
)
AS
BEGIN
	SELECT
		Id,
		Estado,
		Prioridad,
		Descripcion,
		ClienteId,
		ColaboradorId
	FROM
		Ticket
	WHERE
		Id = @Id;
END
GO

CREATE PROCEDURE EliminarTicket (
	@Id INT
)
AS
BEGIN
	DELETE FROM Ticket
	WHERE Id = @Id;
END
GO

CREATE PROCEDURE AgregarAlarma(
	@Descripcion VARCHAR(500)
)
AS
IF NOT EXISTS (SELECT 1 FROM Alarma WHERE Descripcion = @Descripcion)
BEGIN
	INSERT INTO Alarma (Descripcion)
	VALUES (@Descripcion);
END
GO

CREATE PROCEDURE ObtenerAlarmas
AS
BEGIN
	SELECT
		*
	FROM
		Alarma
END
GO

CREATE PROCEDURE EliminarAlarma(
	@Id INT
)
AS
BEGIN
	DELETE FROM Alarma WHERE Id = @Id
END
GO


CREATE procedure [dbo].[AutenticaUsuario_cliente](
@P_Usuario VARCHAR(50),
@P_Clave VARCHAR(50)
)
AS
BEGIN
SELECT u.Id, u.Dni, u.Nombre, u.Usuario, u.email, r.Rol AS NombreRol, u.Foto
FROM dbo.cliente u
INNER JOIN Rol r ON u.RolId = r.id
WHERE u.USUARIO = @P_Usuario and u.Contrasenna = @P_Clave
END
GO

CREATE procedure [dbo].[AutenticaUsuario_colaborador](
@P_Usuario VARCHAR(50),
@P_Clave VARCHAR(50)
)
AS
BEGIN
SELECT u.Id, u.Dni, u.Nombre, u.Usuario, u.email, r.Rol AS NombreRol, u.Foto
FROM dbo.colaborador u
INNER JOIN Rol r ON u.RolId = r.id
WHERE u.USUARIO = @P_Usuario and u.Contrasenna = @P_Clave
END
GO

CREATE PROCEDURE RecuperarAccesoCliente
	@Email			VARCHAR(250),
	@Contrasenna	VARCHAR(500),
	@EsTemporal		BIT
AS
BEGIN
	DECLARE @Consecutivo BIGINT

	SELECT  @Consecutivo = Id
	FROM	Cliente
	WHERE	Email = @Email
		AND Estado = 1

	IF @Consecutivo IS NOT NULL
		BEGIN
			UPDATE Cliente
			SET Contrasenna = @Contrasenna,
				EsTemporal = 1
			WHERE Email = @Email
		END
	SELECT	U.Id, U.Email, U.Nombre, U.Email, U.Usuario, U.RolId, R.Rol 'NombreRol',Estado,EsTemporal
	  FROM	Cliente U
	  INNER JOIN Rol R ON U.RolId = R.Id
	  WHERE	Email = @Email
		AND Estado = 1
END
GO

CREATE PROCEDURE RecuperarAccesoColaborador
	@Email			VARCHAR(250),
	@Contrasenna	VARCHAR(500),
	@EsTemporal		BIT
AS
BEGIN
	DECLARE @Consecutivo BIGINT

	SELECT  @Consecutivo = Id
	FROM	Colaborador
	WHERE	Email = @Email
		AND Estado = 1

	IF @Consecutivo IS NOT NULL
		BEGIN
			UPDATE Colaborador
			SET Contrasenna = @Contrasenna,
				EsTemporal = 1
			WHERE Email = @Email
		END
	SELECT	U.Id, U.Email, U.Nombre, U.Email, U.Usuario, U.RolId, R.Rol 'NombreRol',Estado,EsTemporal
	  FROM	Colaborador U
	  INNER JOIN Rol R ON U.RolId = R.Id
	  WHERE	Email = @Email
		AND Estado = 1
END
GO


CREATE PROCEDURE CambiarContrasennaCliente
	@Email					VARCHAR(200),
	@Contrasenna			VARCHAR(200),
	@ContrasennaTemporal	VARCHAR(200),
	@EsTemporal				BIT
AS
BEGIN
	DECLARE @Consecutivo BIGINT
	
	SELECT  @Consecutivo = Id
	FROM	Cliente
	WHERE	Email = @Email
		AND Contrasenna = @ContrasennaTemporal
		AND Estado = 1

	IF @Consecutivo IS NOT NULL
	BEGIN
		UPDATE Cliente
		SET Contrasenna = @Contrasenna,
			EsTemporal = @EsTemporal
		WHERE Email = @Email
	END

	SELECT	U.Id,Email,U.Nombre,U.RolId,R.Rol 'NombreRol',Estado,EsTemporal
	  FROM	Cliente U
	  INNER JOIN Rol R ON U.RolId = R.Id
	  WHERE	Email = @Email
		AND Estado = 1
END
GO

CREATE PROCEDURE CambiarContrasennaColaborador
	@Email					VARCHAR(200),
	@Contrasenna			VARCHAR(200),
	@ContrasennaTemporal	VARCHAR(200),
	@EsTemporal				BIT
AS
BEGIN
	DECLARE @Consecutivo BIGINT
	
	SELECT  @Consecutivo = Id
	FROM	Colaborador
	WHERE	Email = @Email
		AND Contrasenna = @ContrasennaTemporal
		AND Estado = 1

	IF @Consecutivo IS NOT NULL
	BEGIN
		UPDATE Colaborador
		SET Contrasenna = @Contrasenna,
			EsTemporal = @EsTemporal
		WHERE Email = @Email
	END

	SELECT	U.Id,Email,U.Nombre,U.RolId,R.Rol 'NombreRol',Estado,EsTemporal
	  FROM	Colaborador U
	  INNER JOIN Rol R ON U.RolId = R.Id
	  WHERE	Email = @Email
		AND Estado = 1
END
