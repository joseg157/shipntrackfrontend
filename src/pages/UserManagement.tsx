import { UserTable } from '@features/userManagement';
import DocumentTitle from '@components/DocumentTitle';

function UserManagement() {
  return (
    <div>
      <DocumentTitle documentTitle="User Management" title="Users" />
      <p className="tw:mb-2 tw:text-gray-600">
        Manage your team and their account permissions here
      </p>

      <UserTable />
    </div>
  );
}

export default UserManagement;
