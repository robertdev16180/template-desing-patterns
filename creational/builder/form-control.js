export class FormControl {

    constructor ({ id = '', value = '', validators = [] }) {
        this.id = id;
        this.validators = validators;
        this.element = document.getElementById(this.id);
        this.initCotrol(value);
        this.errors = {};
    }

    isFunction = validator => typeof validator === 'function';

    initCotrol(value = '') {
        if (value) {
            this.updateValue(value);
        }
    }

    hasErrorRequired(errors = {}) {
        return Object.keys(errors).some(key => key === 'required');
    }

    getValue() {
        return this.element.value;
    }

    getErrors() {
        this.errors = {};

        this.validators.filter(this.isFunction).forEach(validator => {

            const error = validator(this.getValue());

            if (error) {
                Object.assign(this.errors, error);
            }
        });

        return this.errors;
    }

    setValidator(validator) {
        this.validators = [...this.validators, validator];
    }

    updateValue(value = '') {
        this.element.value = value;
    }
    
    isValid() {
        const errors = this.getErrors();

        if (this.hasErrorRequired(errors)) {
            return false;
        }

        return !Object.values(errors).some(error => error);
    }
};
