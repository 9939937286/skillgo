exports.createUser = (req, res) => {
  console.log("REQ.BODY =>", req.body);

  res.json({
    bodyReceived: req.body
  });
};