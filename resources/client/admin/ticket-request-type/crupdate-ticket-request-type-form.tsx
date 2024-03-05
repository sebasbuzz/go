import {Form} from '@common/ui/forms/form';
import {UseFormReturn} from 'react-hook-form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import { CreateTicketRequestTypePayload } from '@app/admin/ticket-request-type/requests/use-create-ticket-request-type';

interface Props {
  onSubmit: (values: CreateTicketRequestTypePayload) => void;
  formId: string;
  form: UseFormReturn<CreateTicketRequestTypePayload>;
}
export function CrupdateTicketRequestTypeForm({form, onSubmit, formId}: Props) {
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
