<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HubstaffToken extends Model
{
    protected $table = 'hubstaff_token';

    protected $fillable = [
        'refresh_token',
        'access_token',
        'expired_token',
    ];
    

    /* protected $fillable = ['name', 'display_name', 'user_id'];

    protected $primaryKey = 'id';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeMysqlSearch($query, $searchTerm)
    {
        return $query->where('display_name', 'LIKE', "%$searchTerm%");
    }

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    } */
}