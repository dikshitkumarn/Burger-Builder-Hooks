import { useState, useEffect } from 'react'

export const useErrorHandler = httpClient => {
    const [error, setState] = useState(null)

    const reqInterceptor = httpClient.interceptors.request.use( req => {
        setState( null );
        return req;
    } );
    const resInterceptor = httpClient.interceptors.response.use( res => res, error => {
        setState( error );
    } );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject( reqInterceptor );
            httpClient.interceptors.response.eject( resInterceptor );
        }
    }, [reqInterceptor, resInterceptor])
    

    const errorConfirmedHandler = () => {
        setState( null );
    }

    return [error, errorConfirmedHandler]
}