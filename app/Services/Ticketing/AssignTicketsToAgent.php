<?php

namespace App\Services\Ticketing;

use App\Events\TicketsAssigned;
use App\Events\TicketUpdated;
use App\Models\Ticket;
use Illuminate\Support\Collection;

class AssignTicketsToAgent
{
    public function execute(array $ticketIds, int $agentId = null): Collection
    {
        $originalTickets = Ticket::whereIn('id', $ticketIds)->get();
        $updatedTickets = $originalTickets;

        // get only IDs of tickets that are not assigned to this user already
        $ticketIds = array_filter($ticketIds, function ($ticketId) use (
            $originalTickets,
            $agentId,
        ) {
            return $originalTickets->find($ticketId)->assigned_to !== $agentId;
        });

        if ($ticketIds) {
            Ticket::whereIn('id', $ticketIds)->update([
                'assigned_to' => $agentId,
            ]);
            $updatedTickets = Ticket::whereIn('id', $ticketIds)->get();

            // fire ticket updated event for each updated ticket
            foreach ($originalTickets as $k => $ticket) {
                event(
                    new TicketUpdated(
                        $updatedTickets[$k],
                        $originalTickets[$k],
                    ),
                );
            }

            event(new TicketsAssigned($originalTickets, $updatedTickets));
        }

        return $updatedTickets;
    }
}
