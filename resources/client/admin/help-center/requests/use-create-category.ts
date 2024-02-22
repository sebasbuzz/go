import {useMutation} from '@tanstack/react-query';
import {apiClient, queryClient} from '@common/http/query-client';
import {useTrans} from '@common/i18n/use-trans';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {onFormQueryError} from '@common/errors/on-form-query-error';
import {UseFormReturn} from 'react-hook-form';
import {Category, Section} from '@app/help-center/categories/category';
import {useNavigate} from '@common/utils/hooks/use-navigate';

interface Response extends BackendResponse {
  category: Category | Section;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  image?: string;
  parent_id?: number;
  visible_to_role?: number;
  managed_by_role?: number;
}

export function useCreateCategory(form: UseFormReturn<CreateCategoryPayload>) {
  const {trans} = useTrans();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (props: CreateCategoryPayload) => createCategory(props),
    onSuccess: async response => {
      await queryClient.invalidateQueries({queryKey: ['hc', 'categories']});
      const part = response.category.is_section ? 'sections' : 'categories';
      navigate(`/admin/hc/arrange/${part}/${response.category.id}`);
      toast(
        trans(
          response.category.is_section
            ? message('Category created')
            : message('Section created'),
        ),
      );
    },
    onError: err => onFormQueryError(err, form),
  });
}

function createCategory(payload: CreateCategoryPayload): Promise<Response> {
  return apiClient.post('hc/categories', payload).then(r => r.data);
}
