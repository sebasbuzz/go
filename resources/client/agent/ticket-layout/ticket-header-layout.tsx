import {FormattedRelativeTime} from '@common/i18n/formatted-relative-time';
import {FormattedDate} from '@common/i18n/formatted-date';
import {Fragment, ReactNode} from 'react';
import {Ticket} from '@app/agent/ticket';
import TicketTypeRequestTag from './ticket-type-request-tag';

export const TicketHeaderDateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};

interface Props {
  ticket: Ticket;
  children?: ReactNode;
  actions?: ReactNode;
}
export function TicketHeaderLayout({ticket, actions, children}: Props) {
  return (
    <Fragment>
      <div className="flex items-start gap-12 px-20 py-14 max-md:flex-col md:items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl">{ticket.subject}</h1>
          <TicketTypeRequestTag ticketRequestType={ticket.ticket_request_type} />
        </div>
        {children}
        <div className="mr-24 max-md:hidden" />
        <div className="whitespace-nowrap text-muted md:ml-auto">
          <FormattedRelativeTime date={ticket.created_at} /> (
          <FormattedDate
            date={ticket.created_at}
            options={TicketHeaderDateFormat}
          />
          )
        </div>
        {actions}
      </div>
    </Fragment>
  );
}
