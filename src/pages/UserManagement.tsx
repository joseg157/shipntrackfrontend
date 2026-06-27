import { UserTable } from '@features/userManagement';
import withDocumentTitle from '@components/withDocumentTitle';

function UserManagement() {
  return (
    <div>
      <h5 className="tw:text-2xl tw:font-bold">Users</h5>
      <p className="tw:mb-2 tw:text-gray-600">
        Manage your team and their account permissions here
      </p>

      <UserTable />
    </div>
  );
}

const UserManagementWithTitle = withDocumentTitle(UserManagement, {
  documentTitle: 'User Management',
});

export default UserManagementWithTitle;
