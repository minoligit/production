import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
import { Edit, Create, SimpleForm, TextInput,FilterButton,FilterForm  } from 'react-admin';
import { CreateButton,ExportButton } from 'react-admin';
import { Stack } from '@mui/material';
import Server from '@mui/icons-material/Computer';
import { getRole,ListPagination} from '../utils/common';
import ServerColumns from './columns';
import '../App.css';
export const ServerIcon = Server;
const permissions  = getRole();

export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={5}>
            <FilterForm filters={filterServers} />
            <div>
                <FilterButton filters={filterServers} />
                {(permissions === 'SA'||permissions === 'SSE') &&
                    <div style={{display:"inline"}}>
                        <CreateButton/>
                        <ExportButton/>
                    </div>
                }
            </div>
        </Stack>
    )
};
export const ServersList = ({...props}) => {
    return(
        <List actions={<ListToolbar />} {...props} pagination={<ListPagination />}>
            <Datagrid>
                {ServerColumns().map((data,key) => (
                    <TextField key={key} source={data.name} label={data.label}/>
                ))}
                <EditButton label=''/>
                {(permissions === 'SA'||permissions === 'SSE') &&
                    <div style={{display:"inline"}}>
                        <DeleteWithConfirmButton label=""
                        confirmContent="You will not be able to recover this record. Are you sure?"/>                     </div>
                }                 
            </Datagrid>
        </List>
    );
};
export const EditServers = () => {
    return(
        <Edit>
            <SimpleForm warnWhenUnsavedChanges className="popmodal">
                {ServerColumns().map((data,key) => (
                    <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                        disabled={data.edit_disabled} required={data.required}/>
                ))}
            </SimpleForm>
        </Edit>
    )
};
export const CreateServers = () => {

    return (
        <Create title=''>
            <SimpleForm warnWhenUnsavedChanges className="popmodal" >
                <h4>Add New Server</h4>
                {ServerColumns().map((data,key) => (
                    <TextInput key={key} type={data.datatype} source={data.name} label={data.label} 
                        disabled={data.create_disabled} required={data.required}/>
                ))}
            </SimpleForm>
        </Create>
    )
};
const filterServers = [
    <TextInput label="Alias" source="svr_alias" defaultValue=""/>,
    <TextInput label="Dir Server IP" source="dir_svr_ip" defaultValue="" />,
    <TextInput label="Clip Server Ip" source="clip_svr_ip" defaultValue=""/>,
    <TextInput label="MVM Name" source="mvm_name" defaultValue="" />,
];