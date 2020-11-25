import { Options } from 'http-proxy-middleware';

export interface ProxyUrl {
    route: string;
    target: string;
    options?: Options;
}