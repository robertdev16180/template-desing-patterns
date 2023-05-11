
class FormControl {

    constructor ({ id = '', value = '', validators = [] }) {
        this.id = id;
        this.validators = validators;
        this.errors = {};
        this.initCotrol(value);
    }

    initCotrol(value = '') {
        if (value) {
            this.updateValue(value);
        }
    }

    getValue() {
        const element = document.getElementById(this.id);
        
        if (element) {
            return element.value;
        } else {
            console.error(`element "${key}" does not exist`);
        }
    }

    getErrors() {
        this.runValidators();
        return this.errors;
    }

    updateValue(value = '') {

        const element = document.getElementById(this.id);
        
        if (element) {
            element.value = value;
        } else {
            console.error(`element "${key}" does not exist`);
        }
    }

    runValidators() {
        this.errors = {};

        for (const validator of this.validators) {
            
            if (typeof validator === 'function') {
            
                const error = validator(this.getValue());
    
                if (error) {
                    Object.assign(this.errors, error);
                }
            }
        }
    }

    isValid() {
        this.runValidators();
        return !Object.values(this.errors).some(error => error);
    }
}

class FormGroup {

    constructor (controls) { // FormControl[]
        this.controls = controls;
    }

    getControl(key = '') { // FormControl
        return this.controls[key];
    }

    getControls() { // FormControl[]
        return this.controls;
    }

    getControlErrors(key = '') {
        return this.controls[key].getErrors();
    }

    get controlsErrors() {
        
        const controlErrors = {};

        Object.values(this.controls).map(control => {
            controlErrors[control.id] = control.getErrors();
        });

        return controlErrors;
    }

    get controlsValue() {
        const controls = {};

        Object.values(this.controls).map(control => {
            controls[control.id] = control.getValue();
        });

        return controls;
    }

    setControl(id = '', control = {}) {
        if (this.controls[id]) {
            throw Error(`Key "${id}" already exists`); 
        } else {
            this.controls[id] = control;
        }
    }

    isValid() {
        return Object.values(this.controls).every(control => control.isValid());
    }
}

// Validadores
const required = (message = 'field required') => (value) => value.trim() ? null : { required: { message } };
const minLength = (length, message) => (value) => value.length >= length ? null : { minLength: { requiredLength: length, message } };
const maxLength = (length, message) => (value) => value.length <= length ? null : { maxLength: { requiredLength: length, message } };

document.addEventListener('DOMContentLoaded', () => {

    const nameControl = new FormControl({
        id: 'name',
        validators: [
            required('field name is required'),
            minLength(3, `required min Length: ${3}`),
            maxLength(5, `required max Length: ${5}`)
        ]
    });

    const emailControl = new FormControl({
        id: 'email',
        validators: [
            required('email is required')
        ]
    });

    const passwordControl = new FormControl({
        id: 'password',
        validators: [
            required('password is required'),
            minLength(6, `required min Length: ${6}`),
            maxLength(8, `required max Length: ${8}`)
        ]
    });

    const formGroup = new FormGroup({
        name:     nameControl,
        password: passwordControl
    });

    formGroup.setControl('email', emailControl);

    formGroup.getControl('name').updateValue('John');
    formGroup.getControl('email').updateValue('john@example.com');
    formGroup.getControl('password').updateValue('password123');

    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        // console.log(`Form Submitted! Timestamp: ${event.timeStamp}`);
        
        // console.log('formGroup value: ', formGroup.getControl('name').getValue());
        // console.log('nameControl isValid: ', nameControl.isValid());
        // console.log('formGroup getErrors: ', formGroup.getControlErrors('name'));
        // console.log('formGroup isValid: ', formGroup.getControl('name').isValid());
        // console.log('Form is valid:', formGroup.isValid());

        console.log('formGroup getErrors: ', formGroup.controlsErrors);

        console.log(' nameControl: ', nameControl.getValue());
        
        if (formGroup.isValid()) {
            Object.keys(formGroup.controlsValue).forEach(key => {
                const value = formGroup.controlsValue[key];
                console.log(key, value);
            });

        } else {
            Object.keys(formGroup.controlsErrors).forEach(key => {
                const errors = formGroup.controlsErrors[key];

                if (key === nameControl.id) {
                    console.log('Error en NAME');
                }

                Object.values(errors).forEach(({ message }) => {
                    console.error(`Error: field ${key} "${message}"`);
                });
            });
        }
    });

});
