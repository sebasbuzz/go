<?php

namespace App\Services\HelpCenter;

use App\Models\Article;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Facades\DB;

class PopularArticlesReport
{
    public function generate(): AbstractPaginator
    {
        $prefix = DB::getTablePrefix();
        $positive = "(SELECT count(*) FROM {$prefix}article_feedback WHERE was_helpful = 1 AND article_id = {$prefix}articles.id) as positive_votes";
        $negative = "(SELECT count(*) FROM {$prefix}article_feedback WHERE was_helpful = 0 AND article_id = {$prefix}articles.id) as negative_votes";

        $pagination = Article::orderBy('views', 'desc')
            ->select([
                'id',
                'views',
                'slug',
                'title',
                DB::raw($positive),
                DB::raw($negative),
            ])
            ->simplePaginate()
            ->through(function (Article $article) {
                $totalLikes =
                    $article->positive_votes + $article->negative_votes;
                $article->score = $totalLikes
                    ? round(($article->positive_votes / $totalLikes) * 100)
                    : null;
                return $article;
            });

        $pagination->loadPath();

        return $pagination;
    }
}
