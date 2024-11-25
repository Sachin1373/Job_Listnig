import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "../Styles/JobCard.module.css";

function JobCard({ job }) {
  const [jobid,setjobid]=useState("");
  const redirect = useNavigate()
  const handleViewDetailsClick = (id) =>{
      setjobid(id)
      redirect(`/JobDetails/${id}`)
  }
  return (
    <>
    <div className={styles.jobCard}>
       <div className={styles.logo}>
        <img src={job.logoUrl} alt={`logo`} className={styles.companyLogo} />
       </div>
        <div className={styles.details}>
          <h2 className={styles.jobTitle}>{job.jobPosition}</h2>
          <span className={styles.salary}>₹ {job.salary}</span>
            <div className={styles.mode}>
              <span className={styles.mode}>{job.mode}</span>
              <span className={styles.jobType}>{job.jobType}</span>
            </div>
        </div>
        <div className={styles.location}>
          <span className={styles.location}>{job.location}</span>
        </div>
        <div className={styles.skills}>
            <div className={styles.skill}>
                {job.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>{skill}</span>
                ))}
            </div>
                
        </div>
        <div className={styles.btn}>
          <button className={styles.viewDetailsBtn} onClick={() => handleViewDetailsClick(job._id)}>View Details</button>
        </div>
    </div>
    
    
    </>
  );
}

export default JobCard;
