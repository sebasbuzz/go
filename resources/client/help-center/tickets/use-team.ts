import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import { BackendResponse } from '@common/http/backend-response/backend-response';

import { TeamTypes } from '@common/admin/teams/teams-index-page';

interface Response extends BackendResponse {
  team: TeamTypes
}

export function useTeam(id:number | undefined) {
  return useQuery({
    queryKey: ['new-team', id],
    queryFn: () => fetchTeam(id),
  });
}

function fetchTeam(id:number | undefined) {
  return apiClient
    .get<Response>(`teams/${id}`)
    .then(response => response.data)
}
