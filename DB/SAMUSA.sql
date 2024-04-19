CREATE DATABASE [SAMUSADB]

USE SAMUSADB

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
	CONSTRAINT PK_Persona PRIMARY KEY (DNI)
)

CREATE TABLE Cliente (
	IDCliente INT NOT NULL IDENTITY(1,1),
    	Direccion VARCHAR (80) NOT NULL,
    	DNI_Persona INT NOT NULL,
   	CONSTRAINT PK_Cliente PRIMARY KEY (IDCliente),
    	CONSTRAINT FK_Cliente_Persona FOREIGN KEY (DNI_Persona) REFERENCES Persona(DNI) 
)

CREATE TABLE Colaborador (
	IDColaborador INT NOT NULL IDENTITY(1,1),
	FechaIngreso DATETIME NOT NULL,
    	DNI_Persona INT NOT NULL,
    	CONSTRAINT PK_Colaborador PRIMARY KEY (IDColaborador),
    	CONSTRAINT FK_Colaborador_Persona FOREIGN KEY (DNI_Persona) REFERENCES Persona(DNI) 
)

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
    Placa INT NULL, -- El veh�culo puede a�n no tener placa
    EstadoOP VARCHAR(20) NOT NULL,
	CONSTRAINT PK_RevisionAlmacen PRIMARY KEY (IDFormAlmacen)
)


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

CREATE TABLE Ticket (
    TicketID INT IDENTITY(1,1) PRIMARY KEY,
    Estado VARCHAR(50),
    Prioridad VARCHAR(50),
    Descripcion VARCHAR(500),
    IDCliente INT,
    IDColaborador INT,
    FOREIGN KEY (IDCliente) REFERENCES Cliente(IDCliente),
    FOREIGN KEY (IDColaborador) REFERENCES Colaborador(IDColaborador)
);


-- Add Client
	CREATE PROCEDURE usp_addClient (
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
		@IdRol INT
	)
	AS
	BEGIN
		-- Insertar en Persona
		INSERT INTO Persona (DNI, Nombre, PrimerApellido, SegundoApellido, Telefono, Email, EsNacional, Usuario, Password, IdRol)
		VALUES (@dni, @nombre, @primerApellido, @segundoApellido, @telefono, @email, @esNacional, @usuario, @password, @IdRol);

		-- Insertar en Cliente
		INSERT INTO Cliente ( Direccion, DNI_Persona)
		VALUES ( @direccion, @dni);
	END;
-- ModifyClient
	CREATE PROCEDURE usp_modifyClient (
		@dni INT,
		@newDireccion VARCHAR(80),
		@newNombre VARCHAR(25),
		@newPrimerApellido VARCHAR(25),
		@newSegundoApellido VARCHAR(25),
		@newTelefono VARCHAR(25),
		@newEmail VARCHAR(40),
		@newEsNacional BIT,
		@newUsuario VARCHAR(25),
		@newPassword VARCHAR(100),
		@newIdRol INT
	)
	AS
	BEGIN
		-- Update Cliente
		UPDATE Cliente
		SET Direccion = @newDireccion
		WHERE DNI_Persona = @dni;

		-- Update Persona
		UPDATE Persona
		SET Nombre = @newNombre,
			PrimerApellido = @newPrimerApellido,
			SegundoApellido = @newSegundoApellido,
			Telefono = @newTelefono,
			Email = @newEmail,
			EsNacional = @newEsNacional,
			Usuario = @newUsuario,
			Password = @newPassword,
			IdRol = @newIdRol

		WHERE DNI = @dni;
	END;

select * from Cliente;
-- GetClient --
	CREATE PROCEDURE usp_getClients
	AS
	BEGIN
		SELECT
			P.DNI,
			P.Nombre,
			P.PrimerApellido,
			P.SegundoApellido,
			P.Telefono,
			P.Email,
			P.EsNacional,
			P.Usuario,
		P.Password,
		p.IdRol,
        C.Direccion
    FROM
        Persona P
    JOIN
        Cliente C ON P.DNI = C.DNI_Persona
END;
-- To get only one client --
CREATE PROCEDURE usp_getSingleClient (
    @dni INT
)
AS
BEGIN
    SELECT
        P.DNI,
        P.Nombre,
        P.PrimerApellido,
        P.SegundoApellido,
        P.Telefono,
        P.Email,
        P.EsNacional,
        P.Usuario,
		P.Password,
		P.IdRol,
        C.Direccion
    FROM
        Persona P
    INNER JOIN
        Cliente C ON P.DNI = C.DNI_Persona
    WHERE
        P.DNI = @dni;
END;
-- Delete Client
CREATE PROCEDURE usp_deleteClients (
    @dni INT
)
AS
BEGIN
    -- Verificar si ya se ha ejecutado en este nivel
    IF (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE session_id = @@SPID) > 1
    BEGIN
        RETURN; -- Evitar llamadas recursivas
    END

    -- Eliminar en Cliente
    DELETE FROM Cliente
    WHERE DNI_Persona = @dni;

    -- Eliminar en Persona
    DELETE FROM Persona
    WHERE DNI = @dni;
END;
------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------
-- Add Colaborador
CREATE PROCEDURE usp_addColaborador (
		@dni INT,
		@nombre VARCHAR(25),
		@primerApellido VARCHAR(25),
		@segundoApellido VARCHAR(25) = NULL,
		@telefono VARCHAR(25) = NULL,
		@email VARCHAR(40),
		@esNacional BIT = 0,
		@usuario VARCHAR(250),
		@password VARCHAR(250),
		@fechaIng DATETIME,
		@IdRol INT
	)
	AS
	BEGIN
		-- Insertar en Persona
		INSERT INTO Persona (DNI, Nombre, PrimerApellido, SegundoApellido, Telefono, Email, EsNacional, Usuario, Password, IdRol)
		VALUES (@dni, @nombre, @primerApellido, @segundoApellido, @telefono, @email, @esNacional, @usuario, @password, @IdRol);

		-- Insertar en Colaborador
		INSERT INTO Colaborador (FechaIngreso, DNI_Persona)
		VALUES (@fechaIng, @dni);
	END;
-------------------
-- Modify Colaborador
CREATE PROCEDURE usp_modifyColaborador (
		@dni INT,
		@newfechaIng VARCHAR(80),
		@newNombre VARCHAR(25),
		@newPrimerApellido VARCHAR(25),
		@newSegundoApellido VARCHAR(25),
		@newTelefono VARCHAR(25),
		@newEmail VARCHAR(40),
		@newEsNacional BIT,
		@newUsuario VARCHAR(25),
		@newPassword VARCHAR(100),
		@newIdRol INT
	)
	AS
	BEGIN
		-- Update Colaborador
		UPDATE Colaborador
		SET FechaIngreso = @newfechaIng
		WHERE DNI_Persona = @dni;

		-- Update Persona
		UPDATE Persona
		SET Nombre = @newNombre,
			PrimerApellido = @newPrimerApellido,
			SegundoApellido = @newSegundoApellido,
			Telefono = @newTelefono,
			Email = @newEmail,
			EsNacional = @newEsNacional,
			Usuario = @newUsuario,
			Password = @newPassword,
			IdRol  = @newIdRol 

		WHERE DNI = @dni;
	END;
--Get Colaborador
CREATE PROCEDURE usp_getColaborador
	AS
	BEGIN
		SELECT
			P.DNI,
			P.Nombre,
			P.PrimerApellido,
			P.SegundoApellido,
			P.Telefono,
			P.Email,
			P.EsNacional,
			P.Usuario,
		P.Password,
		p.IdRol ,
        CO.FechaIngreso
    FROM
        Persona P
    JOIN
        Colaborador CO ON P.DNI = CO.DNI_Persona
END;
--Get only one Colaborador
CREATE PROCEDURE usp_getSingleColaborador (
    @dni INT
)
AS
BEGIN
    SELECT
        P.DNI,
        P.Nombre,
        P.PrimerApellido,
        P.SegundoApellido,
        P.Telefono,
        P.Email,
        P.EsNacional,
        P.Usuario,
		P.Password,
		P.IdRol ,
        CO.FechaIngreso
    FROM
        Persona P
    INNER JOIN
        Colaborador CO ON P.DNI = CO.DNI_Persona
    WHERE
        P.DNI = @dni;
END;
-- Delete Colaborador
CREATE PROCEDURE usp_deleteColaborador (
    @dni INT
)
AS
BEGIN
    -- Verificar si ya se ha ejecutado en este nivel
    IF (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE session_id = @@SPID) > 1
    BEGIN
        RETURN; -- Evitar llamadas recursivas
    END

    -- Eliminar en Cliente
    DELETE FROM Colaborador
    WHERE DNI_Persona = @dni;

    -- Eliminar en Persona
    DELETE FROM Persona
    WHERE DNI = @dni;
END;
-- Add Cotizaciones
CREATE PROCEDURE usp_addCotizaciones (
                @dni DECIMAL,
                @Idcolaborador DECIMAL,
                @TipoProducto VARCHAR(35),
                @Producto VARCHAR(20),
                @PorcentajeImp INT,
                @EnlaceRef VARCHAR(500),
                @fechaCrea DATETIME 
	)
	AS
	BEGIN
    -- Verificar si los Ids de DNI y Colaborador existen
    IF NOT EXISTS (SELECT * FROM Persona WHERE DNI = @dni)
        RAISERROR ('DNI de Persona no existe', 16, 1)
    IF NOT EXISTS (SELECT * FROM Colaborador WHERE IDColaborador = @Idcolaborador)
        RAISERROR ('Id de Colaborador no existe', 16, 1)

    -- Insertar la nueva cotizaci�n
    INSERT INTO Cotizaciones (ID_DNI, IDColaborador, TipoProducto, Producto, PorcentajeImp, EnlaceRef,FechaCreacion)
    VALUES (@dni, @Idcolaborador, @TipoProducto, @Producto, @PorcentajeImp, @EnlaceRef,@fechaCrea)
END;
---------------------------------------------------------
-- Modify Cotizaciones
CREATE PROCEDURE usp_modifyCotizaciones (
		@IdCotizacion INT,
                @newTipoProducto VARCHAR(35),
                @newProducto VARCHAR(20),
                @newPorcentajeImp INT,
                @newEnlaceRef VARCHAR(500)
	)
	AS
	BEGIN
		-- Update Cotizaciones
		UPDATE Cotizaciones
		SET TipoProducto = @newTipoProducto,
                    Producto = @newProducto,
                    PorcentajeImp = @newPorcentajeImp,
                    EnlaceRef = @newEnlaceRef
		WHERE IDCotizacion = @IdCotizacion;

	END;
------------------------------------------------------------------------------------------
--Get Cotizaciones
CREATE PROCEDURE usp_getCotizaciones
	AS
	BEGIN
		SELECT
		    COT.IDCotizacion,
			COT.ID_DNI,
			COT.TipoProducto,
			COT.Producto,
			COT.PorcentajeImp,
			COT.EnlaceRef,
			COT.FechaCreacion
    FROM
        Cotizaciones COT
END;
-----------------
--only one Cotizaciones
CREATE PROCEDURE usp_getSingleCotizaciones (
    @IdCotizacion INT
)
AS
BEGIN
    SELECT
        COT.IDCotizacion,
			COT.TipoProducto,
			COT.Producto,
			COT.PorcentajeImp,
			COT.EnlaceRef,
			COT.FechaCreacion
    FROM
        Cotizaciones COT
    WHERE
        COT.IDCotizacion = @IdCotizacion;
END;
------------------------------------------------------------------------------------------
-- Delete Cotizaciones
CREATE PROCEDURE usp_deleteCotizaciones (
    @IdCotizacion INT
)
AS
BEGIN
    -- Verificar si ya se ha ejecutado en este nivel
    IF (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE session_id = @@SPID) > 1
    BEGIN
        RETURN; -- Evitar llamadas recursivas
    END

    -- Eliminar en Cotizaciones
    DELETE FROM Cotizaciones
    WHERE IDCotizacion = @IdCotizacion;
END;
-- Add REVA
CREATE PROCEDURE usp_addRevisionAlmacen (
    @Vin VARCHAR(35),
    @Marca VARCHAR(20),
    @Modelo VARCHAR(20),
    @Extras VARCHAR(20),
    @Color VARCHAR(20),
    @CostoVehiculo DECIMAL,
    @AnioVehiculo INT,
    @DniDueno INT,
    @Placa INT = NULL,
    @EstadoOp VARCHAR(20)
)
AS
BEGIN
    INSERT INTO RevisionAlmacen (VIN, Marca, Modelo,Extras, Color, CostoVehiculo, AnioVehiculo, DNI_Dueno, Placa, EstadoOp)
    VALUES (@Vin, @Marca, @Modelo,@Extras, @Color, @CostoVehiculo, @AnioVehiculo, @DniDueno, @Placa, @EstadoOp)
END
---------------------------------------------------------
-- Modify REVA
CREATE PROCEDURE usp_modifyRevisionAlmacen (
    @IdformAlmacen INT,
    @newVin VARCHAR(35),
    @newMarca VARCHAR(20),
    @newModelo VARCHAR(20),
    @newColor VARCHAR(20),
    @newExtras VARCHAR(20),
    @newCostoVehiculo DECIMAL,
    @newAnioVehiculo INT,
    @newDniDueno INT,
    @newPlaca INT,
    @newEstadoOp VARCHAR(20)
)
AS
BEGIN
    UPDATE RevisionAlmacen
    SET Vin = @newVin,
        Marca = @newMarca,
        Modelo = @newModelo,
        Color = @newColor,
        Extras = @newExtras,
        CostoVehiculo = @newCostoVehiculo,
        AnioVehiculo = @newAnioVehiculo,
        Placa = @newPlaca,
        EstadoOp = @newEstadoOp
    WHERE IDFormAlmacen = @IdformAlmacen
END;
------------------------------------------------------------------------------------------
--Get REVA
CREATE PROCEDURE usp_getRevisionAlmacen
AS
BEGIN
    SELECT
		  REVA.IDFormAlmacen,
			REVA.VIN,
			REVA.Marca,
			REVA.Modelo,
                        REVA.Extras,
			REVA.Color,
			REVA.CostoVehiculo,
                        REVA.AnioVehiculo,
                        REVA.DNI_Dueno,
                        REVA.Placa,
                        REVA.EstadoOp
    FROM
        RevisionAlmacen REVA
END;
-----------------
--only one REVA
CREATE PROCEDURE usp_getSingleRevisionAlmacen (
    @IdformAlmacen INT
)
AS
BEGIN
SELECT
    REVA.IDFormAlmacen,
			REVA.VIN,
			REVA.Marca,
			REVA.Modelo,
			REVA.Color,
                        REVA.Extras,
			REVA.CostoVehiculo,
                        REVA.AnioVehiculo,
                        REVA.DNI_Dueno,
                        REVA.Placa,
                        REVA.EstadoOp
    FROM
        RevisionAlmacen REVA
    WHERE REVA.IDFormAlmacen = @IdformAlmacen
END;
------------------------------------------------------------------------------------------
-- Delete REVA
CREATE PROCEDURE usp_deleteRevisionAlmacen (
    @IdformAlmacen INT
)
AS
BEGIN
-- Verificar si ya se ha ejecutado en este nivel
    IF (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE session_id = @@SPID) > 1
    BEGIN
        RETURN; -- Evitar llamadas recursivas
    END

    DELETE FROM RevisionAlmacen
    WHERE IDFormAlmacen = @IdformAlmacen
END;
-- Add REVC
CREATE PROCEDURE usp_addRevisionContenedor (
    @PuertoOrigen VARCHAR(20),
    @PuertoDestino VARCHAR(20),
    @Naviera VARCHAR(20),
    @Transportista VARCHAR(20),
    @DniDueno INT,
    @Estado VARCHAR(20)
)
AS
BEGIN
    INSERT INTO RevisionContenedor (PuertoOrigen, PuertoDestino, Naviera, Transportista, DNI_Dueno, Estado)
    VALUES (@PuertoOrigen, @PuertoDestino, @Naviera, @Transportista, @DniDueno, @Estado)
END;
---------------------------------------------------------
-- Modify REVC
CREATE PROCEDURE usp_modifyRevisionContenedor (
    @IdrevCont INT,
    @newPuertoOrigen VARCHAR(20),
    @newPuertoDestino VARCHAR(20),
    @newNaviera VARCHAR(20),
    @newTransportista VARCHAR(20),
    @newDniDueno INT,
    @newEstado VARCHAR(20)
)
AS
BEGIN
    UPDATE RevisionContenedor
    SET PuertoOrigen = @newPuertoOrigen,
        PuertoDestino = @newPuertoDestino,
        Naviera = @newNaviera,
        Transportista = @newTransportista,
        DNI_Dueno = @newDniDueno,
        Estado = @newEstado
    WHERE IDRevCont = @IdrevCont
END;
------------------------------------------------------------------------------------------
--Get REVC
CREATE PROCEDURE usp_getRevisionContenedor
AS
BEGIN
    SELECT
		  REVC.IDRevCont,
			REVC.PuertoOrigen,
			REVC.PuertoDestino,
			REVC.Naviera,
			REVC.Transportista,
                        REVC.DNI_Dueno,
			REVC.Estado
    FROM
        RevisionContenedor REVC
END;
-----------------
--only one REVC
CREATE PROCEDURE usp_getSingleRevisionContenedor (
    @IdrevCont INT
)
AS
BEGIN
SELECT
    REVC.IDRevCont,
			REVC.PuertoOrigen,
			REVC.PuertoDestino,
			REVC.Naviera,
			REVC.Transportista,
                        REVC.DNI_Dueno,
			REVC.Estado
    FROM
        RevisionContenedor REVC
    WHERE REVC.IDRevCont = @IdrevCont
END;
------------------------------------------------------------------------------------------
-- Delete REVC
CREATE PROCEDURE usp_deleteRevisionContenedor (
    @IdrevCont INT
)
AS
BEGIN
    IF (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE session_id = @@SPID) > 1
    BEGIN
        RETURN; -- Evitar llamadas recursivas
    END

    DELETE FROM RevisionContenedor
    WHERE IDRevCont = @IdrevCont
END;

------------------------------------------------------------------------------------------
--Get Tickets
CREATE PROCEDURE ViewTickets
AS
BEGIN
	SELECT Ticket.TicketID, Ticket.Estado, Ticket.Prioridad, Ticket.Descripcion,
		   Cliente.DNI_PERSONA AS DNI_CLIENTE, Colaborador.DNI_PERSONA AS DNI_COLABORADOR
	FROM Ticket
	INNER JOIN Cliente ON Ticket.IDCliente = Cliente.IDCliente
	INNER JOIN Colaborador ON Ticket.IDColaborador = Colaborador.IDColaborador;
END;

EXEC ViewTickets;

------------------------------------------------------------------------------------------
--POST Tickets
CREATE PROCEDURE InsertTicket
    @Estado VARCHAR(50),
    @Prioridad VARCHAR(50),
    @Descripcion VARCHAR(500),
    @IDCliente INT,
    @IDColaborador INT
AS
BEGIN
    -- Verificar si el Cliente y el Colaborador existen
    IF EXISTS (SELECT 1 FROM Cliente WHERE IDCliente = @IDCliente)
       AND EXISTS (SELECT 1 FROM Colaborador WHERE IDColaborador = @IDColaborador)
    BEGIN
        INSERT INTO Ticket (Estado, Prioridad, Descripcion, IDCliente, IDColaborador)
        VALUES (@Estado, @Prioridad, @Descripcion, @IDCliente, @IDColaborador)
    END
END

------------------------------------------------------------------------------------------
--Get TicketsByClient
CREATE PROCEDURE ViewTicketsByClient
    @IDCliente INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Cliente WHERE IDCliente = @IDCliente)
    BEGIN
        RETURN
    END
    SELECT Ticket.TicketID, Ticket.Estado, Ticket.Prioridad, Ticket.Descripcion,
           Colaborador.DNI_PERSONA AS dniColaborador
    FROM Ticket
    INNER JOIN Colaborador ON Ticket.IDColaborador = Colaborador.IDColaborador
    WHERE Ticket.IDCliente = @IDCliente;
END;

------------------------------------------------------------------------------------------
--PUT Tickets
CREATE PROCEDURE EditTicket
    @TicketID INT,
    @Estado VARCHAR(50),
    @Prioridad VARCHAR(50),
    @Descripcion VARCHAR(500)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Ticket WHERE TicketID = @TicketID)
    BEGIN
        RETURN
    END
    UPDATE Ticket
    SET Estado = @Estado,
        Prioridad = @Prioridad,
        Descripcion = @Descripcion
    WHERE TicketID = @TicketID;
END

------------------------------------------------------------------------------------------
--DELETE Tickets
CREATE PROCEDURE DeleteTicket (
    @TicketID INT
)
AS
BEGIN
    DELETE FROM Ticket
    WHERE TicketID = @TicketID;
END;
--------------------------------
CREATE PROC [dbo].[usp_Login] (
@Usuario VARCHAR(250),
@Password VARCHAR(250)
) AS
BEGIN
if (exists(select * from Persona where Usuario = @Usuario and Password = @Password))
			select IdRol from Persona where Usuario = @Usuario and Password = @Password
	else
	select '0'

END
GO
------------------------
-- Add Importaciones 
CREATE PROCEDURE usp_addImportacion (
    @IDImpSeguimiento INT,
    @ID_DNI INT,
    @IDRevVehiculo INT = NULL,
    @IDRevContenedor INT = NULL,
    @FechaInicio DATETIME,
    @FechaFinalizacion DATETIME = NULL,
    @FechaEsperada DATETIME = NULL,
    @Prioridad VARCHAR(80),
    @Descripcion VARCHAR(250) = NULL
)
AS
BEGIN
    INSERT INTO Importaciones (IDImpSeguimiento, ID_DNI, IDRevVehiculo, IDRevContenedor, FechaInicio, FechaFinalizacion, FechaEsperada, Prioridad, Descripcion)
    VALUES (@IDImpSeguimiento, @ID_DNI, @IDRevVehiculo, @IDRevContenedor, @FechaInicio, @FechaFinalizacion, @FechaEsperada, @Prioridad, @Descripcion)
END
------------------
-- Modify Importaciones 
CREATE PROCEDURE usp_modifyImportacion (
    @IDImpSeguimiento INT,
    @newID_DNI INT,
    @newIDRevVehiculo INT = NULL,
    @newIDRevContenedor INT = NULL,
    @newFechaInicio DATETIME,
    @newFechaFinalizacion DATETIME = NULL,
    @newFechaEsperada DATETIME = NULL,
    @newPrioridad VARCHAR(80),
    @newDescripcion VARCHAR(250) = NULL
)
AS
BEGIN
    UPDATE Importaciones
    SET ID_DNI = @newID_DNI,
        IDRevVehiculo = @newIDRevVehiculo,
        IDRevContenedor = @newIDRevContenedor,
        FechaInicio = @newFechaInicio,
        FechaFinalizacion = @newFechaFinalizacion,
        FechaEsperada = @newFechaEsperada,
        Prioridad = @newPrioridad,
        Descripcion = @newDescripcion
    WHERE IDImpSeguimiento = @IDImpSeguimiento;
END;
--------------
--Get Importaciones 
CREATE PROCEDURE usp_getImportaciones
AS
BEGIN
    SELECT
		    IMP.IDImpSeguimiento,
                        IMP.ID_DNI,
			IMP.IDRevVehiculo,
			IMP.IDRevContenedor,
			IMP.FechaInicio,
			IMP.FechaFinalizacion,
			IMP.FechaEsperada,
                        IMP.Prioridad,
                        IMP.Descripcion
    FROM
        Importaciones IMP
END;
--------------------------
--only one Importaciones 
CREATE PROCEDURE usp_getSingleImportacion (
    @IDImpSeguimiento INT
)
AS
BEGIN
    SELECT
		    IMP.IDImpSeguimiento,
			IMP.IDRevVehiculo,
			IMP.IDRevContenedor,
			IMP.FechaInicio,
			IMP.FechaFinalizacion,
			IMP.FechaEsperada,
                        IMP.Prioridad,
                        IMP.Descripcion
    FROM
        Importaciones IMP
    WHERE IMP.IDImpSeguimiento = @IDImpSeguimiento
END;
------------------------------------
CREATE PROCEDURE usp_deleteImportacion (
    @IDImpSeguimiento INT
)
AS
BEGIN
    -- Verificar si ya se ha ejecutado en este nivel
    IF (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE session_id = @@SPID) > 1
    BEGIN
        RETURN; -- Evitar llamadas recursivas
    END

    DELETE FROM Importaciones
    WHERE IDImpSeguimiento = @IDImpSeguimiento
END
----------------------------------
