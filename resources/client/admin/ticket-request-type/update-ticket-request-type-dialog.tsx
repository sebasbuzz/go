import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrupdateTicketRequestTypeForm} from '@app/admin/ticket-request-type/crupdate-ticket-request-type-form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
/* import {TicketTag} from '@app/agent/ticket'; */
import { TicketRequestType } from '@app/agent/ticket-request-type';
import {
  UpdateTicketRequestTypePayload,
  useUpdateTicketRequestType,
} from '@app/admin/ticket-request-type/requests/use-update-ticket-request-type';

interface Props {
  requestType: TicketRequestType;
}
export function UpdateTicketRequestTypeDialog({requestType}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateTicketRequestTypePayload>({
    defaultValues: {
      name: requestType.name,
      display_name: requestType.display_name,
    },
  });
  const updateCategory = useUpdateTicketRequestType(requestType.id, form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Update ticket request type" />
      </DialogHeader>
      <DialogBody>
        <CrupdateTicketRequestTypeForm
          formId={formId}
          form={form as any}
          onSubmit={values => {
            updateCategory.mutate(values, {
              onSuccess: () => close(),
            });
          }}
        />
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          disabled={updateCategory.isPending}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
