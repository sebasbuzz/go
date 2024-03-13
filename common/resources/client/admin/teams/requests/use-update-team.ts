import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {CreateTicketRequestTypePayload} from '@app/admin/ticket-request-type/requests/use-create-ticket-request-type';

export interface UpdateTeamPayload
  extends Partial<CreateTicketRequestTypePayload> {}

export function useUpdateTeam(
  teamId: number | string,
  form: UseFormReturn<UpdateTeamPayload>,
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: UpdateTeamPayload) =>
      updateTeam(teamId, props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('teams'),
      });
      toast(trans(message('Team updated')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function updateTeam(
  teamId: number | string,
  formPayload: UpdateTeamPayload,
): Promise<Response> {
  const payload = {
    ...formPayload,
  };
  return apiClient
    .put(`teams/${teamId}`, payload)
    .then(r => r.data);
}
