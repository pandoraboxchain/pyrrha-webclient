import 'semantic-ui-css/semantic.css';
import './App.scss';

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import routes from '../../router';

export default class App extends Component {    
    render() {
        return (
            <div>
                <Header />
                <Container className="pn-content-panel">
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component} />
                    ))}
                </Container>
                <Footer />
            </div>
        );
    }
}
