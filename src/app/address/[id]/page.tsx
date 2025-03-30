import { useParams } from 'next/navigation'
import React from 'react'

async function Page() {

  const { id} = useParams();

  if(!id){
    return <div>Invalid ID</div>
  }

  if( typeof id !== 'string'){
    return <div>Invalid ID</div>
  }
  return (

  )
}

export default Page