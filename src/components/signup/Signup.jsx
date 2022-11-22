import { useState } from 'react'
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config'
import { signInWithGoogle } from '../../firebase/provider'

export const Signup = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password === formData.confirmPassword && formData.password.length > 5) {
      setIsError(false)
      setIsLoading(true)
      createUserWithEmailAndPassword(FirebaseAuth, formData.email, formData.password).then((userCredential) => {
        setIsLoading(false)
        const user = userCredential.user;
        setIsModalOpen(true)
        setModalMessage('Signup successfully!')
        console.log(user, 'success')
      })
        .catch((error) => {
          setIsLoading(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsModalOpen(true)
          setModalMessage('Something when wrong, try again!')
          console.log(errorCode, errorMessage, 'error')
        });
    } else {
      setErrorMessage('Passwords not valid')
      setIsError(true)
    }
  }

  const loginGoogle = () => {
    signInWithGoogle().then(() => {

      setIsModalOpen(true)
      setModalMessage('Login successfully!')
    }).catch(() => {
      setIsModalOpen(true)
      setModalMessage('Something when wrong, try again!')
    })
  }

  return (
    <>
      <Stack>
        <form onSubmit={handleSubmit}>
          <FormControl pt='4' isRequired>
            <FormLabel>First Name</FormLabel>
            <Input name='firstName' placeholder='Joe' onChange={handleChange} />
          </FormControl>
          <FormControl pt='4'>
            <FormLabel>Last Name</FormLabel>
            <Input name='lastName' placeholder='Doe' onChange={handleChange} />
          </FormControl>
          <FormControl pt='4' isRequired>
            <FormLabel>Email</FormLabel>
            <Input name='email' type='email' placeholder='joedoe@mail.com' onChange={handleChange} />
          </FormControl>
          <FormControl pt='4' isRequired>
            <FormLabel>Password</FormLabel>
            <Input name='password' type='password' onChange={handleChange} />
          </FormControl>
          <FormControl pt='4' isRequired isInvalid={isError}>
            <FormLabel>Confirm Password</FormLabel>
            <Input name='confirmPassword' type='password' onChange={handleChange} />
            {isError ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
          </FormControl>

          <Button isLoading={isLoading} type='submit' mt='5' w='100%' colorScheme='teal'>
            Sign up
          </Button>
        </form>
        <Divider pt='3' />

        <Button w='100%' colorScheme='blackAlpha' onClick={loginGoogle}>
          Sign up with Google
        </Button>
      </Stack>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='lg'>{modalMessage}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
