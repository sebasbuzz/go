<?php namespace App\Http\Controllers;

use App\Models\Teams; 
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TeamsController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        /* $this->authorize('index', Teams::class); */

        $query = Teams::query(); // Asegúrate de definir $query adecuadamente

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

        $dataTeams = Teams::create([
            'name' => $data['name'],
            'display_name' => $data['display_name'] ?? $data['name'],
        ]);

        return $this->success(['team' => $dataTeams]);
    }

    public function destroy(string $ids)
    {
        $teamIds = explode(',', $ids);
        /* $this->authorize('destroy', [TicketRequestType::class, $teamIds]); */

        Teams::whereIn('id', $teamIds)->delete();

        return $this->success();
    }

    public function update(int $teamId)
    {
        /* $this->authorize('update', Tag::class); */

        $data = $this->validate(request(), [
            'name' => "string|min:2|unique:teams,name,$teamId",
            'display_name' => 'string|min:2',
        ]);

        $team = Teams::findOrFail($teamId);

        $team->fill([
            'name' => $data['name'],
            'display_name' => $data['display_name'],
        ])->save();

        return $this->success(['teams' => $team]);
    }

    public function show(Teams $id)
    {
        /* $this->authorize('show', $id); */

        if ($id) {
            $response = [
                'name' => $id->name,
                'display_name' => $id->display_name,
                'id' => $id->id,
            ];

            return $this->success(['team' => $response]);
        }
    }
}
