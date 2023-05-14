import { FormControl } from './form-control.js';
import { FormGroup } from './form-group.js';
import { required, minLength, maxLength, onlyNumber } from './validators.js';

document.addEventListener('DOMContentLoaded', () => {

    const nameControl = new FormControl({
        id: 'name',
        validators: [
            required('field name is required'),
            minLength(3, `required min Length: ${3}`),
            maxLength(5, `required max Length: ${5}`)
        ]
    });
    
    const onlyLetter = (message) => (value) => /^[A-Za-z]+$/.test(value?.trim()) ? null : { onlyLetter: { message } };

    nameControl.setValidator(onlyLetter('onlyLetter!!!!'));

    const ageControl = new FormControl({
        id: 'age',
        validators: [
            required('field age is required'),
            onlyNumber('only number')
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
        // password: passwordControl
    });

    // formGroup.setControl('email', emailControl);
    // formGroup.setControl('age', ageControl);

    // formGroup.getControl('name').updateValue('John');
    // formGroup.getControl('email').updateValue('john@example.com');
    // formGroup.getControl('password').updateValue('password123');

    document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        // console.log(`Form Submitted! Timestamp: ${event.timeStamp}`);
        
        // console.log('formGroup value: ', formGroup.getControl('name').getValue());
        // console.log('nameControl isValid: ', nameControl.isValid());
        // console.log('formGroup getErrors: ', formGroup.getControlErrors('name'));
        // console.log('formGroup isValid: ', formGroup.getControl('name').isValid());
        // console.log('Form is valid:', formGroup.isValid());

        // console.log('formGroup getErrors: ', formGroup.controlsErrors);

        // console.log(' nameControl: ', nameControl.getValue());

        console.log('isValid: ', nameControl.isValid());

        // if (formGroup.isValid()) {
        //     Object.keys(formGroup.controlsValue).forEach(key => {
        //         const value = formGroup.controlsValue[key];
        //         console.log(key, value);
        //     });
        // } else {
        //     Object.keys(formGroup.controlsErrors).forEach(key => {
        //         const errors = formGroup.controlsErrors[key];

        //         Object.values(errors).forEach(({ message }) => {
        //             // console.error(`Error: field ${key} "${message}"`);
        //             console.log(`Object.values ~ message:`, message)
        //         });
        //     });
        // }
    });

});
