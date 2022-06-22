import React from 'react';
import { List, Datagrid, NumberField,DateField, TextField, ReferenceManyField } from 'react-admin';
import { Show, TabbedShowLayout, Tab } from 'react-admin';
import { EditButton } from 'react-admin';
import UserColumns from './columns';

export const ShowUser = ({...props}) => {
    return(
        <Show {...props}>
            <TabbedShowLayout className='showForm'>
                <Tab label="General" basePath="/">
                    {UserColumns().map((data,key) => (
                        <TextField key={key} source={data.name} label={data.label} disabled={data.edit_disabled}
                            className="formLine"/>
                    ))}
                </Tab>
                <Tab label="Login" path="UserLogins">
                    <ReferenceManyField label="" source="id" reference="userLogins" target='id'>
                        <Datagrid>
                            <NumberField label="Session Id" source="id" />
                            <TextField label="Client MAC" source="client_mac" />
                            <TextField label="Client IP" source="client_ip" />
                            <TextField label="Client Hostname" source="client_hostname" />
                            <DateField label="Login Time" source="login_time" />
                            <DateField label="Last Active Time" source="last_active_time" />
                            <TextField label="Session State" source="session_state" />
                            <EditButton label='' name='edituserlogin'/>
                        </Datagrid>
                    </ReferenceManyField>               
                </Tab>
            </TabbedShowLayout>
        </Show>
    )
};