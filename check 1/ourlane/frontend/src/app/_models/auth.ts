export interface IUserInformation {
    fullName: string;
    id: number;
    role: string;
    isActive: number;
    isBlocked: number;
    isDeleted: number;
    isRegistred: number;
    lastLoginTime: string | null;
    loginAttempts: number;
    loginId: string;
    mobileNumber: string | null;
    organizationId: string;
    updatedAt: string;
    updatedBy: number | null;
    uuid: string;
    userDetails: {
        city: string;
    };
}

