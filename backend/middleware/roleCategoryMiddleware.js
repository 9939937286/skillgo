// middleware/roleCategoryMiddleware.js

module.exports = function allowRolesAndCategories(allowedRoles = [], allowedCategories = []) {
  return (req, res, next) => {
    const { role, category } = req.user; // JWT se aata hai

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Role not allowed for this action"
      });
    }

    if (allowedCategories.length > 0 && !allowedCategories.includes(category)) {
      return res.status(403).json({
        success: false,
        message: "Category not allowed for this action"
      });
    }

    next();
  };
};