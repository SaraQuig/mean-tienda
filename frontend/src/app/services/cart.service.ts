// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private totalCarritoSubject = new BehaviorSubject<number>(0);
    totalCarrito$ = this.totalCarritoSubject.asObservable();

    updateTotal(newTotal: number) {
        this.totalCarritoSubject.next(newTotal);
    }
}
