// NOTE: Abhi Mongo skip mode me bhi kaam karega
// Later real models plug-in honge (SkillGo rule followed)

exports.getCompanyProfile = async (req, res) => {
  try {
    const user = req.user; // JWT se aa raha hai

    res.status(200).json({
      success: true,
      message: "Company profile fetched successfully",
      data: {
        companyId: user.id,
        companyName: user.name || "SkillGo Company",
        role: user.role,
        email: user.email,
        status: "ACTIVE",
        verified: true
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch company profile"
    });
  }
};

exports.getCompanyDashboardSummary = async (req, res) => {
  try {
    // Abhi counters static logic
    // Mongo aate hi yahin se real counts niklenge

    res.status(200).json({
      success: true,
      message: "Company dashboard summary",
      data: {
        totalJobs: 0,
        activeManpower: 0,
        linkedAgents: 0,
        pendingApprovals: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard summary"
    });
  }
};