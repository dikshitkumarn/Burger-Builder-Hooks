import React, { useEffect, useState } from 'react'

const asyncComponent = (importComponent) => {
    return props => {
        const [state, setState] = useState({
            component: null
        })

        useEffect( () => {
            importComponent()
            .then( cmp => setState({component: cmp.default}) )
        }, [])


        let C = state.component

        return C ? <C {...props} /> : null
    }
} 

export default asyncComponent