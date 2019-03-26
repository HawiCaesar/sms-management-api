const phoneValidaton = (request, response, next) => {
  if (request.body.phone.length === 12) {
    if (isNaN(parseInt(request.body.phone))) {
      return response
        .status(400)
        .send({ message: "Only digits are required for phone" });
    } else {
      next();
    }
  } else {
    return response
      .status(400)
      .send({ message: "Phone number should be 12 digit long" });
  }
};
export default phoneValidaton;
