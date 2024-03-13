import { useTickets } from "./requests/use-tickets"
import { useAuth } from "@common/auth/use-auth";
import {NavLink} from 'react-router-dom';
import { TicketTable } from "../tickets/customer-ticket-list-page/customer-ticket-list-page";
import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {Link} from 'react-router-dom';

function HomeTickets() {
  const {user} = useAuth();
  const role = Boolean(user?.roles?.find(role => role.name === "customers"));
  const id = user!?.id;
  const query = useTickets(id);
  if(!user) return;
  
  return (
    <>
      {query && role ?
        <>
          <div className="mb-34 flex items-start justify-between gap-12">
            <h1 className="text-3xl font-semibold">
              <Trans message="My requests" />
            </h1>
            <Button
              elementType={Link}
              to="/hc/tickets/new"
              size="sm"
              variant="outline"
            >
              <Trans message="New request" />
            </Button>
          </div>
          <TicketTable />
        </>
        : 
        <NavLink
          to="/admin"
        >
          Go to Admin
        </NavLink>
      } 
    </>
    
  )
}

export default HomeTickets