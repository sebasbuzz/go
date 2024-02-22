import {Article} from '@app/help-center/articles/article';
import {BulletSeparatedItems} from '@common/ui/bullet-seprated-items';
import {FormattedBytes} from '@common/uploads/formatted-bytes';
import {Trans} from '@common/i18n/trans';
import {useSettings} from '@common/core/settings/use-settings';
import {AttachFileIcon} from '@common/icons/material/AttachFile';

interface Props {
  article: Article;
}
export function ArticleAttachments({article}: Props) {
  const {base_url} = useSettings();
  return (
    <div className="space-y-12">
      {article.attachments?.map(attachment => {
        const downloadLink = `${base_url}/file-entries/download/${attachment.hash}`;
        return (
          <div key={attachment.id} className="flex items-start gap-4">
            <AttachFileIcon className="mt-6" size="sm" />
            <div>
              <a
                href={downloadLink}
                download
                className="text-sm text-primary hover:underline"
              >
                {attachment.name}
              </a>
              <BulletSeparatedItems className="mt-4 text-xs text-muted">
                <FormattedBytes bytes={attachment.file_size} />
                <a href={downloadLink} download className="hover:underline">
                  <Trans message="Download" />
                </a>
              </BulletSeparatedItems>
            </div>
          </div>
        );
      })}
    </div>
  );
}
