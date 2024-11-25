import { OfficeBranch, PermissionType, UserType } from "@prisma/client"

type CanAccessMemoParams = {
  userPermission: PermissionType,
  userBranch: OfficeBranch,
  memoAudience: string
}

export const canAccessMemo = ({
  userPermission,
  userBranch,
  memoAudience,
}: CanAccessMemoParams): boolean => {
  const branchSpecificAudiences = {
    [PermissionType.ACCOUNTING]: {
      [OfficeBranch.CEBU]: "Accounting Cebu",
      [OfficeBranch.CALBAYOG]: "Accounting Calbayog",
    },
    [PermissionType.RESERVATION]: {
      [OfficeBranch.CEBU]: "Reservation Cebu",
      [OfficeBranch.CALBAYOG]: "Reservation Calbayog",
    },
    [PermissionType.SUPERVISOR]: {
      [OfficeBranch.CEBU]: "Supervisor Cebu",
      [OfficeBranch.CALBAYOG]: "Supervisor Calbayog",
    },
  };

  const departmentWideAudiences = {
    [PermissionType.ACCOUNTING]: "All Accounting",
    [PermissionType.RESERVATION]: "All Reservation",
    [PermissionType.SUPERVISOR]: "All Supervisor",
  };

  // Rule 1: Super Admin has access to everything
  if (userPermission === PermissionType.SUPER_ADMIN) {
    return true;
  }

  // Rule 2: Check "All Employees"
  if (memoAudience === "All Employees") {
    return true;
  }

  // Rule 3: Branch-specific audience access
  if (
    branchSpecificAudiences[userPermission] &&
    branchSpecificAudiences[userPermission][userBranch] === memoAudience
  ) {
    return true;
  }

  // Rule 4: Department-wide audience access
  if (departmentWideAudiences[userPermission] === memoAudience) {
    return true;
  }

  // Default: Access denied
  return false;
};
