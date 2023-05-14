export class FormGroup {

    constructor (controls) {
        this.controls = controls;
    }

    getControl(key = '') {
        return this.controls[key];
    }

    getControls() {
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
