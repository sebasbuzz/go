<?php

namespace App\Http\Controllers;

use App\Models\HubstaffToken; 
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HubstaffTokenController extends BaseController
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /* public function index()
    {
        $hubstaffToken = HubstaffToken::first();

        return $this->success(['hubstaff_token' => $hubstaffToken]);
    } */

    public function index()
    {
        $expiredToken = HubstaffToken::pluck('expired_token')->first();

        if (!$expiredToken) {
            return $this->error('No data found.', 404);
        }

        return $this->success(['expired_token' => $expiredToken]);
    }

    public function store()
    {
        $data = $this->validate(request(), [
            'refresh_token' => 'required|string|min:1',
            'access_token' => 'required|string|min:1',
            'expired_token' => 'required',
        ]);

        $existingToken = HubstaffToken::first();

        if ($existingToken) {
            $existingToken->update([
                'refresh_token' => $data['refresh_token'],
                'access_token' => $data['access_token'],
                'expired_token' => $data['expired_token'], 
            ]);
            return $this->success(['hubstaff_token' => $existingToken]);
        } else {
            $hubstaffToken = HubstaffToken::create([
                'refresh_token' => $data['refresh_token'],
                'access_token' => $data['access_token'],
                'expired_token' => $data['expired_token'], 
            ]);
            return $this->success(['hubstaff_token' => $hubstaffToken]);
        }
    }

    /* public function destroy(string $ids)
    {
        $requesttypeIds = explode(',', $ids);
        //$this->authorize('destroy', [TicketRequestType::class, $requesttypeIds]);

        TicketRequestType::whereIn('id', $requesttypeIds)->delete();

        return $this->success();
    } */

    /* public function update(int $requesttypeId)
    {
        //$this->authorize('update', Tag::class);

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
    } */

    /* public function show(TicketRequestType $id)
    {
        //$this->authorize('show', $id);

        if ($id) {
            $response = [
                'name' => $id->name,
                'display_name' => $id->display_name,
                'id' => $id->id,
            ];

            return $this->success(['ticket_request_type' => $response]);
        }
    } */
}
