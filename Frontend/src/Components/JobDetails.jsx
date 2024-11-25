import React, { useState,useEffect } from 'react'
import styles from '../Styles/JobDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import moment from "moment"
import { FaMoneyBill } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

function JobDetails() {
  const {jobId} = useParams();
  const [ViewDetails, setViewDetails]=useState([])
  const [isloggedin,setisloggedin] = useState(false)

  const redirect = useNavigate();

  const tokenTime = JSON.parse(localStorage.getItem("recuirterDetail"));
    console.log(tokenTime)
  
    useEffect(() => {
      const currentTime = new Date().getTime();
      const logg =
        tokenTime !== null
          ? tokenTime.expiry > currentTime
            ? true
            : false
          : false;
          setisloggedin(logg);
    }, [tokenTime]);

  const handleedit = () =>{
    redirect('/editjob',{ state: { jobId, jobDetails: ViewDetails } })
  }
  
  const GetDetails = async() =>{
      try {
        const response = await fetch(`http://localhost:8000/api/v1/jobs/jobdetails/${jobId}`)
        const data = await response.json();
        setViewDetails(data.jobDetails)
      } catch (error) {
        console.log("Error while getting the JobDetails",error.message)
      }
  }

   useEffect(() => {
    GetDetails();
   }, [jobId])
   
  return (
    <>
    <Navbar/>
      <div className={styles.details_wrapper}>
          <div className={styles.job_heading}>
             <span>
                {ViewDetails.jobPosition}
             </span>
             <span>{ViewDetails.mode}</span>
             <span>{ViewDetails.jobType}</span>
             <span>{` at ${ViewDetails.companyName}`}</span>
          </div>
          <div className={styles.details}>
          {isloggedin && (<button className={styles.editjob} onClick={handleedit}>Edit Job</button>)}
              <div className={styles.Jobposted}>
                 <span>
                    {moment( new Date(ViewDetails.createdAt)).fromNow()} .
                 </span>
                 <span>{ViewDetails.jobType}</span>
                 <span><img src={ViewDetails.logoUrl} alt="Logo" /></span>
                 <span>{ViewDetails.companyName}</span>
              </div>
              <div className={styles.jobposition}>
                   <span className={styles.postion}>{ViewDetails.jobPosition}</span>
                   <span className={styles.location}>{ViewDetails.location}</span>
             
              </div>
              <div className={styles.salary_duration}>
                  <div className={styles.stipend}>
                      <div className={styles.sti}>
                        <FaMoneyBill/>
                        <span>Stipend</span>
                      </div>
                      <div>
                        <span className={styles.salary}>{`${ViewDetails.salary}/month`}</span>
                      </div>
                  </div>
                  <div className={styles.duration}>
                        <div className={styles.dur}>
                          <FaCalendar/>
                          <span>Duration</span>
                        </div>
                        <div>
                            <span className={styles.time}>{ViewDetails.jobType}</span>
                        </div>
                  </div>
              </div>
              <div className={styles.About_Company}>
                  <span>About Company</span>
                  <p>{ViewDetails.aboutCompany}</p>
              </div>
              <div className={styles.About_Job}>
                  <span>About the job/internship</span>
                  <p>{ViewDetails.jobDescription}</p>
              </div>
              <div className={styles.About_Skills}>
                  <span>Skill(s) Required</span>
                   <p>
                   {ViewDetails.skills?.map((item,idx)=>{
                    return <span className={styles.skills}>{item}</span>
                  })}
                   </p>
              </div>
              <div className={styles.About_addinfo}>
                  <span>Additional Information
                  </span>
                  <p>{ViewDetails.additionalInformation}</p>
              </div>
           
          </div>
         
      </div>
    </>
  )
}

export default JobDetails