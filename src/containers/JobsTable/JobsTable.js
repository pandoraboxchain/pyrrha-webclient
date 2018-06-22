import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { Loader, Table, Responsive, Button, Icon } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './JobsTable.scss';

class JobsTable extends PureComponent {

    handleRefreshJobs = (e) => {
        e.preventDefault();
        this.props.refreshJobs();        
    };

    handleOpenConstructor = (e) => {
        e.preventDefault();
        this.props.gotToKernelConstructor();
    };

    UNSAFE_componentWillMount = () => {
        
        if (this.props.isConnected && 
            (!this.props.jobs || this.props.jobs.length === 0)) {

            this.props.refreshJobs();        
        }        
    };

    render() {
        const { isConnecting, isFetching, jobs } = this.props;

        return (
            <div>
                <Loader size="large" active={isFetching} />
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell><Icon name="chevron right" /></Table.HeaderCell>
                            <Table.HeaderCell colSpan="5">
                                <h3>Jobs</h3>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Responsive as={Table.HeaderCell} width={4} minWidth={600}>Description</Responsive>
                            <Responsive as={Table.HeaderCell} width={2} minWidth={600}>batches</Responsive>
                            <Table.HeaderCell width={2}>status</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {jobs && jobs.length > 0 &&
                            jobs.map(job => (
                                <Table.Row key={job.id}>
                                    <Table.Cell>{job.id}</Table.Cell>
                                    <Table.Cell title={job.address}><a href={`https://rinkeby.etherscan.io/address/${job.address}`}>{job.address}</a></Table.Cell>
                                    <Responsive as={Table.Cell} minWidth={600}>{job.description}</Responsive>
                                    <Responsive as={Table.Cell} minWidth={600}>{job.batches}</Responsive>
                                    <Table.Cell>{job.jobStatus}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="5">
                                <Button 
                                    loading={isConnecting || isFetching}
                                    onClick={this.handleRefreshJobs}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of jobs...</span>
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
        isFetching: selectors.isJobsFetching(state),
        jobs: selectors.getJobs(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        gotToKernelConstructor: () => dispatch(push('/job')),
        refreshJobs: () => dispatch(actions.jobsTableFetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsTable);
