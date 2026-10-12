const person = {name: 'John', age: 25}

function destruct (opj)
{
    let {name , age } = opj;

    return name + " is " + age+" years old ";
}

console.log(destruct(person));
