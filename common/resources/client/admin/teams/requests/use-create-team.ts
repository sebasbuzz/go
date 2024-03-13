import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';

export interface CreateTeamPayload {
  name: string;
  display_name: string;
}

export function useCreateTeam(
  form: UseFormReturn<CreateTeamPayload>,
) {
  const {trans} = useTrans();
  return useMutation({
    mutationFn: (props: CreateTeamPayload) => createTeam(props),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: DatatableDataQueryKey('teams'),
      });
      toast(trans(message('Team created')));
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createTeam(
  formPayload: CreateTeamPayload,
): Promise<Response> {
  const payload = {
    ...formPayload,
  };
  return apiClient.post('teams', payload).then(r => r.data);
}
