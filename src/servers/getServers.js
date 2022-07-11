import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteWithConfirmButton } from 'react-admin';
import { Edit, Create, Form, TextInput,FilterButton,FilterForm  } from 'react-admin';
import { CreateButton,ExportButton,SaveButton } from 'react-admin';
import { Stack,Grid } from '@mui/material';
import Server from '@mui/icons-material/Computer';
import { ListPagination,RoleAccess} from '../utils/common';
import { ListStyle } from '../components/layout';
import '../App.css';
export const ServerIcon = Server;

export const ListToolbar = () => {
    return(
        <Stack direction="row" justifyContent="space-between" marginTop={2}>
            <FilterForm filters={filterServers} />
            <div>
                {RoleAccess("servers","filter").length===0? null: <FilterButton filters={filterServers}/>}
                {RoleAccess("servers","create").length===0? null: <CreateButton />}
                {RoleAccess("servers","export").length===0? null: <ExportButton />}
            </div>
        </Stack>
    )
};

export const ServersList = ({...props}) => {
    return(
        <List actions={<ListToolbar />} {...props} pagination={<ListPagination />} style={{margin:'3%'}}>
            <Datagrid sx={ListStyle}>
                {RoleAccess("servers","list").map((data,key) => (
                    <TextField key={key} source={data.field} label={data.title}/>
                ))}
                {RoleAccess("servers","edit").length===0? null: <EditButton label=''/>}
                {RoleAccess("servers","delete").length===0? null: <DeleteWithConfirmButton label=""
                    confirmContent="You will not be able to recover this record. Are you sure?"/>}                
            </Datagrid>
        </List>
    );
};

export const CreateServers = () => {
    return (
        <Create title=''>
            <Form warnWhenUnsavedChanges className="popmodal" >
                <h4>Add New Server</h4>
                <Grid container>
                    <Grid item xs={12}>
                        {RoleAccess("servers","create").map((data,key) => (
                            <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                                required={data.required}/>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton />
                    </Grid>
                </Grid>          
            </Form>
        </Create>
    )
};

export const EditServers = () => {
    return(
        <Edit>
            <Form warnWhenUnsavedChanges className="popmodal">
                <Grid container>
                    <Grid item xs={12}>
                        {RoleAccess("servers","edit").map((data,key) => (
                            <TextInput key={key} type={data.datatype} source={data.field} label={data.title} 
                                required={data.required}/>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <SaveButton />
                    </Grid>
                </Grid>               
            </Form>
        </Edit>
    )
};

const filterServers = [
    <TextInput label="Alias" source="svr_alias" defaultValue=""/>,
    <TextInput label="Dir Server IP" source="dir_svr_ip" defaultValue="" />,
    <TextInput label="Clip Server Ip" source="clip_svr_ip" defaultValue=""/>,
    <TextInput label="MVM Name" source="mvm_name" defaultValue="" />,
];