
from rest_framework import serializers
from .models import ClasificacionDerecho, IdentificadorInmueble, Inmueble, ObraGruesa, PropiedadCatastral, Propietario, Usuarios, Roles, Permisos, UsuariosRoles, RolesPermisos

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField(max_length=100, required=False, allow_null=True)
    password = serializers.CharField(max_length=255, required=True)  


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class PermisosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permisos
        fields = '__all__'

class UsuariosRolesSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    rol = RolSerializer(read_only=True)

    class Meta:
        model = UsuariosRoles
        fields = '__all__'

class RolesPermisosSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    permiso = PermisosSerializer(read_only=True)

    class Meta:
        model = RolesPermisos
        fields = '__all__'

""" esto es la seccion del registro de catastro  """
# serializers.py
class InmuebleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inmueble  
        fields = '__all__' 

class PropietarioSerializer(serializers.ModelSerializer):
    inmueble = InmuebleSerializer(read_only=True)
    
    class Meta:
        model = Propietario
        fields = '__all__'  

class ClasificacionDerechoSerializer(serializers.ModelSerializer):
    inmueble = InmuebleSerializer(read_only=True)
    class Meta:
        model = ClasificacionDerecho
        fields = '__all__'
class PropiedadCatastralSerializer(serializers.ModelSerializer):
    inmueble = InmuebleSerializer(read_only=True)
    class Meta:
        model = PropiedadCatastral
        fields = '__all__'
    
class ObraGruesaSerializer(serializers.ModelSerializer):
    inmueble = InmuebleSerializer(read_only=True)
    class Meta:
        model = ObraGruesa
        fields = '__all__'

class IdentificadorInmuebleSerializer(serializers.ModelSerializer):
    inmueble = InmuebleSerializer(read_only=True)

    class Meta:
        model = IdentificadorInmueble
        fields = '__all__'
