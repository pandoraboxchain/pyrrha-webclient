import './DatasetConstructorForm.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button, Message, Progress } from 'semantic-ui-react';

import { DatasetConstructorFormModel as formModel } from '../../store/models';

import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class DatasetConstructorForm extends PureComponent {

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

    handleAddBatch = (e, {name}) => {
        e.preventDefault();
        this.props.addMultipleFieldItem(name);
    };

    handleRemoveBatch = (e, {name, item}) => {
        e.preventDefault();
        this.props.removeMultipleFieldItem(name, item);
    };

    onFieldChange = (e, { field, value, type, item }) => {

        if (type === 'file') {

            value = e.target.files[0]; 
        } 

        this.props.updateField(field, value, item);
    };

    initMultipleFields = () => {

        Object.keys(formModel).forEach(name => {

            if (formModel[name].multiple === true && 
                typeof this.props.formValues[name] !== 'object' && 
                Object.keys(this.props.formValues[name] || {}).length === 0) {
                
                this.props.addMultipleFieldItem(name);
            }
        });
    };

    componentWillMount = () => {
        this.initMultipleFields();
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
                            {formModel[field].type === 'file' && formModel[field].multiple === true &&
                                <div>
                                    {Object.keys(formValues[field] || {}).map((item, fieldIndex) => 
                                        <Form.Input
                                            key={item+this.fileInputKey+fieldIndex}
                                            name={item}
                                            field={field} 
                                            item={item}
                                            type={formModel[field].type}
                                            onChange={this.onFieldChange}  
                                            error={formErrors[field] ? formErrors[field][item] : false}
                                            action={fieldIndex > 0 ? {
                                                icon: 'remove', 
                                                name: field, 
                                                item: item, 
                                                onClick: this.handleRemoveBatch 
                                            } : null} />
                                    )}                                   

                                    <Button 
                                        name={field} 
                                        onClick={this.handleAddBatch}>{formModel[field].addLabel || `Add ${field}`}</Button>
                                </div>
                            }
                            {formModel[field].type === 'file' && !formModel[field].multiple &&
                                <Form.Input
                                    key={field+this.fileInputKey}
                                    name={field} 
                                    field={field} 
                                    type={formModel[field].type}
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index} />
                            }
                            {formModel[field].type !== 'file' && !formModel[field].list &&
                                <Form.Input
                                    name={field} 
                                    field={field} 
                                    placeholder={formModel[field].placeholder} 
                                    value={formValues[field] || ''}
                                    type={formModel[field].type}
                                    onChange={this.onFieldChange}  
                                    error={formErrors[field]}
                                    tabIndex={index} />                                
                            }
                            {(formModel[field].type !== 'file' && formModel[field].list) &&
                                <Form.Input
                                    name={field} 
                                    field={field} 
                                    placeholder={formModel[field].placeholder} 
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
                        tabIndex={Object.keys(formModel).length}  
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
        )
    }
}

DatasetConstructorForm.propTypes = {
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
        isSubmitting: selectors.isDatasetConSubmitting(state),
        formValues: selectors.getDatasetConFormValues(state),
        lists: selectors.getDatasetConLists(state),
        formErrors: selectors.getDatasetConFormErrors(state),
        messages: selectors.getDatasetConMessages(state),
        errorMessages: selectors.getDatasetConErrorMessages(state),
        progress: selectors.getDatasetConFormProgress(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        addMultipleFieldItem: name => dispatch(actions.addDatasetBatch(name)),
        removeMultipleFieldItem: (name, item) => dispatch(actions.removeDatasetBatch(name, item)),
        updateField: (field, value, item) => dispatch(actions.setDatasetConstructorField(field, value, item)),
        dismissMessage: index => dispatch(actions.dismissDatasetConstructorMessage(index)),
        invalidateError: () => dispatch(actions.invalidateDatasetConstructorError()),
        submitForm: () => dispatch(actions.submitDatasetConstructorForm()),
        updateAccounts: (updateAction) => dispatch(actions[updateAction]())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetConstructorForm);
