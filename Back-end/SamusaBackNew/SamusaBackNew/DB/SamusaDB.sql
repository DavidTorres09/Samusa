USE SamusaDBNew
GO

CREATE TABLE Roles(
	ID INT IDENTITY(1,1) NOT NULL,
	Rol VARCHAR(50) NOT NULL,
	CONSTRAINT PK_Rol PRIMARY KEY(ID)
)
GO

CREATE TABLE Persona (
	DNI INT NOT NULL,
	Nombre VARCHAR(25) NOT NULL, 
	PrimerApellido VARCHAR(25) NOT NULL, 
	SegundoApellido VARCHAR(25) NULL,
	Telefono VARCHAR(25) NULL,
	Email VARCHAR(40) NOT NULL, 
	EsNacional BIT NOT NULL,
	Usuario VARCHAR(250) NOT NULL,
	Password VARCHAR(250) NOT NULL,
	IdRol INT NOT NULL,
	Foto VARBINARY(MAX),
	CONSTRAINT PK_Persona PRIMARY KEY (DNI),
	CONSTRAINT FK_Persona_Rol FOREIGN KEY (IdRol) REFERENCES Roles(ID)
)
GO

CREATE TABLE Cliente (
	IDCliente INT NOT NULL IDENTITY(1,1),
    Direccion VARCHAR (80) NOT NULL,
    DNI_Persona INT NOT NULL,
   	CONSTRAINT PK_Cliente PRIMARY KEY (IDCliente),
    CONSTRAINT FK_Cliente_Persona FOREIGN KEY (DNI_Persona) REFERENCES Persona(DNI) 
)
GO

CREATE TABLE Colaborador (
	IDColaborador INT NOT NULL IDENTITY(1,1),
	Direccion VARCHAR (80) NOT NULL,
    DNI_Persona INT NOT NULL,
    CONSTRAINT PK_Colaborador PRIMARY KEY (IDColaborador),
    CONSTRAINT FK_Colaborador_Persona FOREIGN KEY (DNI_Persona) REFERENCES Persona(DNI) 
)
GO

CREATE TABLE RevisionAlmacen(
	IDFormAlmacen INT NOT NULL IDENTITY(1,1),
	VIN VARCHAR(35) NOT NULL,
	Marca VARCHAR(20) NOT NULL,
    Modelo VARCHAR(20) NOT NULL,
    Extras VARCHAR(20) NOT NULL,
    Color VARCHAR(20) NOT NULL,
    CostoVehiculo DECIMAL(10,2) DEFAULT 0 NOT NULL,
    AnioVehiculo INT NOT NULL,
	DNI_Dueno INT NOT NULL,
    Placa INT NULL,
    EstadoOP VARCHAR(20) NOT NULL,
	CONSTRAINT PK_RevisionAlmacen PRIMARY KEY (IDFormAlmacen)
)
GO


CREATE TABLE RevisionContenedor (
	IDRevCont INT NOT NULL IDENTITY(1,1),
	PuertoOrigen VARCHAR(20) NOT NULL,
	PuertoDestino VARCHAR(20) NOT NULL,
    	Naviera VARCHAR(20) NOT NULL,
    	Transportista VARCHAR(20) NOT NULL,
	DNI_Dueno INT NOT NULL,
    	Estado VARCHAR(20) NOT NULL,
	CONSTRAINT PK_Contenedor PRIMARY KEY (IDRevCont)
)
GO

CREATE TABLE Importaciones (
	IDImpSeguimiento INT NOT NULL,
	ID_DNI INT NOT NULL,
    IDRevVehiculo INT NULL,
    IDRevContenedor INT NULL,
	FechaInicio DATETIME NOT NULL,
	FechaFinalizacion DATETIME NULL,
	FechaEsperada DATETIME NULL,
	Prioridad VARCHAR (80) NOT NULL,
    Descripcion VARCHAR (250) NULL,
	CONSTRAINT PK_IDImpSeguimiento PRIMARY KEY (IDImpSeguimiento),
    CONSTRAINT FK_Importaciones_Persona FOREIGN KEY (ID_DNI) REFERENCES Persona(DNI),
    CONSTRAINT FK_Importaciones_RevA FOREIGN KEY (IDRevVehiculo) REFERENCES RevisionAlmacen(IDFormAlmacen),
    CONSTRAINT FK_Importaciones_RevC FOREIGN KEY (IDRevContenedor) REFERENCES RevisionContenedor(IDRevCont)
)
GO

CREATE TABLE Exportaciones (
	IDExpSeguimiento INT NOT NULL,
	ID_DNI INT NOT NULL,
    IDRevVehiculo INT NULL,
    IDRevContenedor INT NULL,
	FechaInicio DATETIME NOT NULL,
	FechaFinalizacion DATETIME NOT NULL,
	FechaEsperada DATETIME NULL,
	Prioridad VARCHAR (80) NOT NULL,
    Descripcion VARCHAR (250) NULL
	CONSTRAINT PK_IDExpSeguimiento PRIMARY KEY (IDExpSeguimiento),
    CONSTRAINT FK_Exportaciones_Persona FOREIGN KEY (ID_DNI) REFERENCES Persona(DNI),
    CONSTRAINT FK_Exportaciones_RevA FOREIGN KEY (IDRevVehiculo) REFERENCES RevisionAlmacen(IDFormAlmacen),
    CONSTRAINT FK_Exportaciones_RevC FOREIGN KEY (IDRevContenedor) REFERENCES RevisionContenedor(IDRevCont)
)
GO

CREATE TABLE Paqueteria (
	IDPaqSeguimiento INT NOT NULL IDENTITY(1,1),
	ID_DNI INT NOT NULL,
	NumCasillero VARCHAR (80) NOT NULL,
	NumTracking VARCHAR (80) NOT NULL,
	TipoProducto VARCHAR (80) NOT NULL,
	DirectOrigen VARCHAR (200) NOT NULL,
	DirectDestino VARCHAR (200) NOT NULL,
	FechaRegistro DATETIME NOT NULL,
	FechaEsperada DATETIME NULL,
	CONSTRAINT PK_IDPaqSeguimiento PRIMARY KEY (IDPaqSeguimiento),
    CONSTRAINT FK_Paqueteria_Persona FOREIGN KEY (ID_DNI) REFERENCES Persona(DNI)
)
GO

CREATE TABLE Cotizaciones (
	IDCotizacion INT NOT NULL IDENTITY(1,1),
	ID_DNI INT NOT NULL,
	IDColaborador INT NOT NULL,
	TipoProducto VARCHAR(35) NOT NULL,
	Producto VARCHAR(20) NOT NULL,
	PorcentajeIMP INT NOT NULL,
	EnlaceRef VARCHAR(500) NOT NULL,
	FechaCreacion DATETIME NOT NULL,
	CONSTRAINT PK_IDCotizacion PRIMARY KEY (IDCotizacion), 
	CONSTRAINT FK_Cotizacion_Cliente FOREIGN KEY (ID_DNI) REFERENCES Persona(DNI),
	CONSTRAINT FK_Colaborador_Cotizacion FOREIGN KEY (IDColaborador) REFERENCES Colaborador(IDColaborador)
)
GO

CREATE TABLE Ticket (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,
    Estado VARCHAR(50),
    Prioridad VARCHAR(50),
    Descripcion VARCHAR(500),
    IDCliente INT,
    IDColaborador INT,
    FOREIGN KEY (IDCliente) REFERENCES Cliente(IDCliente),
    FOREIGN KEY (IDColaborador) REFERENCES Colaborador(IDColaborador)
)
GO


--------------------
--STORE PROCEDURES--
--------------------

--***********
--**CLIENTE**
--***********
CREATE PROCEDURE AgregarCliente (
		@dni INT,
		@nombre VARCHAR(25),
		@primerApellido VARCHAR(25),
		@segundoApellido VARCHAR(25) = NULL,
		@telefono VARCHAR(25) = NULL,
		@email VARCHAR(40),
		@esNacional BIT = 0,
		@usuario VARCHAR(250),
		@password VARCHAR(250),
		@direccion VARCHAR(80),
		@IdRol INT,
		@foto VARBINARY(max)
	)
	AS
	IF NOT EXISTS (SELECT 1 FROM Persona WHERE DNI = @dni)
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM Persona WHERE Email = @email)
		BEGIN
			IF NOT EXISTS(SELECT 1 FROM Persona WHERE Usuario = @usuario)
			BEGIN
				INSERT INTO Persona (DNI, Nombre, PrimerApellido, SegundoApellido, Telefono, Email, EsNacional, Usuario, Password, IdRol, Foto)
				VALUES (@dni, @nombre, @primerApellido, @segundoApellido, @telefono, @email, @esNacional, @usuario, @password, @IdRol, @Foto);
				INSERT INTO Cliente (Direccion, DNI_Persona)
				VALUES (@direccion, @dni);
			END
		END
	END
GO

CREATE PROCEDURE ModificarCliente(
    @dni INT,
	@nombre VARCHAR(25),
	@primerApellido VARCHAR(25),
	@segundoApellido VARCHAR(25) = NULL,
	@telefono VARCHAR(25) = NULL,
	@email VARCHAR(40),
	@esNacional BIT = 0,
	@usuario VARCHAR(250),
	@password VARCHAR(250),
	@direccion VARCHAR(80),
	@IdRol INT,
	@foto VARBINARY(max)
	)
AS
BEGIN
     IF EXISTS (SELECT 1 FROM Persona WHERE DNI = @dni)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM Persona WHERE Email = @email AND DNI <> @dni)
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Persona WHERE Usuario = @usuario AND DNI <> @dni)
            BEGIN
                UPDATE Cliente
                SET Direccion = @direccion
                WHERE DNI_Persona = @dni;

                UPDATE Persona
                SET Nombre = @nombre,
                    PrimerApellido = @primerApellido,
                    SegundoApellido = @segundoApellido,
                    Telefono = @telefono,
                    Email = @email,
                    EsNacional = @esNacional,
                    Usuario = @usuario,
                    Password = @password,
                    IdRol = @idRol,
                    Foto = @foto
                WHERE DNI = @dni;
            END
        END
    END
END
GO


CREATE PROCEDURE ObtenerClientes
AS
BEGIN
	SELECT
		C.IDCliente,
		P.DNI,
		P.Nombre,
		P.PrimerApellido,
		P.SegundoApellido,
		P.Telefono,
		P.Email,
		P.EsNacional,
		P.Usuario,
		P.Password,
		C.Direccion,
		R.Rol,
		P.Foto
	FROM
		Persona P
	JOIN
		Cliente C ON P.DNI = C.DNI_Persona
	JOIN Roles R ON P.IdRol = R.ID
END
GO

CREATE PROCEDURE ObtenerCliente (
    @id INT
)
AS
BEGIN
	SELECT
		C.IDCliente,
		P.DNI,
		P.Nombre,
		P.PrimerApellido,
		P.SegundoApellido,
		P.Telefono,
		P.Email,
		P.EsNacional,
		P.Usuario,
		P.Password,
		C.Direccion,
		R.Rol,
		P.Foto
	FROM
		Persona P
	JOIN
		Cliente C ON P.DNI = C.DNI_Persona
	JOIN 
		Roles R ON P.IdRol = R.ID
	WHERE
		C.IDCliente = @id;
END
GO

CREATE PROCEDURE EliminarCliente (
    @id INT
)
AS
BEGIN
    DECLARE @dni INT;
    
    SELECT @dni = DNI_Persona
    FROM Cliente
    WHERE IDCliente = @id;

    DELETE FROM Cliente
    WHERE IDCliente = @id;

    DELETE FROM Persona
    WHERE DNI = @dni;
END
GO


--***************
--**COLABORADOR**
--***************
CREATE PROCEDURE AgregarColaborador (
		@dni INT,
		@nombre VARCHAR(25),
		@primerApellido VARCHAR(25),
		@segundoApellido VARCHAR(25) = NULL,
		@telefono VARCHAR(25) = NULL,
		@email VARCHAR(40),
		@esNacional BIT = 0,
		@usuario VARCHAR(250),
		@password VARCHAR(250),
		@direccion VARCHAR(80),
		@IdRol INT,
		@foto VARBINARY(max)
	)
	AS
	IF NOT EXISTS (SELECT 1 FROM Persona WHERE DNI = @dni)
	BEGIN
		IF NOT EXISTS(SELECT 1 FROM Persona WHERE Email = @email)
		BEGIN
			IF NOT EXISTS(SELECT 1 FROM Persona WHERE Usuario = @usuario)
			BEGIN
				INSERT INTO Persona (DNI, Nombre, PrimerApellido, SegundoApellido, Telefono, Email, EsNacional, Usuario, Password, IdRol, Foto)
				VALUES (@dni, @nombre, @primerApellido, @segundoApellido, @telefono, @email, @esNacional, @usuario, @password, @IdRol, @Foto);
				INSERT INTO Colaborador (Direccion, DNI_Persona)
				VALUES (@direccion, @dni);
			END
		END
	END
GO

CREATE PROCEDURE ModificarColaborador(
    @dni INT,
	@nombre VARCHAR(25),
	@primerApellido VARCHAR(25),
	@segundoApellido VARCHAR(25) = NULL,
	@telefono VARCHAR(25) = NULL,
	@email VARCHAR(40),
	@esNacional BIT = 0,
	@usuario VARCHAR(250),
	@password VARCHAR(250),
	@direccion VARCHAR(80),
	@IdRol INT,
	@foto VARBINARY(max)
	)
AS
BEGIN
     IF EXISTS (SELECT 1 FROM Persona WHERE DNI = @dni)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM Persona WHERE Email = @email AND DNI <> @dni)
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM Persona WHERE Usuario = @usuario AND DNI <> @dni)
            BEGIN
                UPDATE Colaborador
                SET Direccion = @direccion
                WHERE DNI_Persona = @dni;

                UPDATE Persona
                SET Nombre = @nombre,
                    PrimerApellido = @primerApellido,
                    SegundoApellido = @segundoApellido,
                    Telefono = @telefono,
                    Email = @email,
                    EsNacional = @esNacional,
                    Usuario = @usuario,
                    Password = @password,
                    IdRol = @idRol,
                    Foto = @foto
                WHERE DNI = @dni;
            END
        END
    END
END
GO


CREATE PROCEDURE ObtenerColaboradores
AS
BEGIN
	SELECT
		C.IDColaborador,
		P.DNI,
		P.Nombre,
		P.PrimerApellido,
		P.SegundoApellido,
		P.Telefono,
		P.Email,
		P.EsNacional,
		P.Usuario,
		P.Password,
		C.Direccion,
		R.Rol,
		P.Foto
	FROM
		Persona P
	JOIN
		Colaborador C ON P.DNI = C.DNI_Persona
	JOIN Roles R ON P.IdRol = R.ID
END
GO

CREATE PROCEDURE ObtenerColaborador(
    @id INT
)
AS
BEGIN
	SELECT
		C.IDColaborador,
		P.DNI,
		P.Nombre,
		P.PrimerApellido,
		P.SegundoApellido,
		P.Telefono,
		P.Email,
		P.EsNacional,
		P.Usuario,
		P.Password,
		C.Direccion,
		R.Rol,
		P.Foto
	FROM
		Persona P
	JOIN
		Colaborador C ON P.DNI = C.DNI_Persona
	JOIN 
		Roles R ON P.IdRol = R.ID
	WHERE
		C.IDColaborador = @id;
END
GO

CREATE PROCEDURE EliminarColaborador (
    @id INT
)
AS
BEGIN
    DECLARE @dni INT;
    
    SELECT @dni = DNI_Persona
    FROM Colaborador
    WHERE IDColaborador = @id;

    DELETE FROM Colaborador
    WHERE IDColaborador = @id;

    DELETE FROM Persona
    WHERE DNI = @dni;
END
GO

--*****************
--**EXPORTACIONES**
--*****************
CREATE PROCEDURE AgregarExportacion (
		@IDExpSeguimiento INT,
		@ID_DNI INT,
		@IDRevVehiculo INT,
		@IDRevContenedor INT,
		@FechaInicio DATETIME,
		@FechaFinalizacion DATETIME,
		@FechaEsperada DATETIME,
		@Prioridad VARCHAR(80),
		@Descripcion VARCHAR(250)
	)
AS
IF NOT EXISTS (SELECT 1 FROM Exportaciones WHERE IDExpSeguimiento = @IDExpSeguimiento)
BEGIN
	INSERT INTO Exportaciones (IDExpSeguimiento, ID_DNI, IDRevVehiculo, IDRevContenedor, FechaInicio, FechaFinalizacion, FechaEsperada, Prioridad, Descripcion)
	VALUES (@IDExpSeguimiento, @ID_DNI, @IDRevVehiculo, @IDRevContenedor, @FechaInicio, @FechaFinalizacion, @FechaEsperada, @Prioridad, @Descripcion);
END
GO

CREATE PROCEDURE ModificarExportacion (
		@IDExpSeguimiento INT,
		@ID_DNI INT,
		@IDRevVehiculo INT,
		@IDRevContenedor INT,
		@FechaInicio DATETIME,
		@FechaFinalizacion DATETIME,
		@FechaEsperada DATETIME,
		@Prioridad VARCHAR(80),
		@Descripcion VARCHAR(250)
	)
AS
IF EXISTS (SELECT 1 FROM Exportaciones WHERE IDExpSeguimiento = @IDExpSeguimiento)
BEGIN
	UPDATE Exportaciones
	SET ID_DNI = @ID_DNI,
		IDRevVehiculo = @IDRevVehiculo,
		IDRevContenedor = @IDRevContenedor,
		FechaInicio = @FechaInicio,
		FechaFinalizacion = @FechaFinalizacion,
		FechaEsperada = @FechaEsperada,
		Prioridad = @Prioridad,
		Descripcion = @Descripcion
	WHERE IDExpSeguimiento = @IDExpSeguimiento;
END
GO

CREATE PROCEDURE ObtenerExportaciones
AS
BEGIN
	SELECT
		E.IDExpSeguimiento,
		P.DNI,
		E.IDRevVehiculo,
		E.IDRevContenedor,
		E.FechaInicio,
		E.FechaFinalizacion,
		E.FechaEsperada,
		E.Prioridad,
		E.Descripcion
	FROM
		Exportaciones E
	JOIN
		Persona P ON E.ID_DNI = P.DNI
END
GO

CREATE PROCEDURE ObtenerExportacion (
	@id INT
)
AS
BEGIN
	SELECT
		E.IDExpSeguimiento,
		P.DNI,
		E.IDRevVehiculo,
		E.IDRevContenedor,
		E.FechaInicio,
		E.FechaFinalizacion,
		E.FechaEsperada,
		E.Prioridad,
		E.Descripcion
	FROM
		Exportaciones E
	JOIN
		Persona P ON E.ID_DNI = P.DNI
	WHERE
		E.IDExpSeguimiento = @id;
END
GO

CREATE PROCEDURE EliminarExportacion (
	@id INT
)
AS
BEGIN
	DELETE FROM Exportaciones
	WHERE IDExpSeguimiento = @id;
END
GO

--*****************
--**IMPORTACIONES**
--*****************
CREATE PROCEDURE AgregarImportacion (
		@IDImpSeguimiento INT,
		@ID_DNI INT,
		@IDRevVehiculo INT,
		@IDRevContenedor INT,
		@FechaInicio DATETIME,
		@FechaFinalizacion DATETIME,
		@FechaEsperada DATETIME,
		@Prioridad VARCHAR(80),
		@Descripcion VARCHAR(250)
	)
AS
IF NOT EXISTS (SELECT 1 FROM Importaciones WHERE IDImpSeguimiento = @IDImpSeguimiento)
BEGIN
	INSERT INTO Importaciones (IDImpSeguimiento, ID_DNI, IDRevVehiculo, IDRevContenedor, FechaInicio, FechaFinalizacion, FechaEsperada, Prioridad, Descripcion)
	VALUES (@IDImpSeguimiento, @ID_DNI, @IDRevVehiculo, @IDRevContenedor, @FechaInicio, @FechaFinalizacion, @FechaEsperada, @Prioridad, @Descripcion);
END
GO

CREATE PROCEDURE ModificarImportacion (
		@IDImpSeguimiento INT,
		@ID_DNI INT,
		@IDRevVehiculo INT,
		@IDRevContenedor INT,
		@FechaInicio DATETIME,
		@FechaFinalizacion DATETIME,
		@FechaEsperada DATETIME,
		@Prioridad VARCHAR(80),
		@Descripcion VARCHAR(250)
	)
AS
IF EXISTS (SELECT 1 FROM Importaciones WHERE IDImpSeguimiento = @IDImpSeguimiento)
BEGIN
	UPDATE Importaciones
	SET ID_DNI = @ID_DNI,
		IDRevVehiculo = @IDRevVehiculo,
		IDRevContenedor = @IDRevContenedor,
		FechaInicio = @FechaInicio,
		FechaFinalizacion = @FechaFinalizacion,
		FechaEsperada = @FechaEsperada,
		Prioridad = @Prioridad,
		Descripcion = @Descripcion
	WHERE IDImpSeguimiento = @IDImpSeguimiento;
END
GO

CREATE PROCEDURE ObtenerImportaciones
AS
BEGIN
	SELECT
		I.IDImpSeguimiento,
		P.DNI,
		I.IDRevVehiculo,
		I.IDRevContenedor,
		I.FechaInicio,
		I.FechaFinalizacion,
		I.FechaEsperada,
		I.Prioridad,
		I.Descripcion
	FROM
		Importaciones I
	JOIN
		Persona P ON I.ID_DNI = P.DNI
END
GO

CREATE PROCEDURE ObtenerImportacion (
	@id INT
)
AS
BEGIN
	SELECT
		I.IDImpSeguimiento,
		P.DNI,
		I.IDRevVehiculo,
		I.IDRevContenedor,
		I.FechaInicio,
		I.FechaFinalizacion,
		I.FechaEsperada,
		I.Prioridad,
		I.Descripcion
	FROM
		Importaciones I
	JOIN
		Persona P ON I.ID_DNI = P.DNI
	WHERE
		I.IDImpSeguimiento = @id;
END
GO

CREATE PROCEDURE EliminarImportacion (
	@id INT
)
AS
BEGIN
	DELETE FROM Importaciones
	WHERE IDImpSeguimiento = @id;
END
GO

--***************
--**PAQUETERIA**
--***************
CREATE PROCEDURE AgregarPaqueteria (
		@IDPaqSeguimiento INT,
		@ID_DNI INT,
		@NumCasillero VARCHAR(80),
		@NumTracking VARCHAR(80),
		@TipoProducto VARCHAR(80),
		@DirectOrigen VARCHAR(200),
		@DirectDestino VARCHAR(200),
		@FechaRegistro DATETIME,
		@FechaEsperada DATETIME
	)
AS
IF NOT EXISTS (SELECT 1 FROM Paqueteria WHERE IDPaqSeguimiento = @IDPaqSeguimiento)
BEGIN
	INSERT INTO Paqueteria (IDPaqSeguimiento, ID_DNI, NumCasillero, NumTracking, TipoProducto, DirectOrigen, DirectDestino, FechaRegistro, FechaEsperada)
	VALUES (@IDPaqSeguimiento, @ID_DNI, @NumCasillero, @NumTracking, @TipoProducto, @DirectOrigen, @DirectDestino, @FechaRegistro, @FechaEsperada);
END
GO

CREATE PROCEDURE ModificarPaqueteria (
		@IDPaqSeguimiento INT,
		@ID_DNI INT,
		@NumCasillero VARCHAR(80),
		@NumTracking VARCHAR(80),
		@TipoProducto VARCHAR(80),
		@DirectOrigen VARCHAR(200),
		@DirectDestino VARCHAR(200),
		@FechaRegistro DATETIME,
		@FechaEsperada DATETIME
	)
AS
IF EXISTS (SELECT 1 FROM Paqueteria WHERE IDPaqSeguimiento = @IDPaqSeguimiento)
BEGIN
	UPDATE Paqueteria
	SET ID_DNI = @ID_DNI,
		NumCasillero = @NumCasillero,
		NumTracking = @NumTracking,
		TipoProducto = @TipoProducto,
		DirectOrigen = @DirectOrigen,
		DirectDestino = @DirectDestino,
		FechaRegistro = @FechaRegistro,
		FechaEsperada = @FechaEsperada
	WHERE IDPaqSeguimiento = @IDPaqSeguimiento;
END
GO

CREATE PROCEDURE ObtenerPaqueterias
AS
BEGIN
	SELECT
		P.IDPaqSeguimiento,
		P.ID_DNI,
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
		Persona Pe ON P.ID_DNI = PE.DNI
END
GO

CREATE PROCEDURE ObtenerPaqueteria (
	@id INT
)
AS
BEGIN
	SELECT
		P.IDPaqSeguimiento,
		P.ID_DNI,
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
		P.IDPaqSeguimiento = @id;
END
GO

CREATE PROCEDURE EliminarPaqueteria (
	@id INT
)
AS
BEGIN
	DELETE FROM Paqueteria
	WHERE IDPaqSeguimiento = @id;
END
GO

--***************
--**COTIZACIONES**
--***************

CREATE PROCEDURE AgregarCotizacion (
		@IDCotizacion INT,
		@ID_DNI INT,
		@IDColaborador INT,
		@TipoProducto VARCHAR(35),
		@Producto VARCHAR(20),
		@PorcentajeIMP INT,
		@EnlaceRef VARCHAR(500),
		@FechaCreacion DATETIME
	)
AS
IF NOT EXISTS (SELECT 1 FROM Cotizaciones WHERE IDCotizacion = @IDCotizacion)
BEGIN
	INSERT INTO Cotizaciones (IDCotizacion, ID_DNI, IDColaborador, TipoProducto, Producto, PorcentajeIMP, EnlaceRef, FechaCreacion)
	VALUES (@IDCotizacion, @ID_DNI, @IDColaborador, @TipoProducto, @Producto, @PorcentajeIMP, @EnlaceRef, @FechaCreacion);
END
GO

CREATE PROCEDURE ModificarCotizacion (
		@IDCotizacion INT,
		@ID_DNI INT,
		@IDColaborador INT,
		@TipoProducto VARCHAR(35),
		@Producto VARCHAR(20),
		@PorcentajeIMP INT,
		@EnlaceRef VARCHAR(500),
		@FechaCreacion DATETIME
	)
AS
IF EXISTS (SELECT 1 FROM Cotizaciones WHERE IDCotizacion = @IDCotizacion)
BEGIN
	UPDATE Cotizaciones
	SET ID_DNI = @ID_DNI,
		IDColaborador = @IDColaborador,
		TipoProducto = @TipoProducto,
		Producto = @Producto,
		PorcentajeIMP = @PorcentajeIMP,
		EnlaceRef = @EnlaceRef,
		FechaCreacion = @FechaCreacion
	WHERE IDCotizacion = @IDCotizacion;
END
GO

CREATE PROCEDURE ObtenerCotizaciones
AS
BEGIN
	SELECT
		C.IDCotizacion,
		P.DNI,
		C.IDColaborador,
		C.TipoProducto,
		C.Producto,
		C.PorcentajeIMP,
		C.EnlaceRef,
		C.FechaCreacion
	FROM
		Cotizaciones C
	JOIN
		Persona P ON C.ID_DNI = P.DNI
END
GO

CREATE PROCEDURE ObtenerCotizacion (
	@id INT
)
AS
BEGIN
	SELECT
		C.IDCotizacion,
		P.DNI,
		C.IDColaborador,
		C.TipoProducto,
		C.Producto,
		C.PorcentajeIMP,
		C.EnlaceRef,
		C.FechaCreacion
	FROM
		Cotizaciones C
	JOIN
		Persona P ON C.ID_DNI = P.DNI
	WHERE
		C.IDCotizacion = @id;
END
GO

CREATE PROCEDURE EliminarCotizacion (
	@id INT
)
AS
BEGIN
	DELETE FROM Cotizaciones
	WHERE IDCotizacion = @id;
END
GO

--************************
--**REVISION CONTENERDOR**
--************************
CREATE PROCEDURE AgregarRevisionContenedor (
		@IDRevCont INT,
		@PuertoOrigen VARCHAR(20),
		@PuertoDestino VARCHAR(20),
		@Naviera VARCHAR(20),
		@Transportista VARCHAR(20),
		@DNI_Dueno INT,
		@Estado VARCHAR(20)
)
AS
IF NOT EXISTS (SELECT 1 FROM RevisionContenedor WHERE IDRevCont = @IDRevCont)
BEGIN
	INSERT INTO RevisionContenedor (IDRevCont, PuertoOrigen, PuertoDestino, Naviera, Transportista, DNI_Dueno, Estado)
	VALUES (@IDRevCont, @PuertoOrigen, @PuertoDestino, @Naviera, @Transportista, @DNI_Dueno, @Estado);
END
GO

CREATE PROCEDURE ModificarRevisionContenedor (
	@IDRevCont INT,
	@PuertoOrigen VARCHAR(20),
	@PuertoDestino VARCHAR(20),
	@Naviera VARCHAR(20),
	@Transportista VARCHAR(20),
	@DNI_Dueno INT,
	@Estado VARCHAR(20)
)
AS
IF EXISTS (SELECT 1 FROM RevisionContenedor WHERE IDRevCont = @IDRevCont)
BEGIN
	UPDATE RevisionContenedor
	SET PuertoOrigen = @PuertoOrigen,
		PuertoDestino = @PuertoDestino,
		Naviera = @Naviera,
		Transportista = @Transportista,
		DNI_Dueno = @DNI_Dueno,
		Estado = @Estado
	WHERE IDRevCont = @IDRevCont;
END
GO

CREATE PROCEDURE ObtenerRevisionContenedores
AS
BEGIN
	SELECT
		RC.IDRevCont,
		RC.PuertoOrigen,
		RC.PuertoDestino,
		RC.Naviera,
		RC.Transportista,
		RC.DNI_Dueno,
		RC.Estado
	FROM
		RevisionContenedor RC
	JOIN
		Persona P ON RC.DNI_Dueno = P.DNI
END
GO

CREATE PROCEDURE ObtenerRevisionContenedor (
	@id INT
)
AS
BEGIN
	SELECT
		RC.IDRevCont,
		RC.PuertoOrigen,
		RC.PuertoDestino,
		RC.Naviera,
		RC.Transportista,
		RC.DNI_Dueno,
		RC.Estado
	FROM
		RevisionContenedor RC
	JOIN
		Persona P ON RC.DNI_Dueno = P.DNI
	WHERE
		RC.IDRevCont = @id;
END
GO

CREATE PROCEDURE EliminarRevisionContenedor (
	@id INT
)
AS
BEGIN
	DELETE FROM RevisionContenedor
	WHERE IDRevCont = @id;
END
GO

--*********************
--**REVISION VEHICULO**
--*********************

CREATE PROCEDURE AgregarRevisionVehiculo (
	@IDFormAlmacen INT,
	@VIN VARCHAR(35),
	@Marca VARCHAR(20),
	@Modelo VARCHAR(20),
	@Extras VARCHAR(20),
	@Color VARCHAR(20),
	@CostoVehiculo DECIMAL(10,2),
	@AnioVehiculo INT,
	@DNI_Dueno INT,
	@Placa INT,
	@EstadoOP VARCHAR(20)
)
AS
IF NOT EXISTS (SELECT 1 FROM RevisionAlmacen WHERE IDFormAlmacen = @IDFormAlmacen)
BEGIN
	INSERT INTO RevisionAlmacen (IDFormAlmacen, VIN, Marca, Modelo, Extras, Color, CostoVehiculo, AnioVehiculo, DNI_Dueno, Placa, EstadoOP)
	VALUES (@IDFormAlmacen, @VIN, @Marca, @Modelo, @Extras, @Color, @CostoVehiculo, @AnioVehiculo, @DNI_Dueno, @Placa, @EstadoOP);
END
GO

CREATE PROCEDURE ModificarRevisionVehiculo (
	@IDFormAlmacen INT,
	@VIN VARCHAR(35),
	@Marca VARCHAR(20),
	@Modelo VARCHAR(20),
	@Extras VARCHAR(20),
	@Color VARCHAR(20),
	@CostoVehiculo DECIMAL(10,2),
	@AnioVehiculo INT,
	@DNI_Dueno INT,
	@Placa INT,
	@EstadoOP VARCHAR(20)
)
AS
IF EXISTS (SELECT 1 FROM RevisionAlmacen WHERE IDFormAlmacen = @IDFormAlmacen)
BEGIN
	UPDATE RevisionAlmacen
	SET VIN = @VIN,
		Marca = @Marca,
		Modelo = @Modelo,
		Extras = @Extras,
		Color = @Color,
		CostoVehiculo = @CostoVehiculo,
		AnioVehiculo = @AnioVehiculo,
		DNI_Dueno = @DNI_Dueno,
		Placa = @Placa,
		EstadoOP = @EstadoOP
	WHERE IDFormAlmacen = @IDFormAlmacen;
END
GO

CREATE PROCEDURE ObtenerRevisionVehiculos
AS
BEGIN
	SELECT
		RV.IDFormAlmacen,
		RV.VIN,
		RV.Marca,
		RV.Modelo,
		RV.Extras,
		RV.Color,
		RV.CostoVehiculo,
		RV.AnioVehiculo,
		RV.DNI_Dueno,
		RV.Placa,
		RV.EstadoOP
	FROM
		RevisionAlmacen RV
	JOIN
		Persona P ON RV.DNI_Dueno = P.DNI
END
GO

CREATE PROCEDURE ObtenerRevisionVehiculo (
	@id INT
)
AS
BEGIN
	SELECT
		RV.IDFormAlmacen,
		RV.VIN,
		RV.Marca,
		RV.Modelo,
		RV.Extras,
		RV.Color,
		RV.CostoVehiculo,
		RV.AnioVehiculo,
		RV.DNI_Dueno,
		RV.Placa,
		RV.EstadoOP
	FROM
		RevisionAlmacen RV
	JOIN
		Persona P ON RV.DNI_Dueno = P.DNI
	WHERE
		RV.IDFormAlmacen = @id;
END
GO

CREATE PROCEDURE EliminarRevisionVehiculo (
	@id INT
)
AS
BEGIN
	DELETE FROM RevisionAlmacen
	WHERE IDFormAlmacen = @id;
END
GO

--**********
--**ROLES**
--**********
CREATE PROCEDURE AgregarRol (
	@Rol VARCHAR(50)
)
AS
IF NOT EXISTS (SELECT 1 FROM Roles WHERE Rol = @Rol)
BEGIN
	INSERT INTO Roles (Rol)
	VALUES (@Rol);
END
GO

CREATE PROCEDURE ModificarRol (
	@ID INT,
	@Rol VARCHAR(50)
)
AS
IF EXISTS (SELECT 1 FROM Roles WHERE ID = @ID)
BEGIN
	UPDATE Roles
	SET Rol = @Rol
	WHERE ID = @ID;
END
GO

CREATE PROCEDURE ObtenerRoles
AS
BEGIN
	SELECT
		ID,
		Rol
	FROM
		Roles
END
GO

CREATE PROCEDURE ObtenerRol (
	@id INT
)
AS
	BEGIN
	SELECT
		ID,
		Rol
	FROM
		Roles
	WHERE
		ID = @id;
END
GO

CREATE PROCEDURE EliminarRol (
	@id INT
)
AS
BEGIN
	DELETE FROM Roles
	WHERE ID = @id;
END
GO

--**********
--**TICKET**
--**********

CREATE PROCEDURE AgregarTicket (
	@Estado VARCHAR(50),
	@Prioridad VARCHAR(50),
	@Descripcion VARCHAR(500),
	@IDCliente INT,
	@IDColaborador INT
)
AS
IF NOT EXISTS (SELECT 1 FROM Ticket WHERE Estado = @Estado AND Prioridad = @Prioridad AND Descripcion = @Descripcion AND IDCliente = @IDCliente AND IDColaborador = @IDColaborador)
BEGIN
	INSERT INTO Ticket (Estado, Prioridad, Descripcion, IDCliente, IDColaborador)
	VALUES (@Estado, @Prioridad, @Descripcion, @IDCliente, @IDColaborador);
END
GO

CREATE PROCEDURE ModificarTicket (
	@TicketID INT,
	@Estado VARCHAR(50),
	@Prioridad VARCHAR(50),
	@Descripcion VARCHAR(500),
	@IDCliente INT,
	@IDColaborador INT
)
AS
IF EXISTS (SELECT 1 FROM Ticket WHERE TicketID = @TicketID)
BEGIN
	UPDATE Ticket
	SET Estado = @Estado,
		Prioridad = @Prioridad,
		Descripcion = @Descripcion,
		IDCliente = @IDCliente,
		IDColaborador = @IDColaborador
	WHERE TicketID = @TicketID;
END
GO

CREATE PROCEDURE ObtenerTickets
AS
BEGIN
	SELECT
		T.TicketID,
		T.Estado,
		T.Prioridad,
		T.Descripcion,
		T.IDCliente,
		T.IDColaborador
	FROM
		Ticket T
	JOIN
		Cliente C ON T.IDCliente = C.IDCliente
	JOIN
		Colaborador CO ON T.IDColaborador = CO.IDColaborador
END
GO

CREATE PROCEDURE ObtenerTicket (
	@id INT
)
AS
BEGIN
	SELECT
		T.TicketID,
		T.Estado,
		T.Prioridad,
		T.Descripcion,
		T.IDCliente,
		T.IDColaborador
	FROM
		Ticket T
	JOIN
		Cliente C ON T.IDCliente = C.IDCliente
	JOIN
		Colaborador CO ON T.IDColaborador = CO.IDColaborador
	WHERE
		T.TicketID = @id;
END
GO

CREATE PROCEDURE EliminarTicket (
	@id INT
)
AS
BEGIN
	DELETE FROM Ticket
	WHERE TicketID = @id;
END
GO

INSERT INTO Roles (Rol) VALUES ('Usuario'), ('Administrador') GO
 
