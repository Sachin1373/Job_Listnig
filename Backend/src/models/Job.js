import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
  },
},{ timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;