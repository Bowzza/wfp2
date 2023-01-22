import { Subject } from 'rxjs';
    
    
let filterEbayValue = new Subject();
let filterShpockValue = new Subject();

function emitEbay(value) {
    filterEbayValue.next(value);
}

function emitShpock(value) {
    filterShpockValue.next(value);
}

function getEbayListener() {
    return filterEbayValue.asObservable();
}

function getShpockListener() {
    return filterShpockValue.asObservable();
}

export const filterService = {
    getEbayListener,
    getShpockListener,
    emitEbay,
    emitShpock
};