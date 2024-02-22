import {
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@common/i18n/message';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {USER_MODEL} from '@common/auth/user';

export const CannedRepliesDatatableFilters: BackendFilter[] = [
  {
    key: 'shared',
    label: message('Shared'),
    description: message('Whether reply is marked as shared'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.BooleanToggle,
      defaultValue: true,
    },
  },
  {
    key: 'user_id',
    label: message('Owner'),
    description: message('User this reply was created by'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
  createdAtFilter({
    description: message('Date reply was created'),
  }),
  updatedAtFilter({
    description: message('Date reply was last updated'),
  }),
];
