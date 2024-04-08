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
    AnnoVehiculo	INT NOT NULL,
	DniDuenno		VARCHAR(250) NOT NULL,
    Placa			INT NULL,
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
	FechaFinalizacion		DATETIME NOT NULL,
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
	ClienteId			INT,
	DniCliente			VARCHAR(200) NOT NULL,
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
    ClienteId		INT,
    ColaboradorId	INT,
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
	Url					VARCHAR(500)
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
ADD	CONSTRAINT FK_Cotizacion_Cliente FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
	CONSTRAINT FK_Cotizacion_Colaborador FOREIGN KEY (ColaboradorId) REFERENCES Colaborador(Id);
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

CREATE PROCEDURE ModificarCliente(
	@Id				INT,
	@Direccion		VARCHAR(250),
    @Dni			VARCHAR,
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
     IF EXISTS (SELECT 1 FROM Cliente WHERE id = @Id)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Email = @Email  AND DNI <> @Dni)
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Cliente WHERE Usuario = @Usuario AND DNI <> @Dni)
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
    @Id				INT,
	@Direccion		VARCHAR(250),
    @Dni			INT,
    @Nombre			VARCHAR(250),
    @Telefono		VARCHAR(25) = NULL,
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
    @Dni			INT,
    @Nombre			VARCHAR(250),
    @Telefono		VARCHAR(25),
    @Email			VARCHAR(40),
    @EsNacional		BIT = 0,
    @Usuario		VARCHAR(250),
    @Contrasenna	VARCHAR(250),
    @RolId			INT,
    @Foto			VARCHAR(500)
	)
AS
BEGIN
     IF EXISTS (SELECT 1 FROM Colaborador WHERE id = @Id)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Email = @Email  AND DNI <> @Dni)
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Colaborador WHERE Usuario = @Usuario AND DNI <> @Dni)
            BEGIN
                UPDATE Cliente
                SET Direccion = @direccion,
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
		R.Rol,
		C.Foto
	FROM
		Colaborador C
	JOIN Roles R ON C.RolId = R.Id
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
		R.Rol,
		C.Foto
	FROM
		Colaborador C
	JOIN 
		Roles R ON C.RolId = R.Id
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
	@Id					INT,
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
	@FechaInicio		DATETIME,
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
		FechaInicio = @FechaInicio,
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
		E.ExpSeguimientoId,
		C.Dni,
		E.RevVehiculoId,
		E.RevContenedorId,
		E.FechaInicio,
		E.FechaFinalizacion,
		E.FechaEsperada,
		E.Prioridad,
		E.Descripcion
	FROM
		Exportacion E
	JOIN
		Cliente C ON E.ClienteId =C.Dni
END
GO

CREATE PROCEDURE ObtenerExportacion (
	@Id INT
)
AS
BEGIN
	SELECT
		E.ExpSeguimientoId,
		C.Dni,
		E.RevVehiculoId,
		E.RevContenedorId,
		E.FechaInicio,
		E.FechaFinalizacion,
		E.FechaEsperada,
		E.Prioridad,
		E.Descripcion
	FROM
		Exportacion E
	JOIN
		CLiente C ON E.ClienteId = C.Dni
	WHERE
		E.ExpSeguimientoId = @Id;
END
GO

CREATE PROCEDURE EliminarExportacion (
	@Id INT
)
AS
BEGIN
	DELETE FROM Exportacion
	WHERE ExpSeguimientoId = @Id;
END
GO

CREATE PROCEDURE AgregarImportacion (
	@Id					INT,
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
	@FechaInicio		DATETIME,
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
		FechaInicio = @FechaInicio,
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
		I.ImpSeguimientoId,
		C.Dni,
		I.RevVehiculoId,
		I.RevContenedorId,
		I.FechaInicio,
		I.FechaFinalizacion,
		I.FechaEsperada,
		I.Prioridad,
		I.Descripcion
	FROM
		Importacion I
	JOIN
		Cliente C ON I.ClienteId = C.Dni
END
GO

CREATE PROCEDURE ObtenerImportacion (
	@id INT
)
AS
BEGIN
	SELECT
		I.ImpSeguimientoId,
		C.Dni,
		I.RevVehiculoId,
		I.RevContenedorId,
		I.FechaInicio,
		I.FechaFinalizacion,
		I.FechaEsperada,
		I.Prioridad,
		I.Descripcion
	FROM
		Importacion I
	JOIN
		Cliente C ON I.ClienteId = C.Dni
	WHERE
		I.ImpSeguimientoId = @id;
END
GO

CREATE PROCEDURE EliminarImportacion (
	@id INT
)
AS
BEGIN
	DELETE FROM Importacion
	WHERE ImpSeguimientoId = @id;
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
		@FechaRegistro	DATETIME,
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
		FechaRegistro = @FechaRegistro,
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
	JOIN
		Cliente Pe ON P.ClienteId = P.Id
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
	@ClienteId		INT,
	@DniCliente		VARCHAR(25),
	@TipoProducto	VARCHAR(50),
	@Producto		VARCHAR(20),
	@PorcentajeIMP	INT,
	@EnlaceRef		VARCHAR(500),
	@FechaCreacion	DATETIME
)
AS
	INSERT INTO Cotizacion (ColaboradorId, ClienteId, DniCliente, TipoProducto, Producto, PorcentajeIMP, EnlaceRef, FechaCreacion)
	VALUES ( @ColaboradorId, @ClienteId,@DniCliente, @TipoProducto, @Producto, @PorcentajeIMP, @EnlaceRef, @FechaCreacion);
GO

CREATE PROCEDURE ModificarCotizacion (
		@Id				INT,
		@ColaboradorId	INT,
		@ClienteId		INT,
		@DniCliente		VARCHAR(25),
		@TipoProducto	VARCHAR(50),
		@Producto		VARCHAR(20),
		@PorcentajeIMP	INT,
		@EnlaceRef		VARCHAR(500),
		@FechaCreacion	DATETIME
	)
AS
	UPDATE Cotizacion
	SET ColaboradorId = @ColaboradorId,
		ClienteId = @ClienteId,
		DniCliente = @DniCliente,
		TipoProducto = @TipoProducto,
		Producto = @Producto,
		PorcentajeIMP = @PorcentajeIMP,
		EnlaceRef = @EnlaceRef,
		FechaCreacion = @FechaCreacion
	WHERE Id = @Id;
GO

CREATE PROCEDURE ObtenerCotizaciones
AS
BEGIN
	SELECT
		C.Id,
		C.ColaboradorId,
		C.ClienteId,
		C.DniCliente,
		C.TipoProducto,
		C.Producto,
		C.PorcentajeIMP,
		C.EnlaceRef,
		C.FechaCreacion
	FROM
		Cotizacion C
	JOIN
		Cliente Ce ON C.ClienteId = Ce.Id
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
		C.ClienteId,
		C.DniCliente,
		C.TipoProducto,
		C.Producto,
		C.PorcentajeIMP,
		C.EnlaceRef,
		C.FechaCreacion
	FROM
		Cotizacion C
	JOIN
		Cliente Ce ON C.ClienteId = CE.Id
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
	@AnnoVehiculo	INT,
	@DniDuenno		INT,
	@Placa			INT,
	@EstadoOP		VARCHAR(20)
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
	@AnnoVehiculo	INT,
	@DniDuenno		INT,
	@Placa			INT,
	@EstadoOP		VARCHAR(20)
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
