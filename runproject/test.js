/* Simple Hello World in Node.js */
const obj = {
    name:'nishant',
    age:21
}
const {name} = obj;
console.log(name);
console.log("Hello World");

var fetchdata =() => {

    const promise = new Promise((resolve,reject) =>{
setTimeout(()=>{
    resolve('done');
},1000);
    });
    return promise;

};

fetchdata().then(text=> {
    console.log(text);
}

);

var fetchd = () => {
    var promise1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve('done');}

            
        );
    });
    return promise1;
}
fetchd().then(text=>{
    console.log(text);
}) ;

const hobbies = ['play','games'];
const hobbyarr = [...hobbies];
console.log('rest operator'+hobbyarr);