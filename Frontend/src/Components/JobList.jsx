import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';


const JobList = ({Search}) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(()=>{
    
   if(Search){
    const UpdatedJobs = jobs.filter((job)=> job.jobPosition.toLowerCase().includes(Search.toLowerCase()))
   setFilteredJobs(UpdatedJobs)
   }
   else{
    setFilteredJobs(jobs)
   }
  },[Search])

  useEffect(() => {
    // Fetch jobs data from backend
    fetch('https://job-listnig.onrender.com/api/v1/jobs/getjobs')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs)
        setFilteredJobs(data.jobs);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);



  return (
    <div className="job-list">
      {filteredJobs.map((job) => (
        <JobCard key={job._id} job={job} />
        
      ))}
    </div>
  );
};

export default JobList;
