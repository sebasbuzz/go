import {useQuery} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {Ticket} from '@app/agent/ticket';
import {SimplePaginationResponse} from '@common/http/backend-response/pagination-response';
import {Reply} from '@app/agent/reply';
import {produce} from 'immer';
import {useParams} from 'react-router-dom';
import { BackendResponse } from "@common/http/backend-response/backend-response";

export interface GetTicketResponse {
  ticket: Ticket;
  replies: SimplePaginationResponse<Reply>;
  draft?: Reply;
}

export function useTicket(ticketId?: number | string) {
  const params = useParams();
  ticketId = ticketId || params.ticketId;
  return useQuery({
    queryKey: ['tickets', `${ticketId}`],
    queryFn: () => fetchTicket(ticketId!),
  });
}

export function updateTicketQuery(
  ticketId: number | string,
  updaterFn: (old: GetTicketResponse) => void,
) {
  queryClient.setQueryData<GetTicketResponse>(
    ['tickets', `${ticketId}`],
    old => {
      if (!old) return;
      return produce(old, updaterFn);
    },
  );
}

export function useTicketHcCategories(): number[] {
  const {data} = useTicket();
  return (
    data?.ticket?.tags
      ?.filter(tag => tag.type === 'category')
      .flatMap(tag => tag.categories.map(c => c.id)) || []
  );
}

interface TicketRequestType extends BackendResponse {
  ticket_request_type: {
    name: string;
    display_name: string;
    id: number;
  }
}

export function useCustomerTicketRequestType(id:number) {
  return useQuery({
    queryKey: ['ticket_request_type', `${id}`],
    queryFn: () => fetchRequestTypes(id),
  });
}

function fetchRequestTypes(id:number) {
  return apiClient
    .get<TicketRequestType>(`ticket-request-type/${id}`)
    .then(response => response.data)
}


interface Props {
  ticketRequestType: number;
}

function fetchTicket(ticketId: string | number) {
  return apiClient
    .get<GetTicketResponse>(`tickets/${ticketId}`)
    .then(response => response.data);
}
