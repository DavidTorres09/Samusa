using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Samusa_Back.Models;

public partial class SamusadbContext : DbContext
{
    public SamusadbContext()
    {
    }

    public SamusadbContext(DbContextOptions<SamusadbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Colaborador> Colaboradors { get; set; }

    public virtual DbSet<Cotizacione> Cotizaciones { get; set; }

    public virtual DbSet<Exportacione> Exportaciones { get; set; }

    public virtual DbSet<FormularioAtencion> FormularioAtencions { get; set; }

    public virtual DbSet<Importacione> Importaciones { get; set; }

    public virtual DbSet<Paqueterium> Paqueteria { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<RevisionAlmacen> RevisionAlmacens { get; set; }

    public virtual DbSet<Soporte> Soportes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source= DESKTOP-ITEJBTN\\SQLEXPRESS; Initial Catalog=SAMUSADB; Persist Security Info=False; Trusted_Connection=True; Encrypt=false;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Idcliente);

            entity.ToTable("Cliente");

            entity.Property(e => e.Idcliente)
                .ValueGeneratedNever()
                .HasColumnName("IDCliente");
            entity.Property(e => e.Direccion)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.DniPersona).HasColumnName("DNI_Persona");

            entity.HasOne(d => d.DniPersonaNavigation).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.DniPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cliente_Persona");
        });

        modelBuilder.Entity<Colaborador>(entity =>
        {
            entity.HasKey(e => e.Idcolaborador);

            entity.ToTable("Colaborador");

            entity.Property(e => e.Idcolaborador)
                .ValueGeneratedNever()
                .HasColumnName("IDColaborador");
            entity.Property(e => e.DniPersona).HasColumnName("DNI_Persona");

            entity.HasOne(d => d.DniPersonaNavigation).WithMany(p => p.Colaboradors)
                .HasForeignKey(d => d.DniPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Colaborador_Persona");
        });

        modelBuilder.Entity<Cotizacione>(entity =>
        {
            entity.HasKey(e => e.Idcotizacion).HasName("PK_IDCotizacion");

            entity.Property(e => e.Idcotizacion).HasColumnName("IDCotizacion");
            entity.Property(e => e.EnlaceRef)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.FechaCreacion).HasColumnType("datetime");
            entity.Property(e => e.IdDni).HasColumnName("ID_DNI");
            entity.Property(e => e.Idcolaborador).HasColumnName("IDColaborador");
            entity.Property(e => e.PorcentajeImp).HasColumnName("PorcentajeIMP");
            entity.Property(e => e.Producto)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TipoProducto)
                .HasMaxLength(35)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDniNavigation).WithMany(p => p.Cotizaciones)
                .HasForeignKey(d => d.IdDni)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Cotizacion_Cliente");

            entity.HasOne(d => d.IdcolaboradorNavigation).WithMany(p => p.Cotizaciones)
                .HasForeignKey(d => d.Idcolaborador)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Colaborador_Cotizacion");
        });

        modelBuilder.Entity<Exportacione>(entity =>
        {
            entity.HasKey(e => e.IdexpSeguimiento).HasName("PK_IDExpSeguimiento");

            entity.Property(e => e.IdexpSeguimiento).HasColumnName("IDExpSeguimiento");
            entity.Property(e => e.FechaEsperada).HasColumnType("datetime");
            entity.Property(e => e.FechaFinalizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");
            entity.Property(e => e.IdDni).HasColumnName("ID_DNI");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDniNavigation).WithMany(p => p.Exportaciones)
                .HasForeignKey(d => d.IdDni)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exportaciones_Persona");
        });

        modelBuilder.Entity<FormularioAtencion>(entity =>
        {
            entity.HasKey(e => e.IdformularioAtencion).HasName("PK_IDFormularioAtencion");

            entity.ToTable("FormularioAtencion");

            entity.Property(e => e.IdformularioAtencion).HasColumnName("IDFormularioAtencion");
            entity.Property(e => e.Detalle)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.EstadoAtencion)
                .HasMaxLength(35)
                .IsUnicode(false);
            entity.Property(e => e.Idformulario).HasColumnName("IDFormulario");
            entity.Property(e => e.Vinvehiculo)
                .HasMaxLength(35)
                .IsUnicode(false)
                .HasColumnName("VINVehiculo");
        });

        modelBuilder.Entity<Importacione>(entity =>
        {
            entity.HasKey(e => e.IdimpSeguimiento).HasName("PK_IDImpSeguimiento");

            entity.Property(e => e.IdimpSeguimiento).HasColumnName("IDImpSeguimiento");
            entity.Property(e => e.FechaEsperada).HasColumnType("datetime");
            entity.Property(e => e.FechaFinalizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");
            entity.Property(e => e.IdDni).HasColumnName("ID_DNI");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDniNavigation).WithMany(p => p.Importaciones)
                .HasForeignKey(d => d.IdDni)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Importaciones_Persona");
        });

        modelBuilder.Entity<Paqueterium>(entity =>
        {
            entity.HasKey(e => e.IdpaqSeguimiento).HasName("PK_IDPaqSeguimiento");

            entity.Property(e => e.IdpaqSeguimiento).HasColumnName("IDPaqSeguimiento");
            entity.Property(e => e.DirectDestino)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.DirectOrigen)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.FechaEsperada).HasColumnType("datetime");
            entity.Property(e => e.FechaRegistro).HasColumnType("datetime");
            entity.Property(e => e.IdDni).HasColumnName("ID_DNI");
            entity.Property(e => e.NumCasillero)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.NumTracking)
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.TipoProducto)
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDniNavigation).WithMany(p => p.Paqueteria)
                .HasForeignKey(d => d.IdDni)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Paqueteria_Persona");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.DNI);

            entity.ToTable("Persona");

            entity.Property(e => e.DNI)
                .ValueGeneratedNever()
                .HasColumnName("DNI");
            entity.Property(e => e.Email)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.PrimerApellido)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Rol)
                .HasMaxLength(75)
                .IsUnicode(false);
            entity.Property(e => e.SegundoApellido)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Usuario)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RevisionAlmacen>(entity =>
        {
            entity.HasKey(e => e.Vin).HasName("PK_Vehiculo");

            entity.ToTable("RevisionAlmacen");

            entity.Property(e => e.Vin)
                .HasMaxLength(35)
                .IsUnicode(false)
                .HasColumnName("VIN");
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CostoVehiculo).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.DniDueno).HasColumnName("DNI_Dueno");
            entity.Property(e => e.EstadoOp)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("EstadoOP");
            entity.Property(e => e.IdformAlmacen)
                .ValueGeneratedOnAdd()
                .HasColumnName("IDFormAlmacen");
            entity.Property(e => e.Marca)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Modelo)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Soporte>(entity =>
        {
            entity.HasKey(e => e.Idformulario).HasName("PK_IDFormulario");

            entity.ToTable("Soporte");

            entity.Property(e => e.Idformulario).HasColumnName("IDFormulario");
            entity.Property(e => e.FechaEsperada).HasColumnType("datetime");
            entity.Property(e => e.FechaFinalizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");
            entity.Property(e => e.IdDni).HasColumnName("ID_DNI");
            entity.Property(e => e.Prioridad)
                .HasMaxLength(80)
                .IsUnicode(false);

            entity.HasOne(d => d.IdDniNavigation).WithMany(p => p.Soportes)
                .HasForeignKey(d => d.IdDni)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Soporte_Cliente");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
