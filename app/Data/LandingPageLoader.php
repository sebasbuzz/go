<?php

namespace App\Data;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class LandingPageLoader
{
    public const CACHE_KEY = 'hc.home';

    public function loadData(): array
    {
        return [
            'categories' => $this->loadLandingPageData(),
            'loader' => 'landingPage',
        ];
    }

    protected function loadLandingPageData()
    {
        return Cache::remember(
            self::CACHE_KEY,
            Carbon::now()->addDays(1),
            function () {
                //load categories with children and articles
                $categories = Category::query()
                    ->rootOnly()
                    ->orderByPosition()
                    ->filterByVisibleToRole()
                    ->limit(10)
                    ->withCount('sections')
                    ->with([
                        'sections' => function (HasMany $query) {
                            $query
                                ->withCount('articles')
                                ->filterByVisibleToRole()
                                ->with([
                                    'articles' => function ($query) {
                                        $query->filterByVisibleToRole();
                                    },
                                ]);
                        },
                    ])
                    ->get();

                $categoryLimit = settings('landing.children_per_category', 6);
                $articleLimit = settings('landing.articles_per_category', 5);

                $categories->each(function (Category $category) use (
                    $categoryLimit,
                    $articleLimit,
                ) {
                    // limit child category and child category article count
                    $category->setRelation(
                        'sections',
                        $category->sections->take($categoryLimit),
                    );
                    $category->sections->each(function (Category $child) use (
                        $articleLimit,
                    ) {
                        $child->setRelation(
                            'articles',
                            $child->articles->take($articleLimit),
                        );
                    });
                });

                return $categories;
            },
        );
    }
}
