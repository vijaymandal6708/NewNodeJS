const getUserDashboard = async (req,res)=>{
   res.status(200).json({
    message: "User dashboard data",
    user: {
      id: req.user.id,
      role: req.user.role
    }
  });
};


module.exports = {
    getUserDashboard,
};