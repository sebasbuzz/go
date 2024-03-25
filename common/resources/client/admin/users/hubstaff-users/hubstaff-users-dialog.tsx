import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import { HubstaffUser } from './requests/use-users';
import SaveHubstaffUser from './save-hubstaff-user';
import { useState } from 'react';

export interface Data {
  data: HubstaffUser[];
  setData: (users: HubstaffUser[]) => void;
}

export function SyncHubstaffUsersDialog({data, setData} : Data) {
  const {close} = useDialogContext();
  const [globalStatusSaveUser, setGlobalStatusSaveUser] = useState(false)

  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Sync Hubstaff Users" />
      </DialogHeader>
      <DialogBody>
        {data?.length > 0 
          ? data.map(user => 
            <SaveHubstaffUser 
              key={user.id} 
              data={data} 
              setData={setData} 
              hubstaff_user_id={user.id} 
              globalStatusSaveUser={globalStatusSaveUser}
              setGlobalStatusSaveUser={setGlobalStatusSaveUser}
              email={user.email} password="buzzzcr!321" /> ) 
          : "No new Hubstaff users found."
        }
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
