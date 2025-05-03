import { FormArray, FormGroup } from "@angular/forms"

export abstract class FormUtil {

    public static markForm(form: FormGroup | FormArray) {
        const controls = form.controls
        if (controls) {
            Object.values(controls).forEach(control => {
                if (control instanceof FormGroup) {
                    this.markForm(control)
                }
                else if (control instanceof FormArray) {
                    Object.values(control.controls).forEach(c => {
                        this.markForm(c as FormGroup)
                    })
                } 
                else {
                    control.markAsDirty()
                    control.markAsTouched()
                }
            })
        }
    }
}