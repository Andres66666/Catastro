
from rest_framework import serializers
from .models import Propietario, Usuarios, Roles, Permisos, UsuariosRoles, RolesPermisos

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
class PropietarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propietario
        fields = '__all__'  # O especifica los campos que deseas incluir