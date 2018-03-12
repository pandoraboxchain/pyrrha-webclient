import './Header.scss';

import React, { Component } from 'react';

import { Menu, Container } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';

import routes from '../../router';

class Header extends Component {

    render() {
        return (
            <div>
                <Container>
                    <Menu fixed="top" className="pn-header">
                        <Menu.Item as='a' header>
                            <h1 className="pn-head-title">Pyrrha WebClient</h1>
                        </Menu.Item>            
                        {routes.map(route => (
                            <Menu.Item key={route.path.toString()}>
                                <NavLink
                                    to={{ pathname: route.path, state: { prevPath: this.props.location.pathname } }}
                                    exact={route.exact} 
                                    className="pn-nav"
                                    activeClassName="selected">{route.label}</NavLink>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Container>
            </div>
        )
    }
}

export default withRouter(Header);
