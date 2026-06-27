import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  useMaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_ColumnDef,
} from 'material-react-table';

import Button from '@mui/material/Button';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EyeOffIcon from '@mui/icons-material/VisibilityOff';

import { getDefaultMRTOptions, MRT_DEFAULT_COLUMN_FILTER_MODE_OPTIONS } from '@utils/mui.util';
import BaseTable from '@components/BaseTable';

import type { User } from '../user.types';
import useGetUsers from '../services/useGetUsers';

function UserTable() {
  const navigate = useNavigate();

  const { data: users = [], isLoading, isError, isFetching } = useGetUsers();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        filterFn: 'contains',
      },
      {
        id: 'fullName',
        header: 'Name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        filterFn: 'contains',
        columnFilterModeOptions: MRT_DEFAULT_COLUMN_FILTER_MODE_OPTIONS.string,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterFn: 'contains',
        columnFilterModeOptions: MRT_DEFAULT_COLUMN_FILTER_MODE_OPTIONS.string,
      },
      {
        id: 'isActive',
        header: 'Active',
        accessorFn: (row) => (row.isActive ? 'Yes' : 'No'),
        filterFn: 'equals',
        filterVariant: 'select',
        filterSelectOptions: ['Yes', 'No'],
        enableColumnFilterModes: false,
        Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
      },
      {
        id: 'createdAt',
        header: 'Created At',
        accessorFn: (row) => new Date(row.createdAt + 'Z'), // Ensure it's treated as UTC
        filterVariant: 'date-range',
        enableColumnFilterModes: false,

        Cell: ({ cell }) =>
          cell.getValue<Date>()?.toLocaleString('en-US', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timeZoneName: 'short',
          }),
      },
    ],
    [],
  );

  const defaultTableOptions = useMemo(
    () => getDefaultMRTOptions<User>({ isLoading, isError, isFetching }),
    [isLoading, isError, isFetching],
  );

  const handleNavigateToUserDetail = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: users,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row, table }) => [
      <MRT_ActionMenuItem
        key="view"
        onClick={() => handleNavigateToUserDetail(row.original.id)}
        icon={<EyeOffIcon className="tw:text-blue-500" />}
        label="View"
        table={table}
      />,
      <MRT_ActionMenuItem
        key="edit"
        onClick={() => handleNavigateToUserDetail(row.original.id)}
        icon={<EditIcon />}
        label="Edit"
        table={table}
      />,
    ],
  });

  return (
    <BaseTable
      table={table}
      actions={
        <Button variant="contained" color="primary" startIcon={<AddOutlinedIcon />}>
          Add User
        </Button>
      }
    />
  );
}

export default UserTable;
