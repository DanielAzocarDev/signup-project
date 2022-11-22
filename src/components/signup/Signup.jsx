import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

export const Signup = () => {
  return (
    <>
      <form>
        <FormControl pt='4' isRequired>
          <FormLabel>First Name</FormLabel>
          <Input placeholder='Joe Doe' />
        </FormControl>
        <FormControl pt='4' isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='joedoe@mail.com' />
        </FormControl>
        <FormControl pt='4' isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' />
        </FormControl>
        <FormControl pt='4' isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input type='password' />
        </FormControl>
      </form>
    </>
  )
}
