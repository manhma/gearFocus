import axios from 'axios';

const baseUrl: string = process.env.REACT_APP_BASE_URL as string;

//Method call api
export const apiCall = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object | FormData | undefined,
    contentType?: string,
): Promise<any> => {
    const headers: { [key: string]: string } = {};
    headers['Content-Type'] = contentType ? contentType : 'application/json';
    headers['authorization'] = `${localStorage.getItem('token')}`;

    return new Promise<any>((resolve, reject) => {
        axios({
            url: baseUrl + url,
            method: method,
            headers: headers,
            // data: data ? JSON.stringify(data) : undefined,
            data: data ? data : undefined,
        })
            .then((response) => {
                resolve({
                    body: response.data,
                    status: response.status,
                });
            })
            .catch((err) => {
                console.log('err: ', err);
                reject({
                    body: err.data,
                    status: err.status,
                });
            });
    });
};

export const getRequest = (url: string, data?: { [key: string]: any }): Promise<any> => {
    return apiCall(url, 'GET', data);
};

export const postRequest = (url: string, data?: object | FormData | undefined, contentType?: string): Promise<any> => {
    return apiCall(url, 'POST', data, contentType);
};

export const putRequest = (url: string, data?: { [key: string]: any }): Promise<any> => {
    return apiCall(url, 'PUT', data);
};

export const deleteRequest = (url: string, data?: { [key: string]: any }): Promise<any> => {
    return apiCall(url, 'DELETE', data);
};
