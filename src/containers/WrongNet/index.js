import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Message } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';

class WrongNet extends PureComponent {
    render() {
        const { isWrongNetwork } = this.props;

        return (
            <div>
                {isWrongNetwork &&
                    <Message error>
                        WebClient is used MetaMask and connected to the wrong network. 
                        Please reconnect your MetaMask plugin to the Rinkeby provider
                    </Message>               
                }                
            </div>
        );
    };
}

WrongNet.propTypes = {
    isWrongNetwork: PropTypes.bool
}

function mapStateToProps(state) {

    return {
        isWrongNetwork: selectors.isWrongNetwork(state)
    }
}

export default connect(mapStateToProps)(WrongNet);
