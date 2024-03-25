import {useMutation, useQuery} from '@tanstack/react-query';
import {UseFormReturn} from 'react-hook-form';
import { User } from '@common/auth/user';
import { BackendResponse } from '@common/http/backend-response/backend-response';
import { toast } from '@common/ui/toast/toast';
import { apiClient, queryClient } from '@common/http/query-client';
import { DatatableDataQueryKey } from '@common/datatable/requests/paginated-resources';
import { onFormQueryError } from '@common/errors/on-form-query-error';
import { message } from '@common/i18n/message';
import { useNavigate } from '@common/utils/hooks/use-navigate';


export interface Response extends BackendResponse {
  user: User;
}

export interface SaveUserForm {
  email: string;
  password: string;
  hubstaff_user_id?: number;
}

export interface CreateUserPayload
  extends Omit<Partial<User>, 'email_verified_at'> {
  email_verified_at?: boolean;
}

/* export function useCreateUser(form: UseFormReturn<CreateUserPayload>) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (props: CreateUserPayload) => createUser(props),
    onSuccess: () => {
      toast(message('User created'));
      queryClient.invalidateQueries({queryKey: DatatableDataQueryKey('users')});
      navigate('/admin/users');
    },
    onError: r => onFormQueryError(r, form),
  });
}

function createUser(payload: CreateUserPayload): Promise<Response> {
  if (payload.roles) {
    payload.roles = payload.roles.map(r => r.id) as any;
  }
  return apiClient.post('users', payload).then(r => r.data);
} */

/* export interface CreateHubstaffTokenPayload {
  refresh_token: string;
  access_token: string;
  expires_in: number;
} */



export function useCreateUser(form: SaveUserForm) {
  return useMutation({
    mutationFn: (form: SaveUserForm) => createUser(form),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: DatatableDataQueryKey('users')});
    },
  });
}

/* export const fetchUsers = async (form : SaveUserForm) => {
  const data = {
    email: form.email,
    password: form.password,
  }
  return apiClient.post<Response>('users', data).then(r => r.data);
} */

const createUser = async (payload: CreateUserPayload): Promise<Response> => {
  const newPayload = {...payload, roles: [3]}
  console.log('newPayload', newPayload);
  return apiClient.post('users', newPayload).then(r => r.data);
}