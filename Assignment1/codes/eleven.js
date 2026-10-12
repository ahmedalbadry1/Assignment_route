function add (...numbers)
{
    let sum =0
    for (let num of numbers) {
        sum += num;
    }
    return sum;
}

console.log(add(1,2,3,4,5,6,7));