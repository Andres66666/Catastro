#urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ClasificacionDerechoViewSet,
    IdentificadorInmuebleViewSet,
    InmuebleViewSet,
    LoginView,
    ObraGruesaViewSet,
    PermisosViewSet,
    PropiedadCatastralViewSet,
    PropietarioViewSet,
    
    RolesViewSet,
    UsuariosViewSet,
    UsuariosRolesViewSet,
    RolesPermisosViewSet,
)

# Crea un router y registra tus ViewSets
router = DefaultRouter()
router.register(r'permisos', PermisosViewSet)
router.register(r'roles', RolesViewSet)
router.register(r'usuarios', UsuariosViewSet)
router.register(r'usuariosroles', UsuariosRolesViewSet)
router.register(r'rolespermisos', RolesPermisosViewSet)
router.register(r'inmuebles', InmuebleViewSet) 
router.register(r'propietarios', PropietarioViewSet)
router.register(r'clasificaciones', ClasificacionDerechoViewSet)
router.register(r'propiedadCatastral', PropiedadCatastralViewSet)
router.register(r'obrasGruesas', ObraGruesaViewSet)  
router.register(r'identificadores', IdentificadorInmuebleViewSet)



urlpatterns = [
    path('', include(router.urls)),  # Incluye las rutas generadas por el router
    path('login/', LoginView.as_view(), name='login'),  # Ruta para el inicio de sesión
]