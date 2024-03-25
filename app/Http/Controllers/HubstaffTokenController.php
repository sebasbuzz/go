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

    public function index()
    {
        $expiredToken = HubstaffToken::pluck('expired_token')->first();

        if (!$expiredToken) {
            return $this->error('No data found.', 404);
        }

        return $this->success(['expired_token' => $expiredToken]);
    }

    public function indexAcessToken()
    {
        $accessToken = HubstaffToken::pluck('access_token')->first();

        if (!$accessToken) {
            return $this->error('No data found.', 404);
        }

        return $this->success(['access_token' => $accessToken]);
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
}
