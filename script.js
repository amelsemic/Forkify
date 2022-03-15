'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const Person = function (fn, ln){
    this.fn = fn;
};

const jonas = new Person('as','cs')
console.log(jonas.fn)