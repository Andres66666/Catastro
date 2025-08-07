
from rest_framework import serializers
from .models import ClasificacionDerecho, CodigoCatastral, CodigoIdentificador,  Inmueble, ObraGruesa, Propietario, Usuarios, Roles, Permisos, UsuariosRoles, RolesPermisos

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

# Serializador del identificador base
class CodigoIdentificadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodigoIdentificador
        fields = '__all__'


# Inmueble
class InmuebleSerializer(serializers.ModelSerializer):
    codigo = CodigoIdentificadorSerializer(read_only=True)

    class Meta:
        model = Inmueble
        fields = '__all__'


# Propietario
class PropietarioSerializer(serializers.ModelSerializer):
    codigo = CodigoIdentificadorSerializer(read_only=True)

    class Meta:
        model = Propietario
        fields = '__all__'


# Clasificación de derecho
class ClasificacionDerechoSerializer(serializers.ModelSerializer):
    codigo = CodigoIdentificadorSerializer(read_only=True)

    class Meta:
        model = ClasificacionDerecho
        fields = '__all__'


# Propiedad catastral
class CodigoCatastralSerializer(serializers.ModelSerializer):
    codigo = CodigoIdentificadorSerializer(read_only=True)

    class Meta:
        model = CodigoCatastral
        fields = '__all__'


# Obra gruesa
class ObraGruesaSerializer(serializers.ModelSerializer):
    codigo = CodigoIdentificadorSerializer(read_only=True)

    class Meta:
        model = ObraGruesa
        fields = '__all__'

