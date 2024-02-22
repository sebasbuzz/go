import React, {forwardRef, ReactNode} from 'react';
import clsx from 'clsx';
import {FileTypeIcon} from '@common/uploads/file-type-icon/file-type-icon';
import {FormattedBytes} from '@common/uploads/formatted-bytes';
import {ProgressBar} from '@common/ui/progress/progress-bar';
import {FileEntry} from '@common/uploads/file-entry';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {FilePreviewDialog} from '@common/uploads/preview/file-preview-dialog';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {FileEntryUrlsContext} from '@common/uploads/hooks/file-entry-urls';

const previewSearchParams = {
  ticketEntry: 'true',
};

interface Props {
  children: ReactNode;
  className?: string;
}
export function AttachmentListLayout({children, className}: Props) {
  return (
    <FileEntryUrlsContext.Provider value={previewSearchParams}>
      <div className={clsx('flex items-center gap-8', className)}>
        {children}
      </div>
    </FileEntryUrlsContext.Provider>
  );
}

interface AttachmentLayoutProps {
  name: string;
  mime: string;
  size: number | undefined;
  onRemove?: () => void;
  progress?: number;
}
export const AttachmentLayout = forwardRef<
  HTMLDivElement,
  AttachmentLayoutProps
>(({name, mime, size, onRemove, progress, ...htmlProps}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'relative flex min-h-30 w-max flex-shrink-0 items-center gap-6 rounded-lg border pl-8 transition-opacity',
        ref && 'cursor-pointer hover:bg-hover',
        !onRemove && 'pr-8',
      )}
      {...htmlProps}
    >
      <FileTypeIcon mime={mime} size="xs" />
      <div className="max-w-140 overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-bold text-muted">
        {name}
      </div>
      {size ? (
        <div className="text-xs text-muted">
          (<FormattedBytes bytes={size} />)
        </div>
      ) : null}
      {onRemove ? (
        <IconButton
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          size="xs"
          className="text-muted"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      {progress ? (
        <ProgressBar
          value={progress}
          className="absolute bottom-0 left-0 w-full"
          size="xs"
        />
      ) : null}
    </div>
  );
});

interface FileEntryAttachmentLayoutProps {
  attachments: FileEntry[];
  index: number;
  onRemove?: () => void;
}
export function FileEntryAttachmentLayout({
  attachments,
  index,
  onRemove,
}: FileEntryAttachmentLayoutProps) {
  const attachment = attachments[index];
  return (
    <DialogTrigger type="modal">
      <AttachmentLayout
        name={attachment.name}
        mime={attachment.mime}
        size={attachment.file_size}
        onRemove={onRemove}
      />
      <FilePreviewDialog entries={attachments} defaultActiveIndex={index} />
    </DialogTrigger>
  );
}
