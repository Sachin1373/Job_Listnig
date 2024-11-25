import React from "react";
import { useForm } from "react-hook-form";
import styles from "../Styles/Addjobs.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/Addjobs_img.png";

const AddJob = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const redirect = useNavigate();

  const onSubmit = async (data) => {
     try {
      const response = await fetch('https://job-listnig.onrender.com/api/v1/jobs/addjob',{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       })
       if (response.ok) {
        const result = await response.json();
        toast.success('job added successful!');
        redirect('/')
        console.log(result);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Something went wrong.');
      }
     } catch (error) {
      toast.error('An error occurred while Adding job.');
        console.log("job data is not send",error.message)
     }
   
    
  };

  return (
    <div className={styles.addjob}>
      <div className={styles.addjobleft}>
        <h1>Add job description</h1>
        <form className={styles.jobform} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.jobinput}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name here"
              {...register("companyName", { required: "This field is required" })}
            />
            {errors.companyName && <span>{errors.companyName.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="addLogoURL">Logo URL</label>
            <input
              type="text"
              placeholder="Enter the link"
              {...register("logoUrl", { required: "This field is required" })}
            />
            {errors.logoUrl && <span>{errors.logoUrl.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              placeholder="Enter job position"
              {...register("jobPosition", { required: "This field is required" })}
            />
            {errors.jobPosition && <span>{errors.jobPosition.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="monthlySalary">Monthly Salary</label>
            <input
              type="number"
              placeholder="Enter Amount in rupees"
              {...register("salary", { required: "This field is required" })}
            />
            {errors.salary && <span>{errors.salary.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobType">Job Type</label>
            <select {...register("jobType", { required: "This field is required" })}>
              <option value="">Select</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
            {errors.jobType && <span>{errors.jobType.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="remoteOffice">Remote/Office</label>
            <select {...register("mode", { required: "This field is required" })}>
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
            {errors.mode && <span>{errors.mode.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobLocation">Job Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              {...register("location", { required: "This field is required" })}
            />
            {errors.location && <span>{errors.location.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              placeholder="Type the job description"
              {...register("jobDescription", { required: "This field is required" })}
            />
            {errors.jobDescription && <span>{errors.jobDescription.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="aboutCompany">About Company</label>
            <textarea
              placeholder="Type about your company"
              {...register("aboutCompany", { required: "This field is required" })}
            />
            {errors.aboutCompany && <span>{errors.aboutCompany.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="skillsRequired">Skills Required</label>
            <input
              type="text"
              placeholder="Enter the must-have skills"
              {...register("skills", { required: "This field is required" })}
            />
            {errors.skills && <span>{errors.skills.message}</span>}
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="information">Additional Information</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              {...register("additionalInformation", { required: "This field is required" })}
            />
            {errors.additionalInformation && <span>{errors.additionalInformation.message}</span>}
          </div>

          <div className={styles.jobbuttons}>
            <button
              className={styles.canceladdJob}
              type="button"
              onClick={() => {
                toast.error("Job add cancelled!");
                setTimeout(() => {
                  redirect("/");
                }, 2000);
              }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.addjobbutton}>
              + Add Job
            </button>
          </div>
        </form>
      </div>

      <div className={styles.addjobright}>
        {/* <h1>Recruiters add Job details here</h1> */}
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

export default AddJob;
