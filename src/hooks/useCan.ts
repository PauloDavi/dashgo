import { useAuth } from '@contexts/AuthContext';
import { validateUserPermissions } from '@utils/ValidateUserPermissions';

interface UseCanProps {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermission = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  return userHasValidPermission;
}
