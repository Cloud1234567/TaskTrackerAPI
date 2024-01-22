const isAdminMiddleware = (req, res, next) => {
    const user = req.userDetails; 
  
    if (user && user.isAdmin) {
      
      next();
    } else {
      
      res.status(403).json({ error: 'Access forbidden. Admins only.' });
    }
  };
  
  module.exports = isAdminMiddleware