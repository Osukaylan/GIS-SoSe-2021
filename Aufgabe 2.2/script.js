"use strict";
/*1a
min([13, 15, 12, -23, -67]);*/
function min(nummernArray) {
    let sorted = Math.min.apply(null, nummernArray);
    console.log(sorted);
}
/*1b
let thing1: Boolean = isEven(75);
let thing2: Boolean = isEven(50);
let thing3: Boolean = isEven(-75);
let thing4: Boolean = isEven(-50);

console.log(thing1.toString());
console.log(thing2.toString());
console.log(thing3.toString());
console.log(thing4.toString());*/
function isEven(inputVar) {
    var boolVal = true;
    var inte = 0;
    for (let _i = Math.abs(inputVar); _i >= 0; _i = _i - 2) { //Math.abs () - Funktion gibt den absoluten Wert einer Zahl. Das heißt, es gibt x zurück, wenn x positiv oder Null ist, und die Negation von x, wenn x negativ ist.
        inte = _i;
        console.log(inte);
    }
    if (inte == 0) {
        boolVal = true;
    }
    if (inte == 1) {
        boolVal = false;
    }
    return boolVal;
}
var student = {
    firstName: "Hans",
    lastName: "Mueller",
    age: 19
};
/*console.log("Student Objekt ")
console.log(Student.firstName)
console.log(Student.lastName)
console.log(Student.age)*/
var student2 = {
    firstName: "Monika",
    lastName: "Streb",
    age: 18
};
/*console.log("2 Student Objekt ")
console.log(Student2.firstName)
console.log(Student2.lastName)
console.log(Student2.age)*/
var student3 = {
    firstName: "Andre",
    lastName: "Stark",
    age: 20
};
/*console.log("3 Student Objekt ")
console.log(Student3.firstName)
console.log(Student3.lastName)
console.log(Student3.age)*/
var studentList = [student, student2, student3];
studentList = [student, student2, student3, { firstName: "Mark", lastName: "Gurkmeister", age: 99 }];
console.log(studentList);
//2.2a
function backwards(input) {
    var fill = new Array;
    for (var _i = input.length - 1; _i >= 0; _i--) {
        fill.push(input[_i]);
    }
    return fill;
}
var a = [31, 56, 3, 5];
var b = backwards(a);
console.log(b);
//2.2b
function join(first, second) {
    const result = [...first, ...second];
    return (result);
}
function split(arr, start, end) {
    var result = new Array;
    if (arr.length > end || start > arr.length) {
        console.log("beep boop");
        return;
    }
    if (start < 0) {
        console.log("error");
        return;
    }
    if (start > end) {
        console.log("dont tempt me");
        return;
    }
    if (start == 0 && end == arr.length) {
        console.log(arr);
        return;
    }
    for (var i = start; i <= end; i++) {
        result.push(arr[i]);
    }
    console.log("Split array: " + result);
}
let arr = [5, 42, 17, 2018, -10, 60, -10010];
let arrBack = backwards(arr);
console.log(arr);
console.log(arrBack);
console.log(join(arr, [15, 9001, -440]));
split(arr, 1, 2);
console.log(split(arr, -1, 2));
//Aufgabe3
//# sourceMappingURL=script.js.map