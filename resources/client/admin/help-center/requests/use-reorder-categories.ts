import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {
  fetchCategoriesQueryKey,
  UseCategoriesResponse,
} from '@app/admin/help-center/requests/use-categories';
import {moveItemInNewArray} from '@common/utils/array/move-item-in-new-array';
import {useHcCategoryManagerParams} from '@app/admin/help-center/requests/use-hc-category-manager-params';

interface Response extends BackendResponse {}

interface Payload {
  parentId?: number;
  oldIndex: number;
  newIndex: number;
}
export function useReorderCategories(type?: 'section' | 'category') {
  const queryKey = fetchCategoriesQueryKey(useHcCategoryManagerParams());
  return useMutation({
    mutationFn: (payload: Payload) => {
      // ids are already moved in "onMutate", no need to do it again here
      const ids = queryClient
        .getQueryData<UseCategoriesResponse>(queryKey)!
        .pagination.data.map(c => c.id);
      return reorder({
        parentId: payload.parentId,
        ids,
      });
    },
    onMutate: async ({oldIndex, newIndex}) => {
      await queryClient.cancelQueries({queryKey});
      const previousResponse = queryClient.getQueryData(queryKey);
      queryClient.setQueryData<UseCategoriesResponse>(queryKey, prev => {
        const newData = {...prev, pagination: {...prev!.pagination}};
        newData.pagination.data = moveItemInNewArray(
          newData.pagination.data,
          oldIndex,
          newIndex,
        );
        return newData;
      });
      return {previousResponse};
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['hc', 'categories']});
    },
    onError: (err, _, context) => {
      showHttpErrorToast(err);
      queryClient.setQueryData(queryKey, context?.previousResponse);
    },
  });
}

function reorder(payload: {parentId?: number; ids: number[]}) {
  return apiClient
    .post<Response>(`hc/categories/reorder`, payload)
    .then(r => r.data);
}
