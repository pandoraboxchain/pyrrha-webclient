import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { Table, Button } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './DatasetsTable.scss';

class DatasetsTable extends PureComponent {

    handleRefreshDatasets = (e) => {
        e.preventDefault();
        this.props.refreshDatasets();        
    };

    handleOpenConstructor = (e) => {
        e.preventDefault();
        this.props.gotToDatasetConstructor();
    };

    componentWillMount = () => {
        
        if (!this.props.datasets || this.props.datasets.length === 0) {

            this.props.refreshDatasets();        
        }        
    };

    render() {
        const { isConnecting, isFetching, datasets } = this.props;

        return (
            <div>
                <Table celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Dim</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Batches</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Samples</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {datasets && datasets.length > 0 &&
                            datasets.map(dataset => (
                                <Table.Row key={dataset.id}>
                                    <Table.Cell>{dataset.id}</Table.Cell>
                                    <Table.Cell title={dataset.address}>{dataset.address}</Table.Cell>
                                    <Table.Cell>{dataset.dataDim}</Table.Cell>
                                    <Table.Cell>{dataset.batchesCount}</Table.Cell>
                                    <Table.Cell>{dataset.samplesCount}</Table.Cell>
                                    <Table.Cell>{dataset.currentPrice}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="6">
                                <Button 
                                    loading={isConnecting || isFetching}
                                    onClick={this.handleRefreshDatasets}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of datasets...</span>
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
        isFetching: selectors.isDatasetsFetching(state),
        datasets: selectors.getDatasets(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        gotToDatasetConstructor: () => dispatch(push('/dataset')),
        refreshDatasets: () => dispatch(actions.datasetsTableFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetsTable);
