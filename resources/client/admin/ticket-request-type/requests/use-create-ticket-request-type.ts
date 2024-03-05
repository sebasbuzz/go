import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
/* import {BackendResponse} from '@common/http/backend-response/backend-response'; */
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
/* import {Tag} from '@common/tags/tag'; */
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {ChipValue} from '@common/ui/forms/input-field/chip-field/chip-field';

/* interface Response extends BackendResponse {
  tag: Tag;
} */

export interface CreateTicketRequestTypePayload {
  name: string;
  display_name: string;
}

export function useCreateTicketRequestType(
  form: UseFormReturn<CreateTicketRequestTypePayload>,
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: CreateTicketRequestTypePayload) => createRequestType(props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('ticket-request-type'),
      });
      toast(trans(message('Request type created')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createRequestType(
  formPayload: CreateTicketRequestTypePayload,
): Promise<Response> {
  const payload = {
    ...formPayload,
  };
  return apiClient.post('ticket-request-type', payload).then(r => r.data);
}
