import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';

import { TeamTypes } from '@common/admin/teams/teams-index-page';

interface Response extends PaginatedBackendResponse<TeamTypes> {}

export function useTeams() {
  return useQuery({
    queryKey: ['new-teams'],
    queryFn: () => fetchTeams(),
  });
}

function fetchTeams() {
  return apiClient
    .get<Response>(`teams`, {
      params: {
        perPage: 25,
        with: '',
        orderBy: 'name',
        orderDir: 'asc',
        filterByPurchases: false,
        paginate: 'simple',
      },
    })
    .then(response => response.data);
}
