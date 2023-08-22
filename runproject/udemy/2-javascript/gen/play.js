//1 start
var name = 'Max';
var age = 29;
var hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobby) {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
}

console.log(summarizeUser(name, age, hasHobbies));
//1 end

//2nd start

const name1 = 'Max';
let age1 = 29;
const hasHobbies1 = true;

age1 = 30;

function summarizeUser1(userName, userAge, userHasHobby) {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
}

console.log(summarizeUser1(name1, age1, hasHobbies1));


//2 end
//3 start
const name2 = 'Max';
let age2 = 29;
const hasHobbies2 = true;

age = 30;

const summarizeUser2 = (userName, userAge, userHasHobby) => {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
};

// const add = (a, b) => a + b;
// const addOne = a => a + 1;
const addRandom = () => 1 + 2;

// console.log(add(1, 2));
// console.log(addOne(1));
console.log(addRandom());

console.log(summarizeUser2(name2, age2, hasHobbies2));


//3 end


//4 start
const person = {
  name: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};
// 4 end

//5 start
const person3 = {
  name: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};

const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }
console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
console.log(hobbies);

// 5 end


//6 start
const person1 = {
  name: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};

const hobbies1 = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);
hobbies1.push('Programming');
console.log(hobbies1);

// 6 end


//7 start
const person2 = {
  name: 'Max',
  age: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};

const copiedPerson = { ...person2 };
console.log('spread+res'+copiedPerson);

const hobbies2 = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);
const copiedArray = [...hobbies2];
console.log(copiedArray);

const toArray = (...args) => {
  return args;
};

console.log(toArray(1, 2, 3, 4));

// 7 end


//8start
const person4 = {
  name4: 'Max',
  age4: 29,
  greet() {
    console.log('Hi, I am ' + this.name);
  }
};

const printName = ({ name4 }) => {
  console.log(name4);
};

printName(person4);

const { name4, age4 } = person4;
//const { greet } = person4;
console.log(name4, age4);

// const copiedPerson = { ...person };
// console.log(copiedPerson);

const hobbies4 = ['Sports', 'Cooking'];
const [hobby1, hobby2] = hobbies4;
console.log(hobby1, hobby2);

// // for (let hobby of hobbies) {
// //     console.log(hobby);
// // }
// // console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// // console.log(hobbies);
// const copiedArray = [...hobbies];
// console.log(copiedArray);

// const toArray = (...args) => {
//   return args;
// };

// console.log(toArray(1, 2, 3, 4));

// 8 end

//9start





person4.greet();


const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
      console.log(text);
      return fetchData();
    })
    .then(text2 => {
      console.log(text2);
    });
}, 2000);

console.log('Hello!');
console.log('Hi!');
// 9 end