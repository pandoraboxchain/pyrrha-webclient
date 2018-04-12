import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pjsInit } from '../../store/actions';

import * as selectors from '../../store/selectors';

class EthStatus extends PureComponent {

    handleReconnectClick = e => {
        e.preventDefault();
        this.props.dispatch(pjsInit());
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

                {(isConnected && connectedTo) &&
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
        isConnecting: selectors.isPjsInitializing(state),
        isConnected: selectors.isWeb3Connected(state),
        connectedTo: selectors.pjsWeb3ConnectedTo(state),
        connectedAt: selectors.pjsConnectedAt(state),
        isError: !!selectors.pjsErrorMessage(state)
    }
}

export default connect(mapStateToProps)(EthStatus);
