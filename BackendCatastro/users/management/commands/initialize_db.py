from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from users.models import Roles, Permisos, Usuarios, UsuariosRoles, RolesPermisos
from datetime import date

class Command(BaseCommand):
    help = 'Inicializa la base de datos con usuarios, roles y permisos para RBAC'

    def handle(self, *args, **kwargs):
        self.stdout.write("🔄 Inicializando base de datos con RBAC...")

        # --- CREAR ROLES ---
        admin_role, _ = Roles.objects.get_or_create(nombre_rol="Administrador", defaults={'estado_Rol': True})
        empleado_role, _ = Roles.objects.get_or_create(nombre_rol="Empleado", defaults={'estado_Rol': True})

        # --- CREAR PERMISOS ---
        permisos_data = [
            "GestionDeUsuarios",
            "GestionDeCatastro",
            "GestionDeReportes",
            "ListarRoles",
            "ListarPermisos",
            "ListarUsuarios",
            "ListarUsuarioRol",
            "ListarRolPermiso",
        ]

        permisos_objetos = {}
        for nombre_permiso in permisos_data:
            permiso, _ = Permisos.objects.get_or_create(nombre_permiso=nombre_permiso, defaults={'estado_Permiso': True})
            permisos_objetos[nombre_permiso] = permiso

        # --- ASIGNAR PERMISOS A ROLES ---
        for permiso in permisos_objetos.values():
            RolesPermisos.objects.get_or_create(rol=admin_role, permiso=permiso)

        permisos_empleado = ["ListarUsuarios", "ListarPermisos"]
        for nombre_permiso in permisos_empleado:
            RolesPermisos.objects.get_or_create(rol=empleado_role, permiso=permisos_objetos[nombre_permiso])

        # --- CREAR USUARIO ADMINISTRADOR ---
        admin_user, created_admin = Usuarios.objects.get_or_create(
            ci="13247291",
            defaults={
                'nombre_usuario': "Andres Benito",
                'apellido': "Yucra",
                'fecha_nacimiento': date(1998, 11, 6),
                'telefono': "72937437",
                'correo': "benitoandrescalle035@gmail.com",
                'password': make_password("Andres1234*"),
                'estado_Usuario': True,
            }
        )
        UsuariosRoles.objects.get_or_create(usuario=admin_user, rol=admin_role)
        if created_admin:
            self.stdout.write(f"✅ Usuario administrador creado: {admin_user}")

        # --- CREAR USUARIO EMPLEADO ---
        empleado_user, created_empleado = Usuarios.objects.get_or_create(
            ci="87654321",
            defaults={
                'nombre_usuario': "Juan Carlos",
                'apellido': "Pérez",
                'fecha_nacimiento': date(1990, 5, 15),
                'telefono': "78945612",
                'correo': "juanperez@example.com",
                'password': make_password("Empleado123*"),
                'estado_Usuario': True,
            }
        )
        UsuariosRoles.objects.get_or_create(usuario=empleado_user, rol=empleado_role)
        if created_empleado:
            self.stdout.write(f"✅ Usuario empleado creado: {empleado_user}")

        self.stdout.write(self.style.SUCCESS("🎉 ¡Base de datos RBAC inicializada exitosamente!"))

        # --- INSTRUCCIONES ---
        # Ejecutar en terminal:
        # python manage.py initialize_db
        # Luego levantar servidor:
        # python manage.py runserver
