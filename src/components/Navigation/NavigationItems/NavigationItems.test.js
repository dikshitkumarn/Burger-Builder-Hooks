import React from 'react'

import { configure, shallow } from 'enzyme'
import Adaptor from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adaptor()})

describe('<NavigationItems />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItems /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render three <NavigationItems /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render the <NavigationItem to="/logout" >Logout</NavigationItem> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true)
    })
})