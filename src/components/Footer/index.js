import React from 'react';
import './Footer.scss';

import { Container, Divider } from 'semantic-ui-react';
import Web3Ver from '../../containers/Web3Ver';
import EthStatus from '../../containers/EthStatus';

const Footer = () => (
    <div className="pn-footer">
        <Divider />
        <Container>    
            <EthStatus />
            <Web3Ver />            
        </Container>        
    </div>
);

export default Footer;
