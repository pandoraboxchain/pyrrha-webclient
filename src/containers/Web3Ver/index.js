import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    web3Version
} from '../../store/selectors';

class Web3Ver extends PureComponent {
    render() {
        const { web3Version } = this.props;

        return (
            <div>
                {web3Version &&
                    <span>web3.js v.{web3Version}</span>
                }                
            </div>
        );
    };
}

Web3Ver.propTypes = {
    web3Version: PropTypes.string
}

function mapStateToProps(state) {
    return {
        web3Version: web3Version(state)
    }
}

export default connect(mapStateToProps)(Web3Ver);
