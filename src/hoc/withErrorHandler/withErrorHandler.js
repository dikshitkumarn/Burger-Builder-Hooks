import React from 'react';

import { useErrorHandler } from '../../hooks/useErrorHandler'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error, cleanError] = useErrorHandler(axios)
        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={cleanError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;