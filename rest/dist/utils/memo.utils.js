"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canAccessMemo = void 0;
const client_1 = require("@prisma/client");
const canAccessMemo = ({ userPermission, userBranch, memoAudience, userFirstName, userLastName, }) => {
    const branchSpecificAudiences = {
        [client_1.PermissionType.ACCOUNTING]: {
            [client_1.OfficeBranch.CEBU]: "Accounting Cebu",
            [client_1.OfficeBranch.CALBAYOG]: "Accounting Calbayog",
        },
        [client_1.PermissionType.RESERVATION]: {
            [client_1.OfficeBranch.CEBU]: "Reservation Cebu",
            [client_1.OfficeBranch.CALBAYOG]: "Reservation Calbayog",
        },
        [client_1.PermissionType.SUPERVISOR]: {
            [client_1.OfficeBranch.CEBU]: "Supervisor Cebu",
            [client_1.OfficeBranch.CALBAYOG]: "Supervisor Calbayog",
        },
    };
    const departmentWideAudiences = {
        [client_1.PermissionType.ACCOUNTING]: "All Accounting",
        [client_1.PermissionType.RESERVATION]: "All Reservation",
        [client_1.PermissionType.SUPERVISOR]: "All Supervisor",
    };
    // Rule 1: Super Admin has access to everything
    if (userPermission === client_1.PermissionType.SUPER_ADMIN) {
        return true;
    }
    // Rule 2: Check "All Employees"
    if (memoAudience === "All Employees") {
        return true;
    }
    // Rule 3: Branch-specific audience access
    if (branchSpecificAudiences[userPermission] &&
        branchSpecificAudiences[userPermission][userBranch] === memoAudience) {
        return true;
    }
    // Rule 4: Department-wide audience access
    if (departmentWideAudiences[userPermission] === memoAudience) {
        return true;
    }
    if (userFirstName &&
        userLastName &&
        memoAudience === `${userFirstName} ${userLastName}`) {
        return true;
    }
    // Default: Access denied
    return false;
};
exports.canAccessMemo = canAccessMemo;
