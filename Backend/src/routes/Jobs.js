import express from "express"
import Job from "../models/Job.js"
import isLoggedIn from "../middlewares/IsLoggedIn.js"
import asynchandler from "../Utils/asynchandler.js"

const router = express.Router();
router.post("/addjob", isLoggedIn, asynchandler(async (req, res, next) => {
    
      const {
        companyName,
        logoUrl,
        jobPosition,
        jobType,
        mode,
        location,
        jobDescription,
        aboutCompany,
        skills,
        additionalInformation,
        salary,
      } = req.body;
  
      // Check if all required fields are provided
      if (!companyName || !logoUrl || !jobPosition || !jobType || !mode || !location || !jobDescription || !aboutCompany || !skills || !salary) {
        return res.status(400).json({ message: "All required fields must be filled." });
      }
  
      // Create and save new job
      const job = new Job({
        companyName,
        logoUrl,
        jobPosition,
        jobType,
        mode,
        location,
        jobDescription,
        aboutCompany,
        skills,
        additionalInformation,
        salary,
        createdAt: new Date(),
        createdBy: req.userExist.email,
      });
  
      await job.save();
      res.status(200).json({ status: 200, message: "Job details added successfully" });
    
  }))

  // Edit job route
router.put("/editJob/:id", isLoggedIn, asynchandler(async (req, res) => {
    
      const id = req.params.id;
      const {
        companyName,
        logoUrl,
        jobPosition,
        jobType,
        mode,
        location,
        jobDescription,
        aboutCompany,
        skills,
        salary,
        additionalInformation,
      } = req.body;
  
      // Update job details
      await Job.findByIdAndUpdate(id, {
        $set: {
          companyName,
          logoUrl,
          jobPosition,
          jobType,
          mode,
          location,
          jobDescription,
          aboutCompany,
          skills,
          salary,
          additionalInformation,
          createdAt: new Date(),
          createdBy: req.userExist.email,
        },
      });
  
      res.status(200).json({ status: 200, message: "Job details updated successfully" });
    
  }))

  // Get all jobs route (simplified for frontend filtering)
router.get("/getjobs", asynchandler(async (req, res) => {
    
      const jobs = await Job.find({}, {
        companyName: 1,
        logoUrl: 1,
        jobPosition: 1,
        jobType: 1,
        mode: 1,
        location: 1,
        skills: 1,
        salary: 1,
      });
  
      res.status(200).json({ jobs });
    
  }))

  // Get job details route
router.get("/jobdetails/:id", asynchandler(async (req, res) => {
    
      const jobDetails = await Job.findById(req.params.id);
      if (!jobDetails) {
        return res.status(404).json({ error: "Job details not found" });
      }
      res.status(200).json({ jobDetails });
   
  }))
  
  export default router;