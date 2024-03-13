import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {CrudateTeamForm} from './crupdate-team-form';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';

import { useCreateTeam, CreateTeamPayload } from './requests/use-create-team';

export function CreateTeamDialog() {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateTeamPayload>();
  const createRequestType = useCreateTeam(form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Add new team" />
      </DialogHeader>
      <DialogBody>
        <CrudateTeamForm
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
