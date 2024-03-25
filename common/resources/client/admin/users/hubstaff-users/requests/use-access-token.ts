import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';

import {User} from '@common/auth/user';

interface Response extends PaginatedBackendResponse<User> {}

export function useGetAcessToken() {
  return useQuery({
    queryKey: ['hubstaff-access-token'],
    queryFn: () => fetchAccessToken(),
  });
}

function fetchAccessToken() {
  return apiClient
    .get<Response>(`hubstaff-access-token`)
    .then(response => response.data);
}
