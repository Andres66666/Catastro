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
# models.py
# models 
class CodigoIdentificador(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.codigo


class Inmueble(models.Model):
    codigo = models.OneToOneField(CodigoIdentificador, on_delete=models.CASCADE, primary_key=True)
    numero_inmueble = models.IntegerField(max_length=10)
    padron_municipal = models.CharField(max_length=10)

    def __str__(self):
        return f"Inmueble #{self.numero_inmueble}"


class Propietario(models.Model):
    codigo = models.ForeignKey(CodigoIdentificador, on_delete=models.CASCADE, primary_key=True)
    numero_documento = models.CharField(max_length=50, null=True, blank=True)
    apellido_paterno = models.CharField(max_length=100, null=True, blank=True)
    apellido_materno = models.CharField(max_length=100, null=True, blank=True)
    nombre = models.CharField(max_length=100, null=True, blank=True)
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tipo_documento = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido_paterno} {self.apellido_materno}"


class ClasificacionDerecho(models.Model):
    codigo = models.OneToOneField(CodigoIdentificador, on_delete=models.CASCADE, primary_key=True)
    notario_juez = models.CharField(max_length=200)
    nombre_notario_juez = models.CharField(max_length=200)
    fecha_inscripcion = models.DateField(null=True, blank=True)
    matricula_partida = models.CharField(max_length=100, null=True, blank=True)
    numero_testimonio = models.CharField(max_length=100, null=True, blank=True)
    fecha_testimonio = models.DateField(null=True, blank=True)
    superficie = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Clasificación de Derecho #{self.codigo_id}"


class CodigoCatastral(models.Model):
    codigo = models.OneToOneField(CodigoIdentificador, on_delete=models.CASCADE, primary_key=True)
    Distrito = models.CharField(max_length=100, blank=True, null=True) 
    Sector = models.CharField(max_length=100, blank=True, null=True)
    Manzano = models.CharField(max_length=100, blank=True, null=True)
    Predio = models.CharField(max_length=100, blank=True, null=True)
    SubPredio = models.CharField(max_length=100, blank=True, null=True)
    Direccion = models.CharField(max_length=255, blank=True, null=True)
    Zona = models.CharField(max_length=100, blank=True, null=True)
    ViasDe = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Propiedad Catastral #{self.codigo_id}"


class ObraGruesa(models.Model):
    codigo = models.OneToOneField(CodigoIdentificador, on_delete=models.CASCADE, primary_key=True)
    b1 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b2 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b3 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b4 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    b5 = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Obra Gruesa #{self.codigo_id}"

    