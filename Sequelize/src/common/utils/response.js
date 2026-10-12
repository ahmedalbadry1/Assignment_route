export let successResponse = ({
  data,
  status = 200,
  res,
  message
}) => {
  res.status(status).json({
    message,
    data
  });
};