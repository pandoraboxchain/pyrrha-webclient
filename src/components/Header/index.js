import './Header.scss';

import React, { Component } from 'react';

import { Link, NavLink, withRouter } from 'react-router-dom';

import routes from '../../router';

class Header extends Component {

    render() {
        return (
            <div className="pn-header">
                <div className="home">
                    <div className="logo"></div><Link to="/"><h1 className="pn-head-title">Pyrrha WebClient</h1></Link>
                </div>
                <div className="menu">
                    <ul>
                        {routes.map(route => (
                            <li key={route.path.toString()}>
                                <NavLink
                                    to={{ pathname: route.path, state: { prevPath: this.props.location.pathname } }}
                                    exact={route.exact} 
                                    className="pn-nav"
                                    activeClassName="selected">{route.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                    {/* <Menu fixed="top" className="pn-header">
                        {routes.map(route => (
                            <Menu.Item key={route.path.toString()}>
                                <NavLink
                                    to={{ pathname: route.path, state: { prevPath: this.props.location.pathname } }}
                                    exact={route.exact} 
                                    className="pn-nav"
                                    activeClassName="selected">{route.label}</NavLink>
                            </Menu.Item>
                        ))}
                    </Menu> */}
                </div>
                {/* <Grid.Column only="mobile">
                    <Menu fixed="top"  inverted fluid>
                        <Dropdown item text="Pyrrha WebClient" fluid>
                            <Dropdown.Menu>
                            {routes.map(route => (
                                <Dropdown.Item key={route.path.toString()}>
                                    <NavLink
                                        to={{ pathname: route.path, state: { prevPath: this.props.location.pathname } }}
                                        exact={route.exact} 
                                        className="pn-nav"
                                        activeClassName="selected">{route.label}</NavLink>
                                </Dropdown.Item>
                            ))}
                            </Dropdown.Menu>                                    
                        </Dropdown>
                    </Menu>
                </Grid.Column> */}  
            </div>
        )
    }
}

export default withRouter(Header);
