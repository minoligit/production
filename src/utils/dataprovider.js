import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { updatedDiff } from 'deep-object-diff';
const httpClient = fetchUtils.fetchJson;

export default (apiUrl) => {

    const getOneJson = (resource, id) => { 
        httpClient(`${apiUrl}/${resource}/${id}`)
        .then((response) => response.json
        )
    };
    return {

        getList: async (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
    
            return httpClient(url).then(({ headers, json }) => ({
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            }));
        },
        getOne: async (resource, params) => {
            return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
                data: json,
            }))
        },
        create: async (resource, params) => {
            return httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        },
        update: async (resource, params) => {
            const updatedData = updatedDiff(params.previousData, params.data);
            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
            }).then(({ json }) => ({ data: json }))
        },
        delete: async (resource, params) =>{
            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: {result: "deleted"} }))
        },
        deleteMany: async (resource, params) => {
            Promise.all(
            params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}/`, {
                method: 'DELETE',
            }))
            ).then(responses => ({ data: responses.map(({ json }) => json.id) }));
        },
        getManyReference: async (resource,params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            const url = `${apiUrl}/${resource}/${params.id}/?${stringify(query)}`;
            return httpClient(url).then(({ headers, json }) => ({
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            }));
        },

/////////////////////////////////////////////////////////////////////////////////////////////
        
        // getMany: (resource, params) => {
        //     console.log("M",params);
        //     return Promise.all(
        //         params.ids.map(id => getOneJson(resource, id))
        //         ).then(data => ({ data }));
        // },
        
        getMany: (resource, params) => {
            console.log("Get Many",params);
            const query = {
                filter: JSON.stringify({ ids: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            return httpClient(url).then(({ json }) => ({ data: json }));
        },
        updateMany: (resource, params) => {
            console.log("Up Many",params);  
            const query = {
                filter: JSON.stringify({ id: params.ids}),
            };
            return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        },

        // updateMany: (resource, params) => Promise.all(
        //     params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`, {
        //         method: 'PATCH',
        //         body: JSON.stringify(params.data),
        //     }))
        // ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
        
        
}}