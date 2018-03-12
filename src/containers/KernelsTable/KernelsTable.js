import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { Table, Button } from 'semantic-ui-react';

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

    componentWillMount = () => {
        
        if (!this.props.kernels || this.props.kernels.length === 0) {

            this.props.refreshKernels();        
        }        
    };

    render() {
        const { isConnecting, isFetching, kernels } = this.props;

        return (
            <div>
                <Table celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Dim</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Compl</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {kernels && kernels.length > 0 &&
                            kernels.map(kernel => (
                                <Table.Row key={kernel.id}>
                                    <Table.Cell>{kernel.id}</Table.Cell>
                                    <Table.Cell title={kernel.address}>{kernel.address}</Table.Cell>
                                    <Table.Cell>{kernel.dataDim}</Table.Cell>
                                    <Table.Cell>{kernel.complexity}</Table.Cell>
                                    <Table.Cell>{kernel.currentPrice}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="5">
                                <Button 
                                    loading={isConnecting || isFetching}
                                    onClick={this.handleRefreshKernels}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of kernels...</span>
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
        isConnecting: selectors.isWeb3Connecting(state),
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
