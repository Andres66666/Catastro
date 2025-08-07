
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Prefetch
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password

import uuid

from .models import   CodigoIdentificador, Inmueble, Permisos, Propietario, Roles,  Usuarios, RolesPermisos, UsuariosRoles
from .serializers import   CodigoIdentificadorSerializer, InmuebleSerializer, PermisosSerializer, PropietarioSerializer,  RolSerializer, RolesPermisosSerializer, UsuarioSerializer, LoginSerializer, UsuariosRolesSerializer



# Create your views here.
# backend

class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        correo = serializer.validated_data.get('correo')
        password = serializer.validated_data.get('password')

        try:
            usuario = Usuarios.objects.prefetch_related(
                Prefetch('usuariosroles_set', queryset=UsuariosRoles.objects.select_related('rol')),
            ).get(correo=correo)

            if not usuario.estado_Usuario:
                return Response({'error': 'No puedes iniciar sesión. Comuníquese con el administrador.'}, status=status.HTTP_403_FORBIDDEN)

            if not check_password(password, usuario.password):
                return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)

            refresh = RefreshToken.for_user(usuario)
            access_token = str(refresh.access_token)

            # Obtener roles
            roles = [ur.rol.nombre_rol for ur in usuario.usuariosroles_set.all()]

            # Obtener permisos de todos los roles
            permisos = []
            for ur in usuario.usuariosroles_set.all():
                rol = ur.rol
                permisos += [rp.permiso.nombre_permiso for rp in RolesPermisos.objects.filter(rol=rol)]

            if not roles or not permisos:
                return Response({'error': 'El usuario no tiene roles ni permisos asignados.'}, status=status.HTTP_403_FORBIDDEN)

            return Response({
                'access_token': access_token,
                'roles': roles,
                'permisos': permisos,
                'nombre_usuario': usuario.nombre_usuario,
                'apellido': usuario.apellido,
                'usuario_id': usuario.id
            }, status=status.HTTP_200_OK)

        except Usuarios.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)



# ViewSet for Permisos
class PermisosViewSet(viewsets.ModelViewSet):
    queryset = Permisos.objects.all()
    serializer_class = PermisosSerializer
    def create(self, request, *args, **kwargs):
        # Extraer datos del request
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Valida los datos
        self.perform_create(serializer)  # Guarda el nuevo permiso
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = True  # Permite actualizaciones parciales
        instance = self.get_object()  # Obtiene la instancia del permiso a actualizar
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)  # Valida los datos
        self.perform_update(serializer)  # Actualiza el permiso
        return Response(serializer.data)
# ViewSet for Roles
class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolSerializer

    def create(self, request, *args, **kwargs):
        # Extraer datos del request
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Valida los datos
        self.perform_create(serializer)  # Guarda el nuevo rol
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = True  # Permite actualizaciones parciales
        instance = self.get_object()  # Obtiene la instancia del rol a actualizar
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)  # Valida los datos
        self.perform_update(serializer)  # Actualiza el rol
        return Response(serializer.data)

# ViewSet for Usuarios
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        # Extraer datos del request
        data = {key: request.data.get(key) for key in [
            'nombre_usuario', 'apellido', 'telefono', 'correo', 
            'password', 'ci','ci_departamento', 'fecha_nacimiento'
        ]}
        # Crear el usuario
        usuario = Usuarios.objects.create(**data)
        return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)
    def update(self, request, *args, **kwargs):
        partial = True  # Permite actualizaciones parciales
        instance = self.get_object()
        data = request.data.copy()  # Copia los datos del request

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
# ViewSet for UsuariosRoles
class UsuariosRolesViewSet(viewsets.ModelViewSet):
    queryset = UsuariosRoles.objects.all()
    serializer_class = UsuariosRolesSerializer

    def create(self, request, *args, **kwargs):
        usuario_id = request.data.get('usuario')
        rol_id = request.data.get('rol')

        if UsuariosRoles.objects.filter(usuario_id=usuario_id, rol_id=rol_id).exists():
            return Response({'error': ['El usuario ya tiene este rol asignado']}, status=status.HTTP_400_BAD_REQUEST)

        usuario_rol = UsuariosRoles.objects.create(usuario_id=usuario_id, rol_id=rol_id)
        return Response(UsuariosRolesSerializer(usuario_rol).data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        instance = self.get_object()
        usuario_id = request.data.get('usuario', {}).get('id', instance.usuario_id)
        rol_id = request.data.get('rol', {}).get('id', instance.rol_id)

        if UsuariosRoles.objects.filter(usuario_id=usuario_id, rol_id=rol_id).exclude(pk=instance.pk).exists():
            return Response({'error': ['El usuario ya tiene este rol asignado']}, status=status.HTTP_400_BAD_REQUEST)

        instance.usuario_id = usuario_id
        instance.rol_id = rol_id
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

# ViewSet for RolesPermisos

class RolesPermisosViewSet(viewsets.ModelViewSet):

    queryset = RolesPermisos.objects.all()
    serializer_class = RolesPermisosSerializer

    def create(self, request, *args, **kwargs):
        rol_id = request.data.get('rol')
        permiso_id = request.data.get('permiso')

        # Verificar si ya existe la relación entre rol y permiso
        if RolesPermisos.objects.filter(rol_id=rol_id, permiso_id=permiso_id).exists():
            return Response({'error': ['Este rol ya tiene este permiso asignado']}, status=status.HTTP_400_BAD_REQUEST)

        # Crear la relación
        roles_permisos = RolesPermisos.objects.create(rol_id=rol_id, permiso_id=permiso_id)
        return Response(RolesPermisosSerializer(roles_permisos).data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        instance = self.get_object()
        rol_id = request.data.get('rol', {}).get('id', instance.rol_id)
        permiso_id = request.data.get('permiso', {}).get('id', instance.permiso_id)

        # Verificar si ya existe la relación entre rol y permiso, excluyendo la instancia actual
        if RolesPermisos.objects.filter(rol_id=rol_id, permiso_id=permiso_id).exclude(pk=instance.pk).exists():
            return Response({'error': ['Este rol ya tiene este permiso asignado']}, status=status.HTTP_400_BAD_REQUEST)

        # Actualizar la relación
        instance.rol_id = rol_id
        instance.permiso_id = permiso_id
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    


class CodigoIdentificadorViewSet(viewsets.ModelViewSet):
    queryset = CodigoIdentificador.objects.all()
    serializer_class = CodigoIdentificadorSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        codigo_identificador = serializer.save()
        return Response(self.get_serializer(codigo_identificador).data, status=status.HTTP_201_CREATED)


class InmuebleViewSet(viewsets.ModelViewSet):
    queryset = Inmueble.objects.all()
    serializer_class = InmuebleSerializer

    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)  # Log the incoming request data
        codigo_identificador = request.data.get('codigo_identificador')
        if not codigo_identificador:
            return Response({'error': 'Se requiere codigo_identificador'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the CodigoIdentificador if it doesn't exist
        codigo_obj, created = CodigoIdentificador.objects.get_or_create(codigo=codigo_identificador)

        # Prepare the inmueble data
        inmueble_data = {
            'codigo': codigo_obj,
            'numero_inmueble': request.data.get('numero_inmueble'),
            'padron_municipal': request.data.get('padron_municipal'),
        }

        # Create the Inmueble
        inmueble_serializer = self.get_serializer(data=inmueble_data)
        if not inmueble_serializer.is_valid():
            print("Inmueble serializer errors:", inmueble_serializer.errors)  # Log serializer errors
            return Response(inmueble_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        inmueble = inmueble_serializer.save()

        # Handle Propietarios
        propietarios_data = request.data.get('propietarios', [])
        propietarios = []
        for item in propietarios_data:
            item['codigo'] = codigo_obj.codigo  # Assign the codigo_identificador
            propietario_serializer = PropietarioSerializer(data=item)
            if not propietario_serializer.is_valid():
                print("Propietario serializer errors:", propietario_serializer.errors)  # Log serializer errors
                return Response(propietario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            propietario = propietario_serializer.save(inmueble=inmueble)
            propietarios.append(propietario_serializer.data)

        return Response({
            'inmueble': inmueble_serializer.data,
            'propietarios': propietarios
        }, status=status.HTTP_201_CREATED)


class PropietarioViewSet(viewsets.ModelViewSet):
       queryset = Propietario.objects.all()
       serializer_class = PropietarioSerializer

       def create(self, request, *args, **kwargs):
           data = request.data
           is_many = isinstance(data, list)
           items = data if is_many else [data]
           propietarios = []

           for item in items:
               inmueble_id = item.get('inmueble_id')
               if not inmueble_id:
                   return Response({'error': 'Se requiere inmueble_id para cada propietario'}, status=status.HTTP_400_BAD_REQUEST)
               try:
                   inmueble = Inmueble.objects.get(pk=inmueble_id)
               except Inmueble.DoesNotExist:
                   return Response({'error': f'Inmueble {inmueble_id} no encontrado'}, status=status.HTTP_404_NOT_FOUND)

               item_copy = item.copy()
               item_copy.pop('inmueble_id', None)
               serializer = self.get_serializer(data=item_copy)
               serializer.is_valid(raise_exception=True)
               propietario = serializer.save(inmueble=inmueble)
               propietarios.append(self.get_serializer(propietario).data)

           return Response(propietarios if is_many else propietarios[0], status=status.HTTP_201_CREATED)
   



""" esto es la seccion del registro de catastro  """
""" class InmuebleViewSet(viewsets.ModelViewSet):
    queryset = Inmueble.objects.all()
    serializer_class = InmuebleSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inmueble = serializer.save()
        return Response(self.get_serializer(inmueble).data, status=status.HTTP_201_CREATED)


class PropietarioViewSet(viewsets.ModelViewSet):
    queryset = Propietario.objects.all()
    serializer_class = PropietarioSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        is_many = isinstance(data, list)

        items = data if is_many else [data]
        propietarios = []

        for item in items:
            inmueble_id = item.get('inmueble_id')
            if not inmueble_id:
                return Response({'error': 'Se requiere inmueble_id para cada propietario'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                inmueble = Inmueble.objects.get(pk=inmueble_id)
            except Inmueble.DoesNotExist:
                return Response({'error': f'Inmueble {inmueble_id} no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            item_copy = item.copy()
            item_copy.pop('inmueble_id', None)
            serializer = self.get_serializer(data=item_copy)
            serializer.is_valid(raise_exception=True)
            propietario = serializer.save(inmueble=inmueble)
            propietarios.append(self.get_serializer(propietario).data)

        return Response(propietarios if is_many else propietarios[0], status=status.HTTP_201_CREATED)


class ClasificacionDerechoViewSet(viewsets.ModelViewSet):
    queryset = ClasificacionDerecho.objects.all()
    serializer_class = ClasificacionDerechoSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        is_many = isinstance(data, list)

        items = data if is_many else [data]
        clasificaciones = []

        for item in items:
            inmueble_id = item.get('inmueble_id')
            if not inmueble_id:
                return Response({'error': 'Se requiere inmueble_id para cada clasificación'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                inmueble = Inmueble.objects.get(pk=inmueble_id)
            except Inmueble.DoesNotExist:
                return Response({'error': f'Inmueble {inmueble_id} no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            item_copy = item.copy()
            item_copy.pop('inmueble_id', None)
            serializer = self.get_serializer(data=item_copy)
            serializer.is_valid(raise_exception=True)
            clasificacion = serializer.save(inmueble=inmueble)
            clasificaciones.append(self.get_serializer(clasificacion).data)

        return Response(clasificaciones if is_many else clasificaciones[0], status=status.HTTP_201_CREATED)


class ObraGruesaViewSet(viewsets.ModelViewSet):
    queryset = ObraGruesa.objects.all()
    serializer_class = ObraGruesaSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        is_many = isinstance(data, list)

        items = data if is_many else [data]
        obras = []

        for item in items:
            inmueble_id = item.get('inmueble_id')
            if not inmueble_id:
                return Response({'error': 'Se requiere inmueble_id para cada obra gruesa'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                inmueble = Inmueble.objects.get(pk=inmueble_id)
            except Inmueble.DoesNotExist:
                return Response({'error': f'Inmueble {inmueble_id} no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            item_copy = item.copy()
            item_copy.pop('inmueble_id', None)
            serializer = self.get_serializer(data=item_copy)
            serializer.is_valid(raise_exception=True)
            obra = serializer.save(inmueble=inmueble)
            obras.append(self.get_serializer(obra).data)

        return Response(obras if is_many else obras[0], status=status.HTTP_201_CREATED)

class PropiedadCatastralViewSet(viewsets.ModelViewSet):
    queryset = PropiedadCatastral.objects.all()
    serializer_class = PropiedadCatastralSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        is_many = isinstance(data, list)

        items = data if is_many else [data]
        propiedades = []

        for item in items:
            inmueble_id = item.get('inmueble_id')
            if not inmueble_id:
                return Response({'error': 'Se requiere inmueble_id para cada propiedad catastral'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                inmueble = Inmueble.objects.get(pk=inmueble_id)
            except Inmueble.DoesNotExist:
                return Response({'error': f'Inmueble {inmueble_id} no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            item_copy = item.copy()
            item_copy.pop('inmueble_id', None)

            # Guardar propiedad catastral
            serializer = self.get_serializer(data=item_copy)
            serializer.is_valid(raise_exception=True)
            propiedad = serializer.save(inmueble=inmueble)
            propiedades.append(self.get_serializer(propiedad).data)

            # Crear identificador
            identificador, created = IdentificadorInmueble.objects.get_or_create(inmueble=inmueble)
            identificador.set_identificadores_desde_propiedad(propiedad)
            identificador.save()

        return Response(propiedades if is_many else propiedades[0], status=status.HTTP_201_CREATED)

class IdentificadorInmuebleViewSet(viewsets.ModelViewSet):
    queryset = IdentificadorInmueble.objects.all()
    serializer_class = IdentificadorInmuebleSerializer
 """