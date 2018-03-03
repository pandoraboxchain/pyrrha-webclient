import './KernelConstructorForm.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button, Message } from 'semantic-ui-react';

import { KernelConstructorFormModel } from '../../store/models';

import { 
    setKernelConstructorField, 
    invalidateKernelConstructorError,
    submitKernelConstructorForm,
    dismissKernelConstructorMessage
} from '../../store/actions';
import {
    isWeb3Connected,
    isKernelConSubmitting,
    getKernelConFormErrors,
    getKernelConFormValues,
    getKernelConMessages,
    getKernelConErrorMessages
} from '../../store/selectors';

class KernelConstructorForm extends PureComponent {

    fileInputKey = Date.now();

    handleSubmit = () => {
        this.fileInputKey = Date.now();
        this.props.submitForm();
    };

    handleMessageDismiss = (e, { index }) => this.props.dismissMessage(index);

    handleErrorDismiss = () => this.props.invalidateError();

    onFieldChange = (e, { name, value, type }) => {

        if (type === 'file') {

            value = e.target.files[0];
        }

        this.props.updateField(name, value);
    };

    render() {

        const { 
            isConnected, 
            isSubmitting, 
            formValues, 
            formErrors,
            messages,
            errorMessages 
        } = this.props;

        return (
            <div>
                <Form 
                    onSubmit={this.handleSubmit} 
                    error={errorMessages.length > 0} 
                    loading={isSubmitting}>

                    {Object.keys(KernelConstructorFormModel).map((field, index) => (
                        <Form.Field key={index} required>
                            <label>{KernelConstructorFormModel[field].label}</label>
                            {KernelConstructorFormModel[field].type === 'file' &&
                                <Form.Input
                                    key={field+this.fileInputKey}
                                    name={field} 
                                    type={KernelConstructorFormModel[field].type}
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index} />
                            }
                            {KernelConstructorFormModel[field].type !== 'file' &&
                                <Form.Input
                                    name={field} 
                                    value={formValues[field] || ''}
                                    type={KernelConstructorFormModel[field].type}
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index} />
                            }                            
                        </Form.Field>
                    ))}

                    <Button 
                        disabled={!isConnected}
                        type="submit"
                        tabIndex="5"  
                        size="large">Submit</Button>
                    <Message
                        error
                        onDismiss={this.handleErrorDismiss}>
                        <Message.List>
                            {errorMessages.map((err, index) => 
                                <Message.Item key={index}>{err}</Message.Item>
                            )}                        
                        </Message.List>
                    </Message>
                    {messages.length > 0 &&
                        (messages.map((msg, index) => 
                            <div className="pn-message-outer" key={index}>
                                <Message
                                    index={index}
                                    success
                                    visible={messages.length > 0}
                                    onDismiss={this.handleMessageDismiss}>
                                    {msg}
                                </Message>
                            </div>                            
                        ))
                    }
                </Form>
            </div>
        );
    }
}

KernelConstructorForm.propTypes = {
    isConnected: PropTypes.bool,
    isSubmitting: PropTypes.bool, 
    formValues: PropTypes.object, 
    formErrors: PropTypes.object,
    messages: PropTypes.array,
    errorMessages: PropTypes.array
}

const mapStateToProps = state => {

    return {
        isConnected: isWeb3Connected(state),
        isSubmitting: isKernelConSubmitting(state),
        formValues: getKernelConFormValues(state),
        formErrors: getKernelConFormErrors(state),
        messages: getKernelConMessages(state),
        errorMessages: getKernelConErrorMessages(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        updateField: (name, value) => dispatch(setKernelConstructorField(name, value)),
        dismissMessage: index => dispatch(dismissKernelConstructorMessage(index)),
        invalidateError: () => dispatch(invalidateKernelConstructorError()),
        submitForm: () => dispatch(submitKernelConstructorForm())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KernelConstructorForm);
