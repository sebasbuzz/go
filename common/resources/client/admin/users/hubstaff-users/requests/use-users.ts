import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {PaginatedBackendResponse} from '@common/http/backend-response/pagination-response';
import { BackendResponse } from '@common/http/backend-response/backend-response';
import {User} from '@common/auth/user';
import { toast } from '@common/ui/toast/toast';
import { message } from '@common/i18n/message';


const mock_users = [
    /* {
      "id": 777870,
      "name": "Andrés Martín",
      "email": "andres@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-02-08T21:00:52.945281Z",
      "updated_at": "2024-03-08T15:36:16.131847Z"
  },
  {
      "id": 778820,
      "name": "Luis Fernando Gutiérrez",
      "email": "luis@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-02-10T15:20:08.800968Z",
      "updated_at": "2024-03-15T11:38:29.737263Z"
  },
  {
      "id": 778839,
      "name": "Catalina Camareno",
      "email": "catalina@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-02-10T15:35:54.362335Z",
      "updated_at": "2024-03-18T14:46:34.226355Z"
  },
  {
      "id": 778933,
      "name": "moises gonzalez",
      "email": "moises@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-02-10T17:11:15.771894Z",
      "updated_at": "2024-03-15T11:38:27.738724Z"
  },
  {
      "id": 778936,
      "name": "Farina Ramos",
      "email": "farina@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-02-10T17:15:48.559664Z",
      "updated_at": "2024-03-18T18:24:33.463785Z"
  },
  {
      "id": 780189,
      "name": "Pili",
      "email": "priscilla@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-02-12T14:47:36.377218Z",
      "updated_at": "2024-01-10T19:16:26.090179Z"
  },
  {
      "id": 791191,
      "name": "Jefferson Sandí Álvarez",
      "email": "jeff@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-03-03T02:36:27.458837Z",
      "updated_at": "2024-03-18T17:41:46.305276Z"
  },
  {
      "id": 1008033,
      "name": "Laurel Zayas",
      "email": "medios@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2020-11-03T14:59:03.780874Z",
      "updated_at": "2024-03-14T13:01:32.941510Z"
  },
  {
      "id": 1186655,
      "name": "Crisly Díaz",
      "email": "crisly@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2021-02-25T02:03:08.492288Z",
      "updated_at": "2024-03-15T11:38:27.628517Z"
  },
  {
      "id": 1593195,
      "name": "Fran Gómez",
      "email": "francine@buzz.cr",
      "time_zone": "America/Bogota",
      "status": "active",
      "created_at": "2021-10-07T21:28:11.459610Z",
      "updated_at": "2024-03-16T11:38:44.384588Z"
  },
  {
      "id": 1609719,
      "name": "Katherinne Sequeira",
      "email": "kat@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2021-10-21T17:57:23.964352Z",
      "updated_at": "2024-02-29T14:50:21.104639Z"
  },
  {
      "id": 1462862,
      "name": "Rebeca Castro",
      "email": "rebe@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2021-07-07T20:37:45.955156Z",
      "updated_at": "2024-02-08T22:09:52.135733Z"
  },
  {
      "id": 1737982,
      "name": "Pamela Hidalgo",
      "email": "phidalgou@baccredomatic.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2022-02-01T17:08:04.212058Z",
      "updated_at": "2024-02-20T22:32:13.819091Z"
  },
  {
      "id": 1785968,
      "name": "Mario Oviedo",
      "email": "mario@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2022-03-14T15:39:16.088175Z",
      "updated_at": "2024-03-15T11:38:30.234701Z"
  },
  {
      "id": 1916021,
      "name": "Carlos Morales Altamirano",
      "email": "carlos@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2022-07-14T16:15:22.267323Z",
      "updated_at": "2024-03-16T11:38:44.147163Z"
  },
  {
      "id": 1939969,
      "name": "Glenda Moya",
      "email": "glenda.moya@baccredomatic.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2022-08-05T14:32:12.065252Z",
      "updated_at": "2023-10-21T15:24:27.721003Z"
  },
  {
      "id": 1965900,
      "name": "Za",
      "email": "zaffsalomon@gmail.com",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2022-08-30T23:35:42.198253Z",
      "updated_at": "2024-03-18T05:28:21.789082Z"
  },
  {
      "id": 2004880,
      "name": "Jacky Paniagua",
      "email": "jacky@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2022-10-07T18:09:06.237072Z",
      "updated_at": "2024-03-18T13:59:19.638907Z"
  },
  {
      "id": 2021248,
      "name": "Paula González",
      "email": "pgonzalez@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2022-10-24T16:17:24.169047Z",
      "updated_at": "2024-03-12T13:42:50.173023Z"
  },
  {
      "id": 2049321,
      "name": "Karol Cruz Arias",
      "email": "administrativo@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2022-11-22T13:08:07.261128Z",
      "updated_at": "2024-03-18T11:37:40.513074Z"
  },
  {
      "id": 2073292,
      "name": "Andreina Villalobos",
      "email": "avillalobos@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2022-12-12T14:52:05.447601Z",
      "updated_at": "2024-03-15T11:38:30.229548Z"
  },
  {
      "id": 2100292,
      "name": "Irene Wallfall",
      "email": "ire@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-01-04T16:59:40.755648Z",
      "updated_at": "2024-03-18T06:32:24.178453Z"
  },
  {
      "id": 2108579,
      "name": "Raúl Prado",
      "email": "rprado@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-01-11T15:53:05.667538Z",
      "updated_at": "2024-03-15T11:38:32.766086Z"
  },
  {
      "id": 2113768,
      "name": "Valeska",
      "email": "vrodriguezv@baccredomatic.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-01-16T16:31:04.772566Z",
      "updated_at": "2024-01-12T22:28:42.840570Z"
  },
  {
      "id": 2157670,
      "name": "Chepe Vargas",
      "email": "chepe@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-02-20T17:04:13.932056Z",
      "updated_at": "2024-03-15T11:38:28.661648Z"
  },
  {
      "id": 2254071,
      "name": "Cafria Martínez",
      "email": "cafria@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-05-22T19:39:10.335676Z",
      "updated_at": "2024-03-08T11:37:59.377214Z"
  },
  {
      "id": 2255992,
      "name": "Francinnie Villalobos Rojas",
      "email": "francin.villalobos@baccredomatic.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-05-26T20:51:53.230447Z",
      "updated_at": "2024-01-26T19:37:50.232090Z"
  },
  {
      "id": 2274418,
      "name": "Pame",
      "email": "phernandez@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-06-12T15:48:19.556913Z",
      "updated_at": "2024-03-15T11:38:30.776770Z"
  },
  {
      "id": 2277830,
      "name": "Majo",
      "email": "mjpereira@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-06-15T15:57:47.997349Z",
      "updated_at": "2024-02-28T11:37:46.277810Z"
  },
  {
      "id": 2285036,
      "name": "Karen Gómez Méndez",
      "email": "gomez.karenina@gmail.com",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-06-22T16:59:18.500574Z",
      "updated_at": "2024-03-15T11:38:28.142235Z"
  },
  {
      "id": 2288526,
      "name": "Anel Rodriguez",
      "email": "anel@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-06-26T14:28:48.425446Z",
      "updated_at": "2024-03-18T13:03:27.547587Z"
  },
  {
      "id": 2310965,
      "name": "Maria Paula Vásquez Gutiérrez",
      "email": "mpvasquez@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-07-17T19:13:34.949193Z",
      "updated_at": "2024-03-18T11:37:40.577084Z"
  },
  {
      "id": 2339504,
      "name": "Abigail Quesada",
      "email": "aquesada@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-08-15T15:06:08.166442Z",
      "updated_at": "2024-02-20T11:37:50.928901Z"
  },
  {
      "id": 2345726,
      "name": "Maria Solano",
      "email": "msolano@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-08-21T15:09:51.282959Z",
      "updated_at": "2024-03-18T13:01:19.415761Z"
  },
  {
      "id": 2347327,
      "name": "Tatiana Cervantes",
      "email": "tatiana@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-08-22T17:13:54.129076Z",
      "updated_at": "2024-03-18T16:02:13.707631Z"
  },
  {
      "id": 2339550,
      "name": "Yendry Barahona Navarro",
      "email": "ybarahona@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-08-15T15:30:27.432133Z",
      "updated_at": "2024-02-27T14:01:35.954910Z"
  },
  {
      "id": 2358338,
      "name": "Laura Guillén Ureña",
      "email": "lguillen@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-09-01T17:29:44.412855Z",
      "updated_at": "2024-03-15T21:54:19.770438Z"
  },
  {
      "id": 1944414,
      "name": "Josseline Villalobos",
      "email": "josseline.villalobos@baccredomatic.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-09-08T20:36:50.377878Z",
      "updated_at": "2024-03-11T18:35:38.964332Z"
  },
  {
      "id": 2368923,
      "name": "Joel López",
      "email": "jlopez@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-09-12T17:06:30.504917Z",
      "updated_at": "2024-03-15T11:38:32.363735Z"
  },
  {
      "id": 2378906,
      "name": "Cinthya Quintana Martínez",
      "email": "cinthya@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-09-22T20:38:36.159703Z",
      "updated_at": "2024-03-15T19:15:12.681312Z"
  },
  {
      "id": 2383232,
      "name": "Argerie Flores",
      "email": "aflores@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-09-27T15:10:26.356089Z",
      "updated_at": "2023-11-02T11:42:36.464247Z"
  },
  {
      "id": 2387801,
      "name": "Guiselle Borges Salas",
      "email": "gborges@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-10-02T20:00:24.749496Z",
      "updated_at": "2024-03-14T11:38:14.558491Z"
  },
  {
      "id": 2390228,
      "name": "Mónica Zumbado",
      "email": "monica.zumbado_chacon@roche.com",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-10-04T22:27:14.399379Z",
      "updated_at": "2023-12-27T14:11:18.885989Z"
  },
  {
      "id": 2390229,
      "name": "Nella Quiros",
      "email": "marianella.quiros_valverde@roche.com",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-10-04T22:28:47.102016Z",
      "updated_at": "2023-12-04T14:12:40.923145Z"
  },
  {
      "id": 2400089,
      "name": "Montse",
      "email": "montserrat.guillen_solis@roche.com",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-10-16T15:52:36.421902Z",
      "updated_at": "2024-03-11T17:39:08.030798Z"
  },
  {
      "id": 2413682,
      "name": "Steven Acosta Barrantes",
      "email": "steven@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-10-31T19:10:27.104029Z",
      "updated_at": "2024-02-22T20:22:47.953572Z"
  },
  {
      "id": 2414587,
      "name": "Fernanda Monge",
      "email": "fmonge@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-11-01T15:32:12.177776Z",
      "updated_at": "2024-03-13T11:38:09.261502Z"
  },
  {
      "id": 2414599,
      "name": "Sofia Induni",
      "email": "btl@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-11-01T15:42:09.549968Z",
      "updated_at": "2024-03-18T12:51:33.713178Z"
  },
  {
      "id": 2418689,
      "name": "Krissya",
      "email": "kleon@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-11-06T20:10:12.577008Z",
      "updated_at": "2024-03-15T14:18:33.612340Z"
  },
  {
      "id": 2424550,
      "name": "Valeria Aguilar Ruiz",
      "email": "vaguilar@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-11-13T15:54:08.175405Z",
      "updated_at": "2024-03-18T18:27:02.801617Z"
  },
  {
      "id": 2433316,
      "name": "Marcela Calderón",
      "email": "mcalderon@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2023-11-22T15:57:34.026288Z",
      "updated_at": "2024-03-16T11:38:44.741049Z"
  },
  {
      "id": 2457715,
      "name": "Johan Hernandez",
      "email": "johan@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2023-12-12T16:32:25.189212Z",
      "updated_at": "2024-02-14T15:46:09.693505Z"
  },
  {
      "id": 2465230,
      "name": "Andrea Lopez",
      "email": "luandrealop@gmail.com",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-12-19T14:16:41.737635Z",
      "updated_at": "2024-02-22T20:42:14.527387Z"
  },
  {
      "id": 2465236,
      "name": "Rebeca Delgado",
      "email": "marenal@buzz.cr",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-12-19T14:22:26.467160Z",
      "updated_at": "2024-02-22T21:38:58.484174Z"
  },
  {
      "id": 2465265,
      "name": "Ana León",
      "email": "aleon@elarenal.com.gt",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2023-12-19T14:45:10.867452Z",
      "updated_at": "2023-12-19T14:46:08.273747Z"
  },
  {
      "id": 2480479,
      "name": "Lorenzo Jimenez Abarca",
      "email": "lorenzo@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2024-01-09T15:00:29.816721Z",
      "updated_at": "2024-01-09T15:01:26.916580Z"
  },
  {
      "id": 2542948,
      "name": "Amanda Abarca",
      "email": "aabarca@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2024-02-07T01:50:06.101223Z",
      "updated_at": "2024-03-18T14:14:48.104617Z"
  },
  {
      "id": 2557500,
      "name": "Yaritza Cascante",
      "email": "ycascante@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2024-02-20T21:52:24.886970Z",
      "updated_at": "2024-03-04T23:16:04.628291Z"
  },
  {
      "id": 2563412,
      "name": "María José Zúñiga",
      "email": "mjzuniga@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2024-02-26T16:10:57.732850Z",
      "updated_at": "2024-03-15T11:38:29.056834Z"
  },
  {
      "id": 2566644,
      "name": "Carina Herrera",
      "email": "cherrera@buzz.cr",
      "time_zone": "Etc/GMT+12",
      "status": "active",
      "created_at": "2024-02-28T16:06:31.843612Z",
      "updated_at": "2024-03-18T17:39:03.702000Z"
  },
  {
      "id": 2570326,
      "name": "Sofia Picon",
      "email": "spicon@buzz.cr",
      "time_zone": "America/Buenos_Aires",
      "status": "active",
      "created_at": "2024-03-02T13:25:02.358473Z",
      "updated_at": "2024-03-15T11:38:27.846476Z"
  },
  {
      "id": 2572918,
      "name": "Belu Monini",
      "email": "bmonini@buzz.cr",
      "time_zone": "America/Argentina/Buenos_Aires",
      "status": "active",
      "created_at": "2024-03-04T19:03:33.994394Z",
      "updated_at": "2024-03-15T11:38:27.613245Z"
  },
  {
      "id": 1979954,
      "name": "Mariana",
      "email": "marimorera@gmail.com",
      "time_zone": "America/Guatemala",
      "status": "active",
      "created_at": "2024-03-12T15:33:48.851993Z",
      "updated_at": "2024-03-14T17:33:45.260764Z"
  },
  {
      "id": 2588392,
      "name": "Roy Montoya",
      "email": "rmontoya@buzz.cr",
      "time_zone": "America/Costa_Rica",
      "status": "active",
      "created_at": "2024-03-18T19:45:42.536825Z",
      "updated_at": "2024-03-18T19:45:49.783297Z"
  }, */
  {
    "id": 2588392,
    "name": "Hola33 3232323333",
    "email": "33333@buzz.cr",
    "time_zone": "America/Costa_Rica",
    "status": "active",
    "created_at": "2024-03-18T19:45:42.536825Z",
    "updated_at": "2024-03-18T19:45:49.783297Z"
    }
]

const mock_members = {
  "members": [
    {
      "user_id": 777870,
    },
    {
      "user_id": 778820,
    }
  ]
}




interface Response extends PaginatedBackendResponse<User> {}

interface ResponseAccessToken extends BackendResponse {
  access_token: string
}

export interface HubstaffUser {
  id: number;
  user_id: number;
  name: string;
  email: string;
  time_zone: string;
  status: string;
  created_at: string;
  updated_at: string;
  hubstaff_user_id?: number;
}

export interface HubstaffUserPartial {
  user_id: number;
}

const getHubstaffUser = async (accessToken : string, id : number): Promise<HubstaffUser> => {
    const response = await fetch(`https://api.hubstaff.com/v2/users/${id}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    });
  
    const data = await response.json();

    if(data.error) {
        toast.danger(`${data.error_description}`);
    }

  return data.user;
};

const getHubstaffMembers = async (accessToken : string) => {
    try {
        const response = await fetch('https://api.hubstaff.com/v2/organizations/236631/members', {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        if(data.error) {
            return toast.danger(`${data.error_description}`);
        }
        return data;
    } catch (error) {}
};



export function useGetAcessToken() {
  return useQuery({
    queryKey: ['hubstaff-access-token'],
    queryFn: () => fetchAccessToken(),
  });
}

function fetchAccessToken() {
  return apiClient
    .get<ResponseAccessToken>(`hubstaff-access-token`)
    .then(response => response.data);
}

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchCurrentUsers(),
    staleTime: Infinity,
  });
}

export const fetchCurrentUsers = async () => {
  try {
    const accessToken = await fetchAccessToken();

    const currentUsers = (await apiClient.get<Response>(`users-all`)).data?.pagination.data?.map(user => user.hubstaff_user_id)?.filter(hubstaffUserId => hubstaffUserId !== null) || [];

    const hubsMembers = await getHubstaffMembers(accessToken.access_token);

    const clearCurrentUsers = hubsMembers.members.filter((member: HubstaffUserPartial) => !currentUsers.includes(member.user_id));

    const hubsUsersPromises = clearCurrentUsers.map((user: HubstaffUserPartial) => getHubstaffUser(accessToken.access_token, user.user_id));
    const hubsUsers = await Promise.all(hubsUsersPromises);
    return hubsUsers;
  } catch (error) {
    return error;
  }
}
