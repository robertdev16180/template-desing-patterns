import { Observer } from "./observer.interface";

export abstract class Subject {

    private observers: Observer[] = [];

    public attach(observer: Observer): void {

        if (this.observers.some(x => x === observer)) {
            throw new Error('Observer has already been registered.');
        } else {
            this.observers.push(observer);
        }
    }

    public detach(observer: Observer): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    protected notify(message: any): void {
        this.observers.forEach(x => x.update(message));
    }
};