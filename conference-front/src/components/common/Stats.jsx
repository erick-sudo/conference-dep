import React from 'react'

function Stats() {
  return (
    <div className='relative p-8'>
        <div className='flex flex-col md:flex-row p-8 justify-between space-y-8 md:space-y-0'>

        <div className='flex space-x-2 mx-auto'>
            <h2 className='text-4xl lg:text-6xl xl:text-8xl text-lime-400 font-bold'>15</h2>
            <div className=' md:py-4'>
            <p className='text-base md:text-xl font-medium'>Government</p>
            <p className='text-base md:text-xl font-medium'>Ministries</p>
            </div>
        </div>

        <div className='flex space-x-2 mx-auto'>
            <h2 className='text-lime-400 text-4xl lg:text-6xl xl:text-8xl font-bold'>3</h2>
            <div className='md:py-4'>
            <p className='text-base md:text-xl font-medium'>Forum</p>
            <p className='text-base md:text-xl font-medium'>Days</p>
            </div>
        </div>

       <div className='flex space-x-2 mx-auto'>
            <h2 className='text-lime-400 text-4xl lg:text-6xl xl:text-8xl font-bold'>80</h2>
            <div className='md:py-4'>
            <p className='text-base md:text-xl font-medium'>Unique</p>
            <p className='text-base md:text-xl font-medium'>Workshops</p>
            </div>
        </div>

        <div className='flex space-x-2 mx-auto'>
            <h2 className='text-lime-400 text-4xl lg:text-6xl xl:text-8xl font-bold'>47</h2>
            <div className='md:py-4'>
            <p className='text-base md:text-xl font-medium'>Kenyan</p>
            <p className='text-base md:text-xl font-medium'>Counties</p>
            </div>
        </div>



        </div>

    </div>
  )
}

export default Stats