import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  type MRT_TableInstance,
  type MRT_RowData,
} from 'material-react-table';

interface BaseTableProps<T extends MRT_RowData> {
  table: MRT_TableInstance<T>;
  actions?: React.ReactNode;
}

function BaseTable<T extends MRT_RowData>({ table, actions }: BaseTableProps<T>) {
  return (
    <div className="tw:space-y-3">
      <div className="tw:flex tw:flex-col tw:gap-2 tw:sm:flex-row tw:sm:justify-between">
        <div className="tw:flex tw:items-center tw:gap-2">
          <MRT_GlobalFilterTextField table={table} />

          <MRT_ToggleFiltersButton table={table} />
        </div>

        {actions && <div className="tw:self-end">{actions}</div>}
      </div>

      <MaterialReactTable table={table} />
    </div>
  );
}

export default BaseTable;
