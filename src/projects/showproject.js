import React from 'react';
import { List, Datagrid, NumberField,DateField, TextField, ReferenceManyField, ShowButton } from 'react-admin';
import { Show, TabbedShowLayout, Tab,ReferenceField,SimpleShowLayout } from 'react-admin';
import { EditButton } from 'react-admin';

export const ShowProject = ({...props}) => {
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
                <Tab label="Users" basePath="projectUsers">
                    <ReferenceManyField source='id' reference='proUsers' target='id'>
                        <Datagrid>
                            <NumberField label="Id" source="id" />
                            <TextField label="Emp No" source="emp_no" />
                            <TextField label="Username" source="ldap_uname" />
                            <TextField label="Name" source="full_name" />
                            <ReferenceManyField source='id' reference="users" target='id'>
                                <div style={{display:"flex"}}>
                                    <ShowButton label='' name='showuser' />
                                    <EditButton label='' name='edituser'/>
                                </div>
                            </ReferenceManyField>
                        </Datagrid>
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
            </TabbedShowLayout>
        </Show>
    )
};