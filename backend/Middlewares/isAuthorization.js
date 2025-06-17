
exports.authorizeRoles = (...allowedroles) => {
  
    return (req, res, next) => {
      console.log("Authorizing roles:", allowedroles);
      console.log("req.user.role:", req.user.role);
      if (!allowedroles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Role '${req.user.role}' is not allowed to access this resource`,
        });
      }
      next();
    };
  };
  