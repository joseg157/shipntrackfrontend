export type UserPermission = {
  id: number;
  resource: string; // e.g. 'Orders', 'Users', 'Invoices', 'Reports'
  action: string; // e.g. 'read', 'write', 'update', 'delete'
  granted: boolean;
};

export type UserActivityLog = {
  id: number;
  action: string;
  description: string;
  ipAddress: string;
  timestamp: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  role?: string;
  permissions?: UserPermission[];
  activityLogs?: UserActivityLog[];
};
