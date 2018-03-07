import './JobConstructorForm.scss';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ConstructorForm from '../../components/ConstructorForm';
import { JobConstructorFormModel } from '../../store/models';

import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class JobConstructorForm extends PureComponent {

    render() {

        return (
            <ConstructorForm
                formModel={JobConstructorFormModel}
                {...this.props}/>
        )
    }
}

const mapStateToProps = state => {

    return {
        isConnected: selectors.isWeb3Connected(state),
        isSubmitting: selectors.isJobConSubmitting(state),
        formValues: selectors.getJobConFormValues(state),
        lists: selectors.getJobConLists(state),
        formErrors: selectors.getJobConFormErrors(state),
        messages: selectors.getJobConMessages(state),
        errorMessages: selectors.getJobConErrorMessages(state),
        progress: selectors.getJobConFormProgress(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        willMountTasks: () => {
            dispatch(actions.web3AccountsUpdate());
        },
        resetConstructorState: () => dispatch(actions.resetJobConstructorState()),
        updateField: (name, value) => dispatch(actions.setJobConstructorField(name, value)),
        dismissMessage: index => dispatch(actions.dismissJobConstructorMessage(index)),
        invalidateError: () => dispatch(actions.invalidateJobConstructorError()),
        submitForm: () => dispatch(actions.submitJobConstructorForm()),
        updateAccounts: (updateAction) => dispatch(actions[updateAction]())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(JobConstructorForm);
