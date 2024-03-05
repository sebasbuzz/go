 import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import {UpdateTicketRequestTypeDialog} from '@app/admin/ticket-request-type/update-ticket-request-type-dialog';
import {DataTablePage} from '@common/datatable/page/data-table-page';
import {DeleteSelectedItemsAction} from '@common/datatable/page/delete-selected-items-action';
import {DataTableEmptyStateMessage} from '@common/datatable/page/data-table-emty-state-message';
import softwareEngineerSvg from './software-engineer.svg';
import {DataTableAddItemButton} from '@common/datatable/data-table-add-item-button';
import { CreateTicketRequestTypeDialog } from './create-ticket-request-type-dialog';
import {TicketRequestType} from '@app/agent/ticket-request-type';

const columnConfig: ColumnConfig<TicketRequestType>[] = [
  {
    key: 'display_name',
    visibleInMode: 'all',
    header: () => <Trans message="Name" />,
    body: category => category.display_name,
  },
  {
    key: 'name',
    allowsSorting: true,
    header: () => <Trans message="Identifier" />,
    body: category => category.name,
  },
  {
    key: 'updated_at',
    allowsSorting: true,
    width: 'w-100',
    header: () => <Trans message="Last updated" />,
    body: category => <FormattedDate date={category.updated_at} />,
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    hideHeader: true,
    align: 'end',
    width: 'w-42 flex-shrink-0',
    visibleInMode: 'all',
    body: category => (
      <DialogTrigger type="modal">
        <IconButton size="md" className="text-muted">
          <EditIcon />
        </IconButton>
        <UpdateTicketRequestTypeDialog requestType={category} />
      </DialogTrigger>
    ),
  },
];

export function TicketRequestType() {
  return (
    <DataTablePage
      endpoint="ticket-request-type"
      title={<Trans message="Ticket Request Type" />}
      columns={columnConfig}
      actions={<Actions />}
      /* queryParams={{
        with: 'categories',
      }} */
      selectedActions={<DeleteSelectedItemsAction />}
      emptyStateMessage={
        <DataTableEmptyStateMessage
          image={softwareEngineerSvg}
          title={<Trans message="No Request Types have been created yet" />}
          filteringTitle={<Trans message="No matching Request Types" />}
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
          <Trans message="Add ticket request type" />
        </DataTableAddItemButton>
        <CreateTicketRequestTypeDialog />
      </DialogTrigger>
    </>
  );
}
