import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import { BackendResponse } from '@common/http/backend-response/backend-response';

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