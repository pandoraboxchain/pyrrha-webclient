import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { web3ConnectProvider } from '../../store/actions';

import {
    isWeb3Connecting,
    isWeb3Connected,
    web3ConnectedTo,
    web3ConnectedAt,
    web3IsError
} from '../../store/selectors';

class EthStatus extends PureComponent {

    handleReconnectClick = e => {
        e.preventDefault();
        this.props.dispatch(web3ConnectProvider());
    }

    render() {
        const { isConnecting, isConnected, connectedTo, connectedAt, isError } = this.props;

        return (
            <div>
                {isConnecting &&
                    <div>Connecting...</div>
                }

                {isError &&
                    <div>Connection error 
                        <button 
                            disabled={isConnecting && isConnected} 
                            onClick={this.handleReconnectClick}>Reconnect immediately</button>
                    </div>
                }

                {isConnected &&
                    <div>Connected to {connectedTo} at {new Date(connectedAt).toLocaleTimeString()}</div>
                }                
            </div>
        );
    };
}

EthStatus.propTypes = {
    isConnecting: PropTypes.bool
}

function mapStateToProps(state) {

    return {
        isConnecting: isWeb3Connecting(state),
        isConnected: isWeb3Connected(state),
        connectedTo: web3ConnectedTo(state),
        connectedAt: web3ConnectedAt(state),
        isError: web3IsError(state)
    }
}

export default connect(mapStateToProps)(EthStatus);
