import React from "react";
import { useForm } from "react-hook-form";
import styles from "../Styles/Addjobs.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/Addjobs_img.png";

const Editjob = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const redirect = useNavigate();
  const location = useLocation();
  const { jobId, jobDetails } = location.state || {};
  

  const authtoken =  JSON.parse(localStorage.getItem("recuirterDetail"))
  const token = authtoken?.token;

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://job-listnig.onrender.com/api/v1/jobs/editJob/${jobId}`, { // Update endpoint to the correct one for editing
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        toast.success('Job updated successfully!');
        setTimeout(()=>{
            redirect('/');
        },2000)
        console.log(result);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the job.');
      console.log("Job data is not sent", error.message);
    }
  };

  return (
    <div className={styles.addjob}>
      <div className={styles.addjobleft}>
        <h1>Edit Job Description</h1>
        <form className={styles.jobform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.jobinput}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name here"
              defaultValue={jobDetails?.companyName}
              {...register("companyName", { required: "This field is required" })}
            />
            {errors.companyName && <span>{errors.companyName.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="logoUrl">Logo URL</label>
            <input
              type="text"
              placeholder="Enter the link"
              defaultValue={jobDetails?.logoUrl}
              {...register("logoUrl", { required: "This field is required" })}
            />
            {errors.logoUrl && <span>{errors.logoUrl.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              placeholder="Enter job position"
              defaultValue={jobDetails?.jobPosition}
              {...register("jobPosition", { required: "This field is required" })}
            />
            {errors.jobPosition && <span>{errors.jobPosition.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="salary">Monthly Salary</label>
            <input
              type="number"
              placeholder="Enter Amount in rupees"
              defaultValue={jobDetails?.salary}
              {...register("salary", { required: "This field is required" })}
            />
            {errors.salary && <span>{errors.salary.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobType">Job Type</label>
            <select
              defaultValue={jobDetails?.jobType || ""}
              {...register("jobType", { required: "This field is required" })}
            >
              <option value="">Select</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            {errors.jobType && <span>{errors.jobType.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="mode">Remote/Office</label>
            <select
              defaultValue={jobDetails?.mode || ""}
              {...register("mode", { required: "This field is required" })}
            >
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
            {errors.mode && <span>{errors.mode.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="location">Job Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              defaultValue={jobDetails?.location}
              {...register("location", { required: "This field is required" })}
            />
            {errors.location && <span>{errors.location.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              placeholder="Type the job description"
              defaultValue={jobDetails?.jobDescription}
              {...register("jobDescription", { required: "This field is required" })}
            />
            {errors.jobDescription && <span>{errors.jobDescription.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="aboutCompany">About Company</label>
            <textarea
              placeholder="Type about your company"
              defaultValue={jobDetails?.aboutCompany}
              {...register("aboutCompany", { required: "This field is required" })}
            />
            {errors.aboutCompany && <span>{errors.aboutCompany.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="skills">Skills Required</label>
            <input
              type="text"
              placeholder="Enter the must-have skills"
              defaultValue={jobDetails?.skills?.join(", ")}
              {...register("skills", { required: "This field is required" })}
            />
            {errors.skills && <span>{errors.skills.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="additionalInformation">Additional Information</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              defaultValue={jobDetails?.additionalInformation}
              {...register("additionalInformation", { required: "This field is required" })}
            />
            {errors.additionalInformation && <span>{errors.additionalInformation.message}</span>}
          </div>

          <div className={styles.jobbuttons}>
            <button
              className={styles.canceladdJob}
              type="button"
              onClick={() => {
                toast.error("Job edit cancelled!");
               
                  redirect("/");
               
              }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.addjobbutton}>
              Update Job
            </button>
          </div>
        </form>
      </div>

      <div className={styles.addjobright}>
        <div className={styles.img}>
          <img src={img} alt="photo" />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Editjob;
