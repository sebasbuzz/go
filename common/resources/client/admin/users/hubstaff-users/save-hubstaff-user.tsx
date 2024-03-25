import { useEffect } from 'react';
import { useCreateUser } from './requests/save-user';
import { SaveUserForm } from './requests/save-user';
import { HubstaffUser } from './requests/use-users';

interface Props extends SaveUserForm {
  setData: (users: HubstaffUser[]) => void;
  data: HubstaffUser[];
  globalStatusSaveUser: boolean;
  setGlobalStatusSaveUser: (status: boolean) => void;
}

const SaveHubstaffUser = (props: Props) => {
  const { mutate, status, isError, isSuccess } = useCreateUser(props);
  const payload = {
    email: props.email,
    password: props.password,
    hubstaff_user_id: props.hubstaff_user_id
  }

  useEffect(() => {
    if(isSuccess) {
      
      const oldData = props.data;
      setTimeout(() => {
        props.setGlobalStatusSaveUser(false);
        props.setData(oldData.filter(user => user.email !== props.email ))
      }, 500);
    }
  }, [props, isSuccess])
  

  return (
    <div className={`border-1 rounded-lg py-4 px-8 mb-5 ${isSuccess && "bg-positive/focus"}`}>
      <div className={`flex gap-8 mb-5 ${isError && "text-danger"}`}>
        <span>{props.email} - {props.hubstaff_user_id}</span><span>{`- Password: ${props.password}`}</span>
        {isSuccess && <span className="text-positive">&#10003;</span>}
      </div>
      {!isSuccess && (
        <button 
          className='ml-auto flex text-muted italic' 
          onClick={() => (mutate(payload), props.setGlobalStatusSaveUser(true))}
          disabled={status === "pending" || props.globalStatusSaveUser ? true : false}
        >
          {`Add User${status === "pending" ? "..." : ""}`}
        </button>
      )}
    </div>
  )
}

export default SaveHubstaffUser;