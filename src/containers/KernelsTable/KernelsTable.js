import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { Loader, Table, Button, Icon, Responsive } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './KernelsTable.scss';

class KernelsTable extends PureComponent {

    handleRefreshKernels = (e) => {
        e.preventDefault();
        this.props.refreshKernels();        
    };

    handleOpenConstructor = (e) => {
        e.preventDefault();
        this.props.gotToKernelConstructor();
    };

    UNSAFE_componentWillMount = () => {
        
        if (this.props.isConnected && 
            (!this.props.kernels || this.props.kernels.length === 0)) {

            this.props.refreshKernels();        
        }        
    };

    render() {
        const { isConnecting, isFetching, kernels } = this.props;

        return (
            <div>
                <Loader size="large" active={isFetching} />
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name="chevron right" /></Table.HeaderCell>
                            <Table.HeaderCell colSpan="6">
                                <h3>Kernels</h3>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Responsive as={Table.HeaderCell} width={4} minWidth={600}>Description</Responsive>
                            <Table.HeaderCell width={1}>Dim</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Compl</Table.HeaderCell>
                            <Responsive as={Table.HeaderCell} width={1} minWidth={600}>Price</Responsive>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {kernels && kernels.length > 0 &&
                            kernels.map(kernel => (
                                <Table.Row key={kernel.id}>
                                    <Table.Cell>{kernel.id}</Table.Cell>
                                    <Table.Cell title={kernel.address} className="pn-address-link"><a href={`https://rinkeby.etherscan.io/address/${kernel.address}`}>{kernel.address}</a></Table.Cell>
                                    <Responsive as={Table.Cell} minWidth={600}>{kernel.description}</Responsive>
                                    <Table.Cell>{kernel.dataDim}</Table.Cell>
                                    <Table.Cell>{kernel.complexity}</Table.Cell>
                                    <Responsive as={Table.Cell} minWidth={600}>{kernel.currentPrice}</Responsive>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="6">
                                <Button 
                                    loading={isConnecting || isFetching}
                                    onClick={this.handleRefreshKernels}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching kernels...</span>
                                }
                                <Button floated="right"
                                    onClick={this.handleOpenConstructor}>Add</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        isConnecting: selectors.isPjsInitializing(state),
        isConnected: selectors.isWeb3Connected(state),
        isFetching: selectors.isKernelsFetching(state),
        kernels: selectors.getKernels(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        gotToKernelConstructor: () => dispatch(push('/kernel')),
        refreshKernels: () => dispatch(actions.kernelsTableFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KernelsTable);
