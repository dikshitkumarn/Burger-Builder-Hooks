import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error, setState] = useState(null)

        const reqInterceptor = axios.interceptors.request.use( req => {
            setState( null );
            return req;
        } );
        const resInterceptor = axios.interceptors.response.use( res => res, error => {
            setState( error );
        } );

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject( reqInterceptor );
                axios.interceptors.response.eject( resInterceptor );
            }
        }, [reqInterceptor, resInterceptor])
        

        const errorConfirmedHandler = () => {
            setState( null );
        }

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;