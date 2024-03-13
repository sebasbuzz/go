import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@common/http/query-client";
import { BackendResponse } from "@common/http/backend-response/backend-response";
import { Ticket } from "@app/agent/ticket";

interface Response extends BackendResponse {
  ticket: Ticket;
}

export function useTickets(id : number) {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => fetchUserTickets(id),
  });
}

function fetchUserTickets(id : number) {
  return apiClient
    .get<Response>(`tickets?userId=${id}`)
    .then(response => response.data)
}