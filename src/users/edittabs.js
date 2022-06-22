import { Edit,TextInput,SimpleForm } from 'react-admin';


export const EditUserLogins = ({...props}) => {    
    return(
        <Edit {...props} mutationMode="pessimistic">
            <SimpleForm warnWhenUnsavedChanges className="popmodal">
                <TextInput type='number' source='id' label='Session Id' disabled='true'/>
                <TextInput type='text' source='client_mac' label='Client MAC' disabled='false'/>
                <TextInput type='text' source='client_ip' label='Client IP' disabled='false'/>
                <TextInput type='text' label="Client Hostname" source="client_hostname" />
                <TextInput type='date' source='login_time' label='Login Time' disabled='false'/>
                <TextInput type='date' source='last_active_time' label='Last Active Time' disabled='false'/>
                <TextInput type='number' label="Session State" source="session_state" />
            </SimpleForm>
        </Edit>
    )
};