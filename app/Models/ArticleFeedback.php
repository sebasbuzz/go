<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleFeedback extends Model
{
    protected $guarded = ['id'];

    protected $table = 'article_feedback';

    protected $casts = ['was_helpful' => 'integer'];

    const MODEL_TYPE = 'article_feedback';

    public static function getModelTypeAttribute(): string
    {
        return self::MODEL_TYPE;
    }

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
