import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    try {
      const res = await fetch(url)
      const jobs = await res.json()
      setJobs(jobs)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <main>
        <h1>Loading</h1>
      </main>
    )
  }

  const { title, dates, duties, company } = jobs[value]

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map(({ company, id }, index) => {
            return (
              <button
                className={index === value ? 'job-btn active-btn' : 'job-btn'}
                key={id}
                onClick={() => {
                  setValue(index)
                }}
              >
                {company}
              </button>
            )
          })}
        </div>

        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
      <button className="btn">more info</button>
    </section>
  )
}

export default App
