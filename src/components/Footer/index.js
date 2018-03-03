import React from 'react';

import { Container, Divider } from 'semantic-ui-react';
import Web3Ver from '../../containers/Web3Ver';
import EthStatus from '../../containers/EthStatus';

const Footer = () => (
    <div>
        <Divider />
        <Container>            
            <EthStatus />
            <Web3Ver />
        </Container>        
    </div>
);

export default Footer;
