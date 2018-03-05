import './KernelConstructorForm.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button, Message, Progress } from 'semantic-ui-react';

import { KernelConstructorFormModel as formModel } from '../../store/models';

import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class KernelConstructorForm extends PureComponent {

    fileInputKey = Date.now();

    handleSubmit = () => {
        this.fileInputKey = Date.now();
        this.props.submitForm();
    };

    handleMessageDismiss = (e, { index }) => this.props.dismissMessage(index);

    handleErrorDismiss = () => this.props.invalidateError();

    handleAccountsRefresh = (e, { refreshaction }) => {
        e.preventDefault();
        this.props.updateAccounts(refreshaction);
    };

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
            lists,
            formErrors,
            messages,
            progress,
            errorMessages 
        } = this.props;

        return (
            <div>
                <Form 
                    onSubmit={this.handleSubmit} 
                    error={errorMessages.length > 0} 
                    loading={isSubmitting}>

                    {Object.keys(formModel).map((field, index) => (
                        <Form.Field key={index} required>
                            <label>{formModel[field].label}</label>
                            {formModel[field].type === 'file' &&
                                <Form.Input
                                    key={field+this.fileInputKey}
                                    name={field} 
                                    type={formModel[field].type}
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index} />
                            }
                            {formModel[field].type !== 'file' && !formModel[field].list &&
                                <Form.Input
                                    name={field} 
                                    value={formValues[field] || ''}
                                    type={formModel[field].type}
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index} />                                
                            }
                            {(formModel[field].type !== 'file' && formModel[field].list) &&
                                <Form.Input
                                    name={field} 
                                    value={formValues[field] || ''}
                                    type={formModel[field].type} 
                                    list={formModel[field].list} 
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index}>
                                    <input />
                                    <Button
                                        style={{marginLeft: 2}}
                                        loading={lists[formModel[field].list.name].isRefreshing} 
                                        refreshaction={formModel[field].list.action}
                                        onClick={this.handleAccountsRefresh}>Refresh {formModel[field].list.name}</Button>
                                </Form.Input>
                            }
                            {formModel[field].list &&
                                <datalist id={formModel[field].list.name}>
                                    {lists[formModel[field].list.name] &&
                                        (lists[formModel[field].list.name].items.map((item, index) => (
                                            <option key={index} value={item} />
                                        )))
                                    }                                    
                                </datalist>
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
                </Form>

                {Object.keys(progress).length > 0 && 
                    (Object.keys(progress).map((key, index) => 
                        <Progress key={index} percent={progress[key].percent}>{key}</Progress>
                    ))
                }
                
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
            </div>
        );
    }
}

KernelConstructorForm.propTypes = {
    isConnected: PropTypes.bool,
    isSubmitting: PropTypes.bool, 
    formValues: PropTypes.object,
    lists: PropTypes.object,
    formErrors: PropTypes.object,
    messages: PropTypes.array,
    progress: PropTypes.object,
    errorMessages: PropTypes.array
}

const mapStateToProps = state => {

    return {
        isConnected: selectors.isWeb3Connected(state),
        isSubmitting: selectors.isKernelConSubmitting(state),
        formValues: selectors.getKernelConFormValues(state),
        lists: selectors.getKernelConLists(state),
        formErrors: selectors.getKernelConFormErrors(state),
        messages: selectors.getKernelConMessages(state),
        errorMessages: selectors.getKernelConErrorMessages(state),
        progress: selectors.getKernelConFormProgress(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        updateField: (name, value) => dispatch(actions.setKernelConstructorField(name, value)),
        dismissMessage: index => dispatch(actions.dismissKernelConstructorMessage(index)),
        invalidateError: () => dispatch(actions.invalidateKernelConstructorError()),
        submitForm: () => dispatch(actions.submitKernelConstructorForm()),
        updateAccounts: (updateAction) => dispatch(actions[updateAction]())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KernelConstructorForm);
