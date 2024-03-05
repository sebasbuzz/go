import {useQuery} from "@tanstack/react-query";
import {apiClient} from "@common/http/query-client";
import { BackendResponse } from "@common/http/backend-response/backend-response";

interface TicketRequestType extends BackendResponse {
  ticket_request_type: {
    name: string;
    display_name: string;
  }

}

function useCustomerTicketRequestType(id:number) {
  return useQuery({
    queryKey: ['new-ticket-request-type'],
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

const badget = "relative flex flex-shrink-0 items-center justify-center gap-10 overflow-hidden whitespace-nowrap outline-none after:pointer-events-none rounded-full bg-chip text-main pl-8 h-20 text-xs font-medium hover:after:bg-black/5 focus:after:bg-black/10"

export function TicketTypeRequestTag ( {ticketRequestType} : Props) {
  const query = useCustomerTicketRequestType(ticketRequestType);

  return (
    <div className={badget}>{query && query.data && query.data.ticket_request_type.display_name}</div>
  )
}

export default TicketTypeRequestTag