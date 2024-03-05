import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrupdateTicketRequestTypeForm} from '@app/admin/ticket-request-type/crupdate-ticket-request-type-form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {
  CreateTicketRequestTypePayload,
  useCreateTicketRequestType,
} from '@app/admin/ticket-request-type/requests/use-create-ticket-request-type';

export function CreateTicketRequestTypeDialog() {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateTicketRequestTypePayload>();
  const createRequestType = useCreateTicketRequestType(form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add ticket request type" />
      </DialogHeader>
      <DialogBody>
        <CrupdateTicketRequestTypeForm
          formId={formId}
          form={form}
          onSubmit={values => {
            createRequestType.mutate(values, {
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
          disabled={createRequestType.isPending}
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
