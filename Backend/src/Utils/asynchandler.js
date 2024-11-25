const asynchandler = (fn) => async(req,res,next) => {
  try {
      await fn(req,res);
  } catch (error) {
    next(error)
  }
}

export default asynchandler;


//Promise Syntax
// const asyncHandler = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };