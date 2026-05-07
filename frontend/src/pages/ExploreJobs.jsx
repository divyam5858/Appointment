import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ExploreJobs = () => {

  const [jobs, setJobs] = useState([])
  const [selectedState, setSelectedState] = useState('All')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const fetchJobs = async () => {

    try {

      const { data } = await axios.get(
        backendUrl + '/api/jobs/list'
      )

      if (data.success) {
        setJobs(data.jobs)
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const states = [
    'All',
    ...new Set(jobs.map(job => job.state))
  ]

  const departments = [
    'All',
    ...new Set(jobs.map(job => job.department))
  ]

  const filteredJobs = jobs.filter(job =>
    (selectedState === 'All' || job.state === selectedState) &&
    (selectedDepartment === 'All' || job.department === selectedDepartment)
  )

  return (

    <div className='min-h-screen bg-gray-50 px-4 md:px-10 py-10'>

      <div className='text-center mb-10'>

        <h1 className='text-4xl font-bold text-gray-800'>
          Hospital Walk-In Openings
        </h1>

        <p className='text-gray-500 mt-3 text-lg'>
          Explore latest healthcare job opportunities across India
        </p>

      </div>

      <div className='bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row gap-4 mb-10'>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className='border rounded-lg px-4 py-3 outline-none'
        >

          {states.map((state, index) => (
            <option key={index}>{state}</option>
          ))}

        </select>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className='border rounded-lg px-4 py-3 outline-none'
        >

          {departments.map((dept, index) => (
            <option key={index}>{dept}</option>
          ))}

        </select>

      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

        {filteredJobs.map((job) => (

          <div
            key={job._id}
            className='bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300'
          >

            <div className='flex justify-between items-start mb-4'>

              <div>

                <h2 className='text-2xl font-bold text-primary'>
                  {job.role}
                </h2>

                <p className='text-lg font-medium text-gray-700'>
                  {job.hospital}
                </p>

              </div>

              <span className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                {job.department}
              </span>

            </div>

            <div className='space-y-2 text-gray-600 text-sm'>

              <p>
                <span className='font-semibold'>Location:</span>
                {' '} {job.city}, {job.state}
              </p>

              <p>
                <span className='font-semibold'>Interview Date:</span>
                {' '} {job.interviewDate}
              </p>

              <p>
                <span className='font-semibold'>Interview Time:</span>
                {' '} {job.interviewTime}
              </p>

              <p>
                <span className='font-semibold'>Mode:</span>
                {' '} {job.mode}
              </p>

              <p>
                <span className='font-semibold'>Salary:</span>
                {' '} {job.salary}
              </p>

            </div>

            <div className='mt-5 bg-gray-50 rounded-xl p-4 border'>

              <p className='font-semibold text-gray-800 mb-2'>
                Requirements
              </p>

              <p className='text-sm text-gray-600 leading-relaxed'>
                {job.requirements}
              </p>

            </div>

            <button className='mt-5 w-full bg-primary text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 font-medium'>
              Walk-In Interview
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ExploreJobs