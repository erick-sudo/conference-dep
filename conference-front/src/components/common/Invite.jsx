import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Invite() {
  return (
    <div className="relative pt-2 ">

      {/* <div className='flex flex-wrap'>
        <h2 className='pl-24 text-4xl md:text-5xl lg:text-8xl xl:text-9xl font-bold'>CONFERENCES</h2>
      </div> */}
      <div className='items-center sm:py-4 md:p-16 flex flex-col md:flex-row md:space-x-12'>
      {/* py-4 px-12 md:p-12 md:px-12 flex flex-col md:flex-row md:space-x-12 */}

      <div className='relative w-1/3 h-1/3 md:h-2/3 md:w-1/6'>
        <div className='py-8 bg-lime-400'>
          <div className='px-4 space-x-8 flex'>
            <p className='hidden md:block text-base'>CONFERENCES </p>
            <a
                  href="/reports"  
                >
                  <span className='text-xl'><FontAwesomeIcon icon={faArrowRight} /></span>
                </a>
            
            
          </div>
          <div className='mt-8 px-2 md:px-4'> 
            <h2 className='md:text-3xl font-bold'>Explore Dashboard Insights </h2>
            
          </div>
        </div>

      </div>

      <div className=' w-4/6 py-16'>
        <p className='md:text-2xl'>We’re Thrilled to Welcome You to the Ministry Conference Tracking Website
        </p>
      </div>
      
      </div>
      <hr className='mx-auto ml-32 w-2/3 md:w-3/4 border-2 border-black' />
    </div>
  )
}

export default Invite
