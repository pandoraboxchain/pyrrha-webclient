import './ConstructorForm.scss';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Message, Progress } from 'semantic-ui-react';

class ConstructorForm extends PureComponent {

    fileInputKey = Date.now();

    handleSubmit = () => {
        this.fileInputKey = Date.now();
        this.props.submitForm();
    };

    handleMessageDismiss = (e, { index }) => this.props.dismissMessage(index);

    handleErrorDismiss = () => this.props.invalidateError();

    handleInputButtonAction = (e, { refreshaction }) => {
        e.preventDefault();
        this.props.updateAccounts(refreshaction);
    };

    handleAddMultipleFieldItem = (e, {name}) => {
        e.preventDefault();
        this.props.addMultipleFieldItem(name);
    };

    handleRemoveMultipleFieldItem = (e, {name, item}) => {
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

        Object.keys(this.props.formModel).forEach(name => {

            if (this.props.formModel[name].multiple === true && 
                typeof this.props.formValues[name] !== 'object' && 
                Object.keys(this.props.formValues[name] || {}).length === 0) {
                
                this.props.addMultipleFieldItem(name);
            }
        });
    };

    componentWillMount = () => {
        this.initMultipleFields();

        if (typeof this.props.willMountTasks === 'function') {

            this.props.willMountTasks();
        }
    };

    componentWillUnmount = () => {
        this.props.resetConstructorState();
    };

    render() {

        const {
            formModel,
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
                                                onClick: this.handleRemoveMultipleFieldItem 
                                            } : null} />
                                    )}                                   

                                    <Button 
                                        name={field} 
                                        onClick={this.handleAddMultipleFieldItem}>{formModel[field].addLabel || `Add ${field}`}</Button>
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
                                <div>
                                    <Form.Input
                                        name={field} 
                                        field={field} 
                                        placeholder={formModel[field].placeholder} 
                                        value={formValues[field] || ''}
                                        type={formModel[field].type} 
                                        list={formModel[field].list.name} 
                                        onChange={this.onFieldChange}  
                                        error={formErrors[field]}
                                        tabIndex={index}>
                                        <input />
                                        <Button
                                            style={{marginLeft: 2}}
                                            loading={lists[formModel[field].list.name].isRefreshing} 
                                            refreshaction={formModel[field].list.action}
                                            onClick={this.handleInputButtonAction}>
                                                Refresh {formModel[field].list.name}</Button>
                                    </Form.Input>
                                    <datalist id={formModel[field].list.name}>
                                        {lists[formModel[field].list.name] &&
                                            (lists[formModel[field].list.name].items.map((item, index) => (
                                                <option key={index} value={item} />
                                            )))
                                        }                                    
                                    </datalist>
                                </div>
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

ConstructorForm.propTypes = {
    formModel: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired, 
    formValues: PropTypes.object.isRequired,
    lists: PropTypes.object.isRequired,
    formErrors: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    progress: PropTypes.object.isRequired,
    errorMessages: PropTypes.array.isRequired,

    // dspatcher props
    resetConstructorState: PropTypes.func.isRequired,
    addMultipleFieldItem: PropTypes.func,
    removeMultipleFieldItem: PropTypes.func,
    updateField: PropTypes.func.isRequired,
    dismissMessage: PropTypes.func.isRequired,
    invalidateError: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    updateAccounts: PropTypes.func.isRequired
}

export default ConstructorForm;
