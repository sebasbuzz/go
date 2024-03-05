import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
/* import {BackendResponse} from '@common/http/backend-response/backend-response'; */
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {Tag} from '@common/tags/tag';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {CreateTicketCategoryPayload} from '@app/admin/ticket-categories/requests/use-create-ticket-category';
import {CreateTicketRequestTypePayload} from '@app/admin/ticket-request-type/requests/use-create-ticket-request-type';
/* import {  } */

/* interface Response extends BackendResponse {
  tag: Tag;
} */

export interface UpdateTicketRequestTypePayload
  extends Partial<CreateTicketRequestTypePayload> {}

export function useUpdateTicketRequestType(
  requestTypeId: number | string,
  form: UseFormReturn<UpdateTicketRequestTypePayload>,
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: UpdateTicketRequestTypePayload) =>
      updateCategory(requestTypeId, props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('ticket-request-type'),
      });
      toast(trans(message('Request type updated')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateCategory(
  requestTypeId: number | string,
  formPayload: UpdateTicketRequestTypePayload,
): Promise<Response> {
  const payload = {
    ...formPayload,
  };
  return apiClient
    .put(`ticket-request-type/${requestTypeId}`, payload)
    .then(r => r.data);
}
