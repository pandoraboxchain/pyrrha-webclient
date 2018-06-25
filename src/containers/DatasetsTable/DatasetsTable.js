import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { Loader, Table, Button, Icon, Responsive } from 'semantic-ui-react';

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

    UNSAFE_componentWillMount = () => {
        
        if (this.props.isConnected && 
            (!this.props.datasets || this.props.datasets.length === 0)) {

            this.props.refreshDatasets();        
        }        
    };

    render() {
        const { isConnecting, isFetching, datasets } = this.props;

        return (
            <div>
                <Loader size="large" active={isFetching} />
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name="chevron right" /></Table.HeaderCell>
                            <Table.HeaderCell colSpan="5">
                                <h3>Datasets</h3>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Responsive as={Table.HeaderCell} width={4} minWidth={600}>Description</Responsive>
                            <Table.HeaderCell width={1}>Dim</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Batches</Table.HeaderCell>
                            <Responsive as={Table.HeaderCell} width={1} minWidth={600}>Price</Responsive>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {datasets && datasets.length > 0 &&
                            datasets.map(dataset => (
                                <Table.Row key={dataset.id}>
                                    <Table.Cell>{dataset.id}</Table.Cell>
                                    <Table.Cell title={dataset.address} className="pn-address-link"><a href={`https://rinkeby.etherscan.io/address/${dataset.address}`}>{dataset.address}</a></Table.Cell>
                                    <Responsive as={Table.Cell} minWidth={600}>{dataset.description}</Responsive>
                                    <Table.Cell>{dataset.dataDim}</Table.Cell>
                                    <Table.Cell>{dataset.batchesCount}</Table.Cell>
                                    <Responsive as={Table.Cell} minWidth={600}>{dataset.currentPrice}</Responsive>
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
        isConnecting: selectors.isPjsInitializing(state),
        isConnected: selectors.isWeb3Connected(state),
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
