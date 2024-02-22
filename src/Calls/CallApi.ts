export interface ICallApi {
    method: string;
    url: string;
    headers?: IHeaders;
    body?: any;
}
interface IHeaders {
    [key: string]: string;
}
async function postRequest(props: ICallApi) {
    return await fetch(props.url, {
        method: 'post',
        headers: props.headers,
        body: props.body
    });
}
async function getRequest(props: ICallApi) {
    return await fetch(props.url, {
        method: 'get',
        headers: props.headers
    });
}
export async function callApi(props: ICallApi){
    if(props.method.toLowerCase() === 'post')
        return postRequest(props);
    if(props.method.toLowerCase() === 'get')
        return getRequest(props);
}
