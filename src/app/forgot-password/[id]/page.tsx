import ForgotPassword from '@/components/Sections/forgot'

import React from 'react'

async function page({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params
    
  return (
   <ForgotPassword id={id}/>
  )
}

export default page