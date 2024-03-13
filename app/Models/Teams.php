<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Teams extends Model
{
    
    protected $table = 'teams';
    protected $fillable = ['name', 'display_name'];
   /*  protected $fillable = ['name'];

    protected $primaryKey = 'id';

   

    public function scopeMysqlSearch($query, $searchTerm)
    {
        return $query->where('name', 'LIKE', "%$searchTerm%");
    } */

    
}