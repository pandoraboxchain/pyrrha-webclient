import './KernelConstructorForm.scss';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ConstructorForm from '../../components/ConstructorForm';
import { KernelConstructorFormModel } from '../../store/models';

import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as utils from '../../utils';

class KernelConstructorForm extends PureComponent {

    render() {

        return (
            <ConstructorForm
                formModel={KernelConstructorFormModel}
                {...this.props}/>
        )
    }
}

const mapStateToProps = state => {

    return {
        ...utils.extractListsPropsFromModel(KernelConstructorFormModel, selectors, state),
        isConnected: selectors.isWeb3Connected(state),
        isSubmitting: selectors.isKernelConSubmitting(state),
        formValues: selectors.getKernelConFormValues(state),
        lists: selectors.getKernelConLists(state),
        formErrors: selectors.getKernelConFormErrors(state),
        messages: selectors.getKernelConMessages(state),
        errorMessages: selectors.getKernelConErrorMessages(state),
        progress: selectors.getKernelConFormProgress(state),
        statusMessage: selectors.getKernelConFormStatus(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        willMountTasks: () => {
            dispatch(actions.web3AccountsFetch());
        },
        resetConstructorState: () => dispatch(actions.resetKernelConstructorState()),
        updateField: (name, value) => dispatch(actions.setKernelConstructorField(name, value)),
        dismissMessage: index => dispatch(actions.dismissKernelConstructorMessage(index)),
        invalidateError: () => dispatch(actions.invalidateKernelConstructorError()),
        submitForm: () => dispatch(actions.submitKernelConstructorForm()),
        startAction: (actionToStart) => dispatch(actions[actionToStart]())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KernelConstructorForm);
