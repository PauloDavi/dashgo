interface User {
  permissions: string[];
  roles: string[];
}

interface ValidateUserPermissionsProps {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: ValidateUserPermissionsProps) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAnyRole = roles.some(role => {
      return user.roles.includes(role);
    });

    if (!hasAnyRole) {
      return false;
    }
  }

  return true;
}
