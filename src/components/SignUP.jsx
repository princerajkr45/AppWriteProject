import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { Button, Logo, Input } from './index'
import { useForm } from 'react-hook-form'
import { data } from 'autoprefixer'

function SignUP() {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const { register, handleSumbit } = useForm()

    const create = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)

            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center'>





            <form onSubmit={handleSumbit(create)}>
                <div className='space-y-5'>
                    <Input
                        label='Full Name:'
                        type='text'
                        placholder='Enter your full name'
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        label="email"
                        placeholder="Enter your email address"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label='password'
                        placholder='Enter your password '
                        type='password'
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                    >Create Account</Button>
                </div>
            </form>
        </div>
    )
}

export default SignUP