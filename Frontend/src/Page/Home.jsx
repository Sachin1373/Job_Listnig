import React,{ useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import styles from "../Styles/Home.module.css";
import Navbar from '../Components/Navbar'
import JobList from '../Components/JobList';
function Home() {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [loggedin, setloggedin] = useState(false);
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
      setloggedin(logg);
    }, [tokenTime]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
      };
    
      const handleSelectChange = (e) => {
        const skill = e.target.value;
        if (skill && !selectedSkills.includes(skill)) {
          const updatedSkills = [...selectedSkills, skill];
          setSelectedSkills(updatedSkills);
        }
      };
    
      const handleRemoveSkill = (skill) => {
        const updatedSkills = selectedSkills.filter((item) => item !== skill);
        setSelectedSkills(updatedSkills);
      };
    
      const clearSkills = () => {
        setSelectedSkills([]);
      };
    
      const addJobButton = () => {
        redirect("/addjobs");
      };
      const handlelogout = () =>{
        setloggedin(false)
      }
  return (
    <>
   <Navbar onLogut={handlelogout}/>
    <div className={styles.jobsearch}>
      <form className={styles.searchform}>
        <div className={styles.searchbar}>
        <CiSearch className={styles.CiSearch}/>
          <input
            type="text"
            placeholder="Type any job title"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </form>
      <div className={styles.jobsearchFooter}>
        <div className={styles.selectskills}>
          <select value={selectedSkills} onChange={handleSelectChange}>
            <option value="" hidden>
              Skills
            </option>
            <option value="React">React</option>
            <option value="Javascript">Javascript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="mongodb">Mongo DB</option>
            <option value="Express JS">Express JS</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Figma">Figma</option>
          </select>
          <div className={styles.selectedskills}>
            {selectedSkills.map((skill) => (
              <div className={styles.selectedskill} key={skill}>
                {skill}
                <button
                  className={styles.removeskill}
                  onClick={() => handleRemoveSkill(skill)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <button className={styles.clearskills} onClick={clearSkills}>
              Clear
            </button>
          )}
        </div>
        {loggedin && (
          <button className={styles.addjobbtn} onClick={addJobButton}>
            + Add Job
          </button>
        )}
      </div>
    </div>
    <div className={styles.joblist}>
        <JobList Search={searchValue}/>
      </div>
    </>
  )
}

export default Home