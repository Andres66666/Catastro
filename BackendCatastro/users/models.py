from django.db import models
from django.contrib.auth.hashers import make_password

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
