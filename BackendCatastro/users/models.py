from django.db import models
from django.contrib.auth.hashers import make_password
import uuid
# Create your models here.
class Roles(models.Model):
    nombre_rol = models.CharField(max_length=50, unique=True)
    estado_Rol = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre_rol

# Modelo de Permisos
class Permisos(models.Model):
    nombre_permiso = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    estado_Permiso = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre_permiso

# Modelo de Usuarios
class Usuarios(models.Model):
    nombre_usuario = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=50, unique=True)
    correo = models.EmailField(max_length=100, unique=True, null=True, blank=True)
    password = models.CharField(max_length=255)
    ci = models.CharField(max_length=20, unique=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    estado_Usuario = models.BooleanField(default=True)
    

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.nombre_usuario} {self.apellido}'

# Modelo de Roles de Usuarios
class UsuariosRoles(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('usuario', 'rol')
    def __str__(self):
        return f'{self.usuario} {self.rol} '

# Modelo de Roles y Permisos
class RolesPermisos(models.Model):
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permisos, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('rol', 'permiso')
    def __str__(self):
        return f'{self.rol} {self.permiso} '

""" esto es la seccion del registro de catastro  """

# models 
# models.py
class Inmueble(models.Model):
    numero_inmueble = models.IntegerField()
    padron_municipal = models.CharField(max_length=50)

    def __str__(self):
        return f"Inmueble #{self.numero_inmueble}"

class Propietario(models.Model):
    inmueble = models.ForeignKey(Inmueble, on_delete=models.CASCADE, null=False)
    apellido_paterno = models.CharField(max_length=100, null=True, blank=True)
    apellido_materno = models.CharField(max_length=100, null=True, blank=True)
    nombre = models.CharField(max_length=100, null=True, blank=True)
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tipo_documento = models.CharField(max_length=10, null=True, blank=True)
    numero_documento = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido_paterno} {self.apellido_materno}"

class ClasificacionDerecho(models.Model):
    inmueble = models.ForeignKey(Inmueble, on_delete=models.CASCADE, null=False)
    notario_juez = models.CharField(max_length=200)
    nombre_notario_juez = models.CharField(max_length=200)
    fecha_inscripcion = models.DateField(null=True, blank=True)
    matricula_partida = models.CharField(max_length=100, null=True, blank=True)
    numero_testimonio = models.CharField(max_length=100, null=True, blank=True)
    fecha_testimonio = models.DateField(null=True, blank=True)
    superficie = models.DecimalField(max_digits=10, decimal_places=2)  # metros cuadrados

    def __str__(self):
        return f"Clasificación de Derecho de inmueble #{self.inmueble.id}"
class PropiedadCatastral(models.Model):
    inmueble = models.ForeignKey(Inmueble, on_delete=models.CASCADE, null=False)
    DistritoPropietario = models.CharField(max_length=100, blank=True, null=True) 
    SectorPropietario = models.CharField(max_length=100, blank=True, null=True)
    ManzanoPropietario = models.CharField(max_length=100, blank=True, null=True)
    PredioPropietario = models.CharField(max_length=100, blank=True, null=True)
    SubPredioPropietario = models.CharField(max_length=100, blank=True, null=True)
    DireccionPropietario = models.CharField(max_length=255, blank=True, null=True)
    ViasDe = models.CharField(max_length=255, blank=True, null=True)

    DistritoCatastro = models.CharField(max_length=100, blank=True, null=True)
    SectorCatastro = models.CharField(max_length=100, blank=True, null=True)
    ManzanoCatastro = models.CharField(max_length=100, blank=True, null=True)
    PredioCatastro = models.CharField(max_length=100, blank=True, null=True)
    SubPredioCatastro = models.CharField(max_length=100, blank=True, null=True)
    DireccionCatastro = models.CharField(max_length=255, blank=True, null=True)
    Zona = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Propiedad Catastral de inmueble #{self.inmueble.id}"
    
class ObraGruesa(models.Model):
    inmueble = models.ForeignKey(Inmueble, on_delete=models.CASCADE, null=False)
    b1 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b2 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b3 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b4 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b5 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Obra Gruesa del inmueble #{self.inmueble.id}"
    
class IdentificadorInmueble(models.Model):
    inmueble = models.ForeignKey(Inmueble, on_delete=models.CASCADE, related_name="identificadores")

    identificador_catastral_id = models.CharField(max_length=255, unique=True, blank=True)
    identificador_propietario_id = models.CharField(max_length=255, unique=True, blank=True)

    def __str__(self):
        return f"Inmueble #{self.inmueble.id} | Catastral: {self.identificador_catastral_id} | Propietario: {self.identificador_propietario_id}"

    @staticmethod
    def construir_id(sector, manzano, predio):
        # Si algún dato es None, usar 'X' como marcador
        return f"{sector or 'X'}-{manzano or 'X'}-{predio or 'X'}"

    def set_identificadores_desde_propiedad(self, propiedad_catastral: 'PropiedadCatastral'):
        self.identificador_catastral_id = self.construir_id(
            propiedad_catastral.SectorCatastro,
            propiedad_catastral.ManzanoCatastro,
            propiedad_catastral.PredioCatastro
        )
        self.identificador_propietario_id = self.construir_id(
            propiedad_catastral.SectorPropietario,
            propiedad_catastral.ManzanoPropietario,
            propiedad_catastral.PredioPropietario
        )
