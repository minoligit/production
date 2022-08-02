import React from 'react';
import {useNavigate} from "react-router-dom";
import { List, Datagrid, NumberField,DateField, TextField, ReferenceManyField, ShowButton,Button } from 'react-admin';
import { Show, TabbedShowLayout, Tab,ReferenceField,SimpleShowLayout } from 'react-admin';
import { EditButton,CreateButton,ExportButton } from 'react-admin';
import { RoleAccess } from '../utils/common';

export const ShowProject = ({...props}) => {
    const navigate = useNavigate();

    return(
        <Show {...props}>
            <TabbedShowLayout className='showForm'>
                
                {/* <Tab label="Users" basePath="proUsers"> */}
                    {/* <NestedResourceField reference="books" nestedResource={`projects`} pagination={<Pagination/>} >
                        <Datagrid>
                            <TextField source="name" />
                        </Datagrid>
                    </NestedResourceField> */}
                {/* </Tab> */}
                <Tab label="Users" basepath="projectUsers">
                    <ReferenceManyField source='id' reference='proUsers' target='id'>
                        <div>
                        <ReferenceManyField source='id' reference="users" target='id'>
                            <div style={{display:"flex"}}>
                            {RoleAccess("users","create").length==0? null: <CreateButton name='createuser'/>}
                            {RoleAccess("users","export").length==0? null: <ExportButton />}
                            </div>
                        </ReferenceManyField>
                        <Datagrid>
                            <NumberField label="Id" source="id" />
                            <TextField label="Emp No" source="emp_no" />
                            <TextField label="Username" source="ldap_uname" />
                            <TextField label="Name" source="full_name" />
                            <ReferenceManyField source='id' reference="users" target='id'>
                                <div style={{display:"flex"}}>
                                    <ShowButton label='' name='showuser' />
                                    {RoleAccess("users","edit").length==0? null: <EditButton label='' name='edituser'/>}
                                </div>
                            </ReferenceManyField>
                        </Datagrid>
                        </div>
                    </ReferenceManyField>
                </Tab>
                <Tab label="Server" path="projectServers">
                    <ReferenceField label="" source="svr_alias" reference="proServers" target='id'>
                        <SimpleShowLayout>
                            <NumberField label="Id" source="id" />
                            <TextField label="Server Alias" source="svr_alias" />
                            <TextField label="MVM Name" source="mvm_name" />
                        </SimpleShowLayout>
                        {/* <List actions={null}>
                            <Datagrid className="showForm">
                                <NumberField label="Id" source="id" />
                                <TextField label="Server Alias" source="svr_alias" />
                                <TextField label="MVM Name" source="mvm_name" />
                            </Datagrid>
                        </List> */}
                    </ReferenceField>               
                </Tab>
                <Tab label="Technology" path="proTechnology">
                    <List actions={null}>
                        <Datagrid> 
                            <NumberField label="Id" source="id" />
                            <TextField label="Name" source="tech_name" />
                            <TextField label="Clip Path" source="tech_clip_path" />
                        </Datagrid>
                    </List> 
                </Tab>
                <Tab label="Sessios" path="projectSessions">
                    <ReferenceManyField source='id' reference='proSessions' target='id'>
                        <Datagrid> 
                            <NumberField label="Session Proj Id" source="id" />
                            <NumberField label="Session Id" source="session_id" />
                            <DateField label="Start Time" source="start_time" />
                            <DateField label="End Time" source="end_time" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
                <Tab label="Daily Work" path="projectDailyWork">
                    <ReferenceManyField source='id' reference='proDailyWork' target='id'>
                        <Datagrid> 
                            <NumberField label="Work Id" source="id" />
                            <NumberField label="User Id" source="user_id" />
                            <DateField label="Date" source="date" />
                            <NumberField label="Portion Id" source="portion_id" />
                            <NumberField label="Portion" source="portion" />
                            <NumberField label="Defined User Id" source="defined_user_id" />
                        </Datagrid>
                    </ReferenceManyField>
                </Tab>
                <Button label='X' className='closeBtn' onClick={() => navigate("/projects")}/><br/>
            </TabbedShowLayout>
        </Show>
    )
};