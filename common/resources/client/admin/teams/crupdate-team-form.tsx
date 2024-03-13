import {Form} from '@common/ui/forms/form';
import {UseFormReturn} from 'react-hook-form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {CreateTeamPayload} from './requests/use-create-team';

interface Props {
  onSubmit: (values: CreateTeamPayload) => void;
  formId: string;
  form: UseFormReturn<CreateTeamPayload>;
}
export function CrudateTeamForm({form, onSubmit, formId}: Props) {
  return (
    <Form id={formId} form={form} onSubmit={onSubmit}>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        description={<Trans message="Unique request type identifier." />}
        className="mb-20"
        required
        autoFocus
      />
      <FormTextField
        name="display_name"
        label={<Trans message="Display name" />}
        description={<Trans message="User friendly request type name." />}
        className="mb-20"
      />
    </Form>
  );
}
