import { useCustomerTicketRequestType } from "../agent-ticket-page/requests/use-ticket";

interface Props {
  ticketRequestType: number;
}

const badget = "relative flex flex-shrink-0 items-center justify-center gap-10 overflow-hidden whitespace-nowrap outline-none after:pointer-events-none rounded-full bg-chip text-main pl-8 h-20 text-xs font-medium hover:after:bg-black/5 focus:after:bg-black/10"

export function TicketTypeRequestTag ( {ticketRequestType} : Props) {
  const query = useCustomerTicketRequestType(ticketRequestType);

  return (<>
      {query && query.data && (
        <div className={badget}>{query.data.ticket_request_type?.display_name}</div>
      )}
    </>
  )
}

export default TicketTypeRequestTag