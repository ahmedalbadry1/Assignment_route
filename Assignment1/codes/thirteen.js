function max (arr)
{
    let max = arr[0];
    for(let i of arr)
    {
        if (max < i){
            
            max=i;

        }
    }
    return max;
}

console.log(max([1,5,87,4,6,546,2]))