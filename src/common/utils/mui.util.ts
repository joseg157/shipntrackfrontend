import { type Theme } from '@mui/material';
import {
  type MRT_RowData,
  type MRT_TableOptions,
  type MRT_FilterOption,
} from 'material-react-table';

export const getSxTransitionMixin = (isExpanded?: boolean, property = 'width') => ({
  transition: (theme: Theme) =>
    theme.transitions.create(property, {
      easing: theme.transitions.easing.sharp,
      duration: isExpanded
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
});

export const getDrawerWidthTransitionMixin = (isExpanded: boolean) => ({
  ...getSxTransitionMixin(isExpanded, 'width'),
  overflowX: 'hidden',
});

interface GetDefaultMRTOptionsParams {
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
}

const stringColumnFilterModeOptions: MRT_FilterOption[] = [
  'fuzzy',
  'contains',
  'startsWith',
  'endsWith',
  'equals',
  'notEqual',
  'empty',
  'notEmpty',
];

const dateColumnFilterModeOptions: MRT_FilterOption[] = [
  'equals',
  'notEqual',
  'lessThan',
  'lessThanOrEqual',
  'greaterThan',
  'greaterThanOrEqual',
  'empty',
  'notEmpty',
];

const numberColumnFilterModeOptions: MRT_FilterOption[] = [
  'equals',
  'notEqual',
  'lessThan',
  'lessThanOrEqual',
  'greaterThan',
  'greaterThanOrEqual',
  'empty',
  'notEmpty',
];

export const MRT_DEFAULT_COLUMN_FILTER_MODE_OPTIONS: Record<string, MRT_FilterOption[]> = {
  string: stringColumnFilterModeOptions,
  date: dateColumnFilterModeOptions,
  number: numberColumnFilterModeOptions,
};

type MRT_Options<T extends MRT_RowData> = Omit<MRT_TableOptions<T>, 'columns' | 'data'>;

export const getDefaultMRTOptions = <T extends MRT_RowData>({
  isLoading,
  isError,
  isFetching,
}: GetDefaultMRTOptionsParams = {}): MRT_Options<T> => ({
  initialState: {
    density: 'compact',
    showColumnFilters: true,
    showGlobalFilter: true,
    globalFilterFn: 'contains',
  },

  state: {
    isLoading,
    showAlertBanner: isError,
    showProgressBars: isFetching,
  },

  muiToolbarAlertBannerProps: isError
    ? {
        severity: 'error',
        children: 'An error occurred while fetching data',
      }
    : undefined,

  // muiTableContainerProps: {
  //   className: 'tw:max-h-150',
  // },

  // muiTableHeadCellProps: {
  //   className: 'tw:px-3.5',
  // },

  // muiSearchTextFieldProps: {
  //   className: 'tw:min-w-48',
  // },

  positionActionsColumn: 'last',
  positionExpandColumn: 'first',
  positionGlobalFilter: 'left',
  positionToolbarAlertBanner: 'bottom',

  enableStickyHeader: true,
  enableColumnFilterModes: true,
  enableHiding: false,
  enableDensityToggle: false,
});
