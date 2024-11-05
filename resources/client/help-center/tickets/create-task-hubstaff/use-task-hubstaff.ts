import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import { BackendResponse } from '@common/http/backend-response/backend-response';
import {User} from '@common/auth/user';
import { toast } from '@common/ui/toast/toast';
import { message } from '@common/i18n/message';
import { useGetAcessToken } from '@common/admin/users/hubstaff-users/requests/use-users';

interface ResponseAccessToken extends BackendResponse {
  access_token: string
}

function fetchAccessToken() {
  return apiClient
    .get<ResponseAccessToken>(`hubstaff-access-token`)
    .then(response => response.data);
}

export const createHubstaffTask = async () => {
  try {
      const accessToken = await fetchAccessToken();
      /* console.log('accessToken', accessToken); */
      
      const response = await fetch('https://api.hubstaff.com/v2/projects/2952571/tasks', {
          method: 'POST',
          /* method: 'GET', */
          headers: {
            'Authorization': `Bearer ${accessToken.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            summary: "test task from portal service",
            assignee_id: 2339551
          })
      });

      const data = await response.json();
      if(data.error) {
        return toast.danger(`${data.error_description}`);
      }
      return data;
  } catch (error) {}
};