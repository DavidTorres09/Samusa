USE SamusaDBNew

CREATE TABLE Roles(
	ID INT IDENTITY(1,1) NOT NULL,
	Rol VARCHAR(50) NOT NULL,
	CONSTRAINT PK_Rol PRIMARY KEY(ID)
)
GO

INSERT INTO Roles (Rol) VALUES ('Usuario'), ('Administrador');
 

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

