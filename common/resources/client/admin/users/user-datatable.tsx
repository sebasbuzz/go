import {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {UserDatatableFilters} from './user-datatable-filters';
import {DataTablePage} from '../../datatable/page/data-table-page';
import {Trans} from '../../i18n/trans';
import {DeleteSelectedItemsAction} from '../../datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '../../datatable/page/data-table-emty-state-message';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import teamSvg from '../roles/team.svg';
import {DataTableAddItemButton} from '../../datatable/data-table-add-item-button';
import {DataTableExportCsvButton} from '../../datatable/csv-export/data-table-export-csv-button';
import {useSettings} from '../../core/settings/use-settings';
import {userDatatableColumns} from '@common/admin/users/user-datatable-columns';
import {SyncHubstaffUsersDialog} from './hubstaff-users/hubstaff-users-dialog';
import {HubstaffUser} from './hubstaff-users/requests/use-users';
import {fetchCurrentUsers} from './hubstaff-users/requests/use-users';

export function UserDatatable() {
  const {billing} = useSettings();
  const [data, setData] = useState<HubstaffUser[]>([]);

  const filteredColumns = !billing.enable
    ? userDatatableColumns.filter(c => c.key !== 'subscribed')
    : userDatatableColumns;

  return (
    <Fragment>
      <DataTablePage
        endpoint="users"
        title={<Trans message="Users" />}
        filters={UserDatatableFilters}
        columns={filteredColumns}
        actions={<Actions data={data} setData={setData} />}
        queryParams={{with: 'subscriptions,bans'}}
        selectedActions={<DeleteSelectedItemsAction />}
        emptyStateMessage={
          <DataTableEmptyStateMessage
            image={teamSvg}
            title={<Trans message="No users have been created yet" />}
            filteringTitle={<Trans message="No matching users" />}
          />
        }
      />
    </Fragment>
  );
}

interface HubstaffUsersDialog {
  setData: (users: HubstaffUser[]) => void;
  data: HubstaffUser[]
}

function Actions({ data, setData } : HubstaffUsersDialog) {
  return (
    <Fragment>
      <DataTableExportCsvButton endpoint="users/csv/export" />
      <DataTableAddItemButton elementType={Link} to="new">
        <Trans message="Add new user" />
      </DataTableAddItemButton>
      <DialogTrigger type="modal">
      <DataTableAddItemButton onClick={async () => {
        const users = await fetchCurrentUsers();
          if (Array.isArray(users)) {
            setData(users as HubstaffUser[]);
        }
      }}>
          <Trans message="Sync Hubstaff Users" />
        </DataTableAddItemButton>
        {data && (
          <SyncHubstaffUsersDialog data={data} setData={setData} />
        )}
      </DialogTrigger>
    </Fragment>
  );
}
