import {useMutation} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import { BackendResponse } from '@common/http/backend-response/backend-response';
import {useTrans} from '@common/i18n/use-trans';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {DatatableDataQueryKey} from '@common/datatable/requests/paginated-resources';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';

export interface CreateHubstaffTokenPayload {
  refresh_token: string;
  access_token: string;
  expires_in: number;
}

interface ResponseTokenExpired extends BackendResponse {
  expired_token: number
}

export const saveToken = async (form : CreateHubstaffTokenPayload) => {
  const data = {
    refresh_token: form.refresh_token,
    expired_token: form.expires_in,
    access_token: form.access_token
  }
  return apiClient.post('hubstaff-token', data).then(r => r.data);
}

export function useGetTokenExpired() {
  return useQuery({
    queryKey: ['hubstaff-token'],
    queryFn: () => fetchTokenExpired(),
  });
}

function fetchTokenExpired() {
  return apiClient
    .get<ResponseTokenExpired>(`hubstaff-token`)
    .then(response => response.data)
}