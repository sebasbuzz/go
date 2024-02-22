import {useSearchArticles} from '@app/help-center/search/use-search-articles';
import {useParams} from 'react-router-dom';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {HcSearchBar} from '@app/help-center/search/hc-search-bar';
import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {ArticlePath} from '@app/help-center/articles/article-path';
import {ArticleIcon} from '@common/icons/material/Article';
import {PageStatus} from '@common/http/page-status';
import searchImage from '@app/agent/agent-search-page/search.svg';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {ArticleLink} from '@app/help-center/articles/article-link';
import {useSearchTermLogger} from '@app/help-center/search/use-search-term-logger';

export function HcSearchPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar menuPosition="header">
        <HcSearchBar />
      </Navbar>
      <main className="container mx-auto px-24 pb-48">
        <Breadcrumb size="sm" className="mb-48 mt-34">
          <BreadcrumbItem onSelected={() => navigate(`/hc`)}>
            <Trans message="Help center" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Trans message="Search" />
          </BreadcrumbItem>
        </Breadcrumb>
        <PageContent />
      </main>
    </div>
  );
}

function PageContent() {
  const searchLogger = useSearchTermLogger();
  const {query: searchTerm} = useParams();
  const query = useSearchArticles(searchTerm!, {perPage: 30});

  if (query.data) {
    if (query.data.pagination.data.length === 0) {
      return (
        <IllustratedMessage
          className="mt-48"
          image={<SvgImage src={searchImage} />}
          title={<Trans message="No articles match your search query" />}
        />
      );
    }
    return (
      <div>
        <h1 className="mb-34 text-3xl font-semibold">
          <Trans
            message={`Showing :count results for ":query"`}
            values={{
              count: query.data.pagination.data.length,
              query: query.data.query,
            }}
          />
        </h1>
        {query.data?.pagination.data.map(article => (
          <div key={article.id} className="mb-14 flex items-start gap-12">
            <ArticleIcon className="mt-4 flex-shrink-0 text-muted" />
            <div className="flex-auto">
              <h2 className="mb-4 text-xl">
                <ArticleLink
                  article={article}
                  onClick={() => {
                    searchLogger.updateLastSearch({clickedArticle: true});
                  }}
                />
              </h2>
              <ArticlePath article={article} className="text-sm text-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <PageStatus query={query} show404={false} loaderIsScreen={false} />;
}
