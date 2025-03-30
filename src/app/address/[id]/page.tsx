
import React from 'react'
import AddressPage from '@/components/Sections/updateAddress'

async function page({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params
    
  return (
   <AddressPage id={id} />
  )
}

export default page