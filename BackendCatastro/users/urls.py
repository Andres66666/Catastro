#urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    LoginView,
    PermisosViewSet,
    PropietarioCreateViewSet,
    
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
router.register(r'propietarios', PropietarioCreateViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Incluye las rutas generadas por el router
    path('login/', LoginView.as_view(), name='login'),  # Ruta para el inicio de sesión
]