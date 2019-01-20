import axios, {AxiosResponse} from 'axios';
import qs from 'qs';
import {ElLoadingComponent} from "element-ui/types/loading";
import {LoadingUtil} from "@/utils/loading";

let loading: ElLoadingComponent;

axios.interceptors.request.use(config => {
    // loading
    loading = LoadingUtil.showSimpleLoading();
    return config;
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    loading.close();
    return response;
}, error => {
    return Promise.resolve(error.response)
});

function checkStatus (response:any) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response;
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode (res:any) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        alert(res.data.error_msg)
    }
    return res
}

export const APP_HOST = process.env.VUE_APP_HOST;

export default {

    post (url:string, data?:any) {
        return axios({
            method: 'post',
            baseURL: APP_HOST,
            url,
            // data: qs.stringify(data),
            data: data,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'sessionToken': sessionStorage.getItem('sessionToken')
            }
        }).then((res: AxiosResponse<any>) => {
            if(res.status == 200){
                return res.data;
            }
            else{
                return {
                    code: "-1",
                    data: res
                }
            }
        });
    },
    postNoToken (url:string, data?:any) {
        return axios({
            method: 'post',
            baseURL: APP_HOST,
            url,
            // data: qs.stringify(data),
            data: data,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then((res: AxiosResponse<any>) => {
            if(res.status == 200){
                return res.data;
            }
            else{
                return {
                    code: "-1",
                    data: res
                }
            }
        });
    },
    get (url:string, params?:any) {
        return axios({
            method: 'get',
            baseURL: APP_HOST,
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'sessionToken': sessionStorage.getItem('sessionToken')
            }
        }).then((res: AxiosResponse<any>) => {
            if(res.status == 200){
                return res.data;
            }
        });
    },
    getNoToken (url:string, params?:any) {
        return axios({
            method: 'get',
            baseURL: APP_HOST,
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            headers: {
            }
        }).then((res: AxiosResponse<any>) => {
            if(res.status == 200){
                return res.data;
            }
        });
    },
}