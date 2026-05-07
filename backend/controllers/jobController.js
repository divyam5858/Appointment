import jobModel from "../models/jobModel.js";

// Add Job
const addJob = async (req, res) => {

  try {

    const jobData = req.body;

    const newJob = new jobModel(jobData);

    await newJob.save();

    res.json({
      success: true,
      message: "Job Added Successfully"
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};

// Get All Jobs
const listJobs = async (req, res) => {

  try {

    const jobs = await jobModel.find({});

    res.json({
      success: true,
      jobs
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};

export { addJob, listJobs };