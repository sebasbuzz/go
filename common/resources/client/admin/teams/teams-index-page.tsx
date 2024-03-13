import {DataTablePage} from '../../datatable/page/data-table-page';
import {IconButton} from '../../ui/buttons/icon-button';
import {EditIcon} from '../../icons/material/Edit';
import {FormattedDate} from '../../i18n/formatted-date';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {ColumnConfig} from '../../datatable/column-config';
import {Trans} from '../../i18n/trans';
import teamSvg from './team.svg';
import {DeleteSelectedItemsAction} from '../../datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '../../datatable/page/data-table-emty-state-message';
import {DataTableAddItemButton} from '../../datatable/data-table-add-item-button';
import {CreateTeamDialog} from './create-team-dialog';
import {UpdateTeamDialog} from './update-team-dialog';

export interface TeamTypes {
  id: number;
  name: string;
  display_name: string;
  created_at?: string;
  updated_at?: string;
}

const columnConfig: ColumnConfig<TeamTypes>[] = [
  {
    key: 'name',
    allowsSorting: true,
    visibleInMode: 'all',
    header: () => <Trans message="Team" />,
    body: team => (
      <div>
        <div>
          <Trans message={team?.display_name  || team.name} />
        </div>
        <div className="text-muted text-xs overflow-x-hidden overflow-ellipsis">
         {/*  {role.description ? <Trans message={role.description} /> : undefined} */}
        </div>
      </div>
    ),
  },
  {
    key: 'identifier',
    maxWidth: 'max-w-100',
    allowsSorting: true,
    header: () => <Trans message="Identifier" />,
    body: team => <Trans message={team.name || team?.display_name} />,
  },
  {
    key: 'updated_at',
    maxWidth: 'max-w-100',
    allowsSorting: true,
    header: () => <Trans message="Last updated" />,
    body: team => <FormattedDate date={team.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: team => (
      <DialogTrigger type="modal">
        <IconButton size="md" className="text-muted">
          <EditIcon />
        </IconButton>
        <UpdateTeamDialog team={team} />
      </DialogTrigger>
    ),
  },
];

export function TeamsIndexPage() {
  return (
    <DataTablePage
      endpoint="teams"
      title={<Trans message="Teams" />}
      columns={columnConfig}
      /* filters={RoleIndexPageFilters} */
      actions={<Actions />}
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={teamSvg}
          title={<Trans message="No teams have been created yet" />}
          filteringTitle={<Trans message="No matching teams" />}
        />
      }
    />
  );
}

function Actions() {
  return (
    <>
      <DialogTrigger type="modal">
        <DataTableAddItemButton>
          <Trans message="Add new team" />
        </DataTableAddItemButton>
        <CreateTeamDialog />
      </DialogTrigger>
    </>
  );
}