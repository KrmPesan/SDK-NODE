import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export class Client {
    /**
     * Default API Url.
     */
    protected apiUrl: string;

    /**
     * Default API Token.
     */
    protected token: string;

    /**
     * Default Timeout.
     */
    protected timeout: number;

    /**
     * Custom Request Header.
     */
    protected customHeader?: Object;

    /**
     * Construct Data to Class.
     * 
     * @param region string
     * @param token string
     * @param timeout number
     * @param headers Object
     */
    constructor(
        region: string,
        token: string,
        timeout?: number,
        headers?: Object,
    ) {
        if(region == 'test') {
            this.apiUrl = 'http://krmpesan.test';
        } else {
            this.apiUrl = `https://region${region}.krmpesan.com`;
        }

        this.token = token;
        this.timeout = (timeout ?? 30) * 1000;
        this.customHeader = headers;
    }

    action(type: AxiosRequestConfig['method'], url: string, form?: Object) : Promise<AxiosResponse> {
        // Setup Url
        const buildUrl: string = this.apiUrl + '/' + url;
        
        // set default header
        let headers: Object;
        headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.token
        };

        // use custom header if not null
        if(this.customHeader) {
            headers = this.customHeader;
        }

        // make default axios instance for request
        const instance = {
            url: buildUrl,
            method: type,
            headers: headers,
            timeout: this.timeout,
            data: form
        }

        return axios.request(instance)
    }

    /**
     * Device Information.
     */
    deviceInfo() : Promise<AxiosResponse> {
        return this.action('GET', 'api/v2/device');
    }
}