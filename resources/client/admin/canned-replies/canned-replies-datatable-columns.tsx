import {ColumnConfig} from '@common/datatable/column-config';
import {Trans} from '@common/i18n/trans';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Tooltip} from '@common/ui/tooltip/tooltip';
import {IconButton} from '@common/ui/buttons/icon-button';
import {EditIcon} from '@common/icons/material/Edit';
import React, {useContext} from 'react';
import {TableContext} from '@common/ui/tables/table-context';
import clsx from 'clsx';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {DeleteIcon} from '@common/icons/material/Delete';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {CannedReply} from '@app/agent/agent-ticket-page/canned-replies/canned-reply';
import {useDeleteCannedReplies} from '@app/agent/agent-ticket-page/canned-replies/requests/use-delete-canned-replies';
import {CheckIcon} from '@common/icons/material/Check';
import {CloseIcon} from '@common/icons/material/Close';
import {NameWithAvatar} from '@common/datatable/column-templates/name-with-avatar';
import {UpdateCannedReplyDialog} from '@app/agent/agent-ticket-page/canned-replies/update-canned-reply-dialog';
import {truncateString} from '@common/utils/string/truncate-string';
import {stripTags} from '@common/utils/string/strip-tags';

export const CannedRepliesDatatableColumns: ColumnConfig<CannedReply>[] = [
  {
    key: 'name',
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    header: () => <Trans message="Saved reply" />,
    body: reply => <CannedReplyColumn reply={reply} />,
  },
  {
    key: 'user_id',
    allowsSorting: true,
    width: 'min-w-200',
    visibleInMode: 'all',
    header: () => <Trans message="Owner" />,
    body: reply =>
      reply.user ? (
        <NameWithAvatar
          image={reply.user.avatar}
          label={reply.user.display_name}
          description={reply.user.email}
        />
      ) : null,
  },
  {
    key: 'shared',
    allowsSorting: true,
    width: 'w-60 flex-shrink-0',
    header: () => <Trans message="Shared" />,
    body: reply =>
      reply.shared ? (
        <CheckIcon size="md" className="text-positive" />
      ) : (
        <CloseIcon size="md" className="text-danger" />
      ),
  },
  {
    key: 'updatedAt',
    allowsSorting: true,
    width: 'w-96',
    header: () => <Trans message="Last updated" />,
    body: reply => (
      <time>
        <FormattedDate date={reply.updated_at} />
      </time>
    ),
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    width: 'w-84 flex-shrink-0',
    hideHeader: true,
    align: 'end',
    visibleInMode: 'all',
    body: reply => (
      <div className="text-muted">
        <DialogTrigger type="modal">
          <Tooltip label={<Trans message="Edit reply" />}>
            <IconButton size="md">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <UpdateCannedReplyDialog reply={reply} />
        </DialogTrigger>
        <DialogTrigger type="modal">
          <Tooltip label={<Trans message="Delete reply" />}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <DeleteCannedReplyDialog reply={reply} />
        </DialogTrigger>
      </div>
    ),
  },
];

interface CannedReplyColumnProps {
  reply: CannedReply;
}
function CannedReplyColumn({reply}: CannedReplyColumnProps) {
  const {isCollapsedMode} = useContext(TableContext);
  return (
    <div className="min-w-0">
      <div
        className={clsx(
          isCollapsedMode
            ? 'whitespace-normal'
            : 'overflow-hidden overflow-ellipsis whitespace-nowrap font-medium',
        )}
      >
        {reply.name}
      </div>
      {!isCollapsedMode && (
        <p className="mt-4 max-w-680 whitespace-normal text-xs text-muted">
          {truncateString(stripTags(reply.body), 230)}
        </p>
      )}
    </div>
  );
}

interface DeleteCannedReplyDialogProps {
  reply: CannedReply;
}
export function DeleteCannedReplyDialog({reply}: DeleteCannedReplyDialogProps) {
  const deleteReplies = useDeleteCannedReplies();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      isLoading={deleteReplies.isPending}
      title={<Trans message="Delete saved reply" />}
      body={
        <Trans message="Are you sure you want to delete this saved reply?" />
      }
      confirm={<Trans message="Delete" />}
      onConfirm={() => {
        deleteReplies.mutate({ids: [reply.id]}, {onSuccess: () => close()});
      }}
    />
  );
}
