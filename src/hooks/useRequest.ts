import axios, { AxiosResponse, Method } from 'axios';
import Router from 'next/router';
import { useCallback, useReducer } from 'react';
import { asyncStateReducer } from '@Functions/asyncStateReducer';
import { Optional } from '@Types/types';
import { useLocalstorage } from './useLocalStorage';

export interface RequestOptions {
    url: string;
    method: Method;
    params?: any;
    data?: any;
    headers?: any;
    disableLoading?: boolean;
}

type RequestFunction = (
    options: RequestOptions,
) => Promise<Optional<AxiosResponse<any>>>;

interface RequestHandler {
    request: RequestFunction;
    loading: boolean;
    error: boolean;
}

export function useRequest(deps: any[] = []): RequestHandler {
    const [accessToken, setAccessToken] =
        useLocalstorage<string>('accessToken');
    const [refreshToken] = useLocalstorage<string>('refreshToken');

    const [{ loading, error }, dispatch] = useReducer(asyncStateReducer, {
        loading: false,
        error: false,
    });

    const request = useCallback(
        async ({
            url,
            method,
            params,
            data,
            headers,
            disableLoading,
        }: RequestOptions) => {
            try {
                !disableLoading && dispatch({ type: 'LOADING' });
                const res = await axios.request({
                    url,
                    method,
                    params,
                    data,
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                !disableLoading && dispatch({ type: 'SUCCESS' });
                return res;
            } catch (error: any) {
                !disableLoading && dispatch({ type: 'ERROR', error });
                if (error.response?.status === 401) {
                    try {
                        const res = await axios.post(
                            '/api/auth/refresh',
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${refreshToken}`,
                                },
                            },
                        );
                        if (res) {
                            if (res.data.access_token == undefined) {
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('refreshToken');
                                Router.push('/login');
                            }
                            setAccessToken(res.data.access_token);
                            Router.reload();
                        }
                    } catch {
                        Router.push('/login');
                    }
                }
                // TODO : error
                return undefined;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps,
    );

    return { request, loading, error };
}
