import { animate, style, transition, trigger } from "@angular/animations";

export abstract class Animation {

    public static readonly fadeIn = (delay?: number) => trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(`300ms ${delay ? (delay+'ms ') : ''}ease-in`, style({ opacity: 1 }))
        ])
    ])
}