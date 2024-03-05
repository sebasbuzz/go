import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';

import { TicketRequestType } from '@app/agent/ticket-request-type';

interface Response extends PaginatedBackendResponse<TicketRequestType> {}

export function useCustomerTicketRequestTypes() {
  return useQuery({
    queryKey: ['new-ticket-request-type'],
    queryFn: () => fetchRequestTypes(),
  });
}

function fetchRequestTypes() {
  return apiClient
    .get<Response>(`ticket-request-type`, {
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
