let success = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Success");
    }, 3000);
  });
};

success().then((result) => {
  console.log(result);
});
