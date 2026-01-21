export const authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!requiredRole) return next(); 

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };
};
