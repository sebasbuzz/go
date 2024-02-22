import {useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {Category, Section} from '@app/help-center/categories/category';
import {Article} from '@app/help-center/articles/article';
import {getBootstrapData} from '@common/core/bootstrap-data/use-backend-bootstrap-data';

export interface GetCategoryResponse extends BackendResponse {
  category: Category | Section;
  articles?: Article[];
  categoryNav?: Section[];
}

export function useCategory(loader: 'categoryPage' | 'updateCategory') {
  const {categoryId, sectionId} = useParams();
  const id = sectionId || categoryId;
  return useQuery<GetCategoryResponse>({
    queryKey: ['hc', 'categories', id, loader],
    queryFn: () => fetchCategory(id!, loader),
    initialData: () => {
      const data = getBootstrapData().loaders?.[loader];
      if (data?.category?.id == id) {
        return data;
      }
    },
  });
}

function fetchCategory(
  categoryId: string,
  loader: string,
): Promise<GetCategoryResponse> {
  return apiClient
    .get(`hc/categories/${categoryId}`, {params: {loader}})
    .then(response => response.data);
}
