import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {TeamTypes} from './teams-index-page';
import { UpdateTeamPayload, useUpdateTeam } from './requests/use-update-team';
import { CrudateTeamForm } from './crupdate-team-form';

interface Props {
  team: TeamTypes;
}
export function UpdateTeamDialog({team}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateTeamPayload>({
    defaultValues: {
      name: team.name,
      display_name: team.display_name,
    },
  });
  const updateTeam = useUpdateTeam(team.id, form);

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Update ticket request type" />
      </DialogHeader>
      <DialogBody>
        <CrudateTeamForm
          formId={formId}
          form={form as any}
          onSubmit={values => {
            updateTeam.mutate(values, {
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
          disabled={updateTeam.isPending}
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
