import React from 'react'
import AuthLayout from '../components/authLayout'
import Link from 'next/link'
import Button from '../components/button'

function Error() {
  return (
    <AuthLayout>
      <p>{"um...you aren't not logged in"}</p>
      <Link href='/login' passHref>
        <Button 
          inverse='false' 
          variant='secondary'
          whileHover={{ scale: 1.1 }}
        >go back</Button>
      </Link>
    </AuthLayout>
  )
}

export default Error