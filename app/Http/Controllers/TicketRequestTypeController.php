<?php

namespace App\Http\Controllers;

use App\Models\TicketRequestType; 
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TicketRequestTypeController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $query = TicketRequestType::query();

        if (request()->has('display_name')) {
            $displayName = request('display_name');
            $query->mysqlSearch($displayName);
        }

        $dataSource = new Datasource(
            $query,
            request()->all(),
        );

        $pagination = $dataSource->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function store()
    {
        $data = $this->validate(request(), [
            'name' => 'required|string|min:2',
            'display_name' => 'string|min:2',
        ]);

        $data['user_id'] = Auth::id(); 

        $ticketRequestType = TicketRequestType::create([
            'name' => $data['name'],
            'display_name' => $data['display_name'] ?? $data['name'],
            'user_id' => $data['user_id'], 
        ]);

        return $this->success(['ticket_request_type' => $ticketRequestType]);
    }

    public function destroy(string $ids)
    {
        $requesttypeIds = explode(',', $ids);
        /* $this->authorize('destroy', [TicketRequestType::class, $requesttypeIds]); */

        TicketRequestType::whereIn('id', $requesttypeIds)->delete();

        return $this->success();
    }

    public function update(int $requesttypeId)
    {
        /* $this->authorize('update', Tag::class); */

        $data = $this->validate(request(), [
            'name' => "string|min:2|unique:ticket_request_type,name,$requesttypeId",
            'display_name' => 'string|min:2',
        ]);

        $requesttype = TicketRequestType::findOrFail($requesttypeId);

        $requesttype->fill([
            'name' => $data['name'],
            'display_name' => $data['display_name'],
        ])->save();

        return $this->success(['ticket_request_type' => $requesttype]);
    }

    public function show(TicketRequestType $id)
    {
        /* $this->authorize('show', $id); */

        if ($id) {
            $response = [
                'name' => $id->name,
                'display_name' => $id->display_name,
            ];

            return $this->success(['ticket_request_type' => $response]);
        }
    }
}
