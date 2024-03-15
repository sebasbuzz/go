import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {saveToken } from './save-token';
import {Button} from '@common/ui/buttons/button';
import {useState} from 'react';
import {useTrans} from '@common/i18n/use-trans';
import {Trans} from '@common/i18n/trans';
import {LearnMoreLink} from '../../learn-more-link';

type CustomError = {
  error_description: string;
};

export function HubstaffTokenForm() {
  const [refreshToken, setRefreshToken] = useState('');
  const [status, setStatus] = useState(false);
  const {trans} = useTrans();

  const exchangeRefreshTokenForAccessToken = async (refreshToken: string) => {
    const tokenEndpoint = 'https://account.hubstaff.com/access_tokens';

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'refresh_token');
    requestBody.append('refresh_token', refreshToken);

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody
      });

      const responseData = await response.json();
      setRefreshToken('');
      return responseData;
    } catch (error) {
      const err = error as CustomError;
      toast.danger(
        trans(
          message(err?.error_description),
        ),
      );
    }
  };

  const obtenerTokenDeAcceso = async () => {
    setStatus(true);
    try {
      const accessToken = await exchangeRefreshTokenForAccessToken(refreshToken);
      await saveToken(accessToken);
      toast.positive(
        trans(
          message("Access Token Saved!"),
        ),
      );
      setStatus(false);
      setRefreshToken('');
    } catch (error) {
      console.error('Error:', error);
      setRefreshToken('');
      toast.danger(
        trans(
          message("Failed to save Access Token!"),
        ),
      );
    }
  };

  return (
    <>
      <div className="mb-20 text-sm">
        <label className="block first-letter:capitalize text-left whitespace-nowrap text-sm mb-4" id="refresh_token" htmlFor="refresh_token">Refresh Token</label>
        <div className="isolate relative">
          <input 
            id="refresh_token"
            name="refresh_token" 
            required 
            aria-labelledby="refresh_token" 
            aria-describedby="refresh_token" 
            className="block text-left relative w-full appearance-none transition-shadow text bg-transparent rounded-input border-divider border focus:ring focus:ring-primary/focus focus:border-primary/60 focus:outline-none shadow-sm text-sm h-42 pl-12 pr-12"
            onChange={e => setRefreshToken(e.target.value)}
          />
        </div>
        <div className="text-muted pt-10 text-xs" id="refresh_token">{`The refresh token will generate an Access Token that will be used to make requests to Hubstaff. In case it doesn't work, generate another one!`}</div>
        <div className='text-danger pt-10 text-xs'><b>*Do not generate tokens too frequently!</b></div>
        <div className='flex flex-wrap items-center gap-6 pt-10 text-xs'><b>*How to generate refresh tokens in Hubstaff</b> <LearnMoreLink link="https://www.notion.so/Refresh-Tokens-Hubstaff-a10dbf93cf9e4fc69fe451bc5da87aa9" /></div>
      </div>
      
      <Button
        disabled={status || !refreshToken}
        variant="flat"
        color="primary"
        onClick={obtenerTokenDeAcceso}
      >
        <Trans message="Generate Access Token" />
      </Button>
    </>
  );
}
