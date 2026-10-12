function check (num)
{
    if (num % 3 == 0 && num % 5 ==0)
    {
      return "Divisible by both" 

    }
    else if (num % 3 == 0 || num % 5 ==0)
{
    return "Divisible by one of them "
    
}
else return  "not devisable"


}

console.log(check(5));
console.log(check(15));
console.log(check(4));