import './Header.scss';

import React, { Component } from 'react';

import { Grid, Menu } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import routes from '../../router';

class Header extends Component {

    render() {
        return (
            <div>                
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Menu fixed="top" className="pn-header">
                                <Menu.Item header>
                                    <Link to="/"><h1 className="pn-head-title">Pyrrha WebClient</h1></Link>
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
                        </Grid.Column>
                        <Grid.Column>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Header);
