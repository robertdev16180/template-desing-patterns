class FormControl {
    constructor ({ value = '', validators = [] }) {
        this.value = value;
        this.validators = validators;
        this.errors = {};
    }

    updateValue(value) {
        this.value = value;
        this.runValidators();
    }

    runValidators() {
        this.errors = {};

        for (const validator of this.validators) {
            const error = validator(this.value);

            if (error) {
                Object.assign(this.errors, error);
            }
        }
    }

    isValid() {
        return Object.keys(this.errors).length === 0; // Object.keys(this.errors).some(i => i)
    }
}

class FormGroup {
    constructor (controls) {
        this.controls = controls;
    }

    getControl(key) {
        return this.controls[key];
    }

    getControls() {
        return this.controls;
    }

    isValid() {
        return Object.values(this.controls).every((control) => control.isValid());
    }
}

// Ejemplo de uso

// Validadores
const required = (value) => (value.trim() ? null : { required: true });
const minLength = (length) => (value) => value.length >= length ? null : { minLength: { requiredLength: length } };

// Crear controles utilizando el patrón Builder
const nameControl = new FormControl("", [required]);
const emailControl = new FormControl("", [required]);
const passwordControl = new FormControl("", [required, minLength(6)]);

// Crear un FormGroup con los controles
const registrationForm = new FormGroup({
    name: nameControl,
    email: emailControl,
    password: passwordControl,
});

// Actualizar los valores de los controles y verificar su validez
nameControl.updateValue("John");
emailControl.updateValue("john@example.com");
passwordControl.updateValue("password123");

console.log("Form is valid:", registrationForm.isValid());
