import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Table, Button } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

class KernelsTable extends PureComponent {

    handleRefreshKernels = (e) => {
        e.preventDefault();
        this.props.refreshKernels();
    };

    componentWillMount = () => {
        this.props.refreshKernels();
    };

    render() {
        const { isConnecting, isFetching, kernels } = this.props;

        return (
            <div>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {kernels && kernels.length > 0 &&
                            kernels.map(kernel => (
                                <Table.Row key={kernel.id}>
                                    <Table.Cell>{kernel.id}</Table.Cell>
                                    <Table.Cell>{kernel.address}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Button 
                                    loading={isConnecting || isFetching}
                                    onClick={this.handleRefreshKernels}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of kernels...</span>
                                }
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
        refreshKernels: () => dispatch(actions.kernelsTableFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KernelsTable);
