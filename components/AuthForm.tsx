'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { authFormSchema } from '@/lib/utils'
import CustomInput from './CustomInput'


import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {getLoggedInUser, signIn , signUp} from '@/lib/actions/user.actions'





const AuthForm = ({ type }: { type: string }) => {

    const router = useRouter();

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type);


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
    
        try {
            if (type === 'sign-up') {
                const newUser = await signUp(data)
                setUser(newUser)
            }

            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                    
                })

                if (response){router.push('/')}
            }

            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Ensure the loading state is reset.
        }
    };
    

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href={'/'} className=' cursor-pointer items-center gap-2 flex'>
                    <Image src={'/icons/logo.svg'} width={34} height={34} alt='logo' />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                        Horizon
                    </h1>
                </Link>
                <div className='flex flex-xol gap-1 md:gap-3'>
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user ? ' Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? 'Link your account to get started'
                                : 'Please enter your details'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div>
                    {/*  PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        {
                            type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="firstName" label="First Name" placeholder="ex: john" type='text' />
                                        <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="ex: Doe" type='text' />
                                    </div>
                                    <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your spesific address" type='text' />
                                    <CustomInput control={form.control} name="city" label="City" placeholder="Enter your City" type='text' />
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="state" label="State" placeholder="ex: NY" type='text' />
                                        <CustomInput control={form.control} name="postalCode" label="Postale Code" placeholder="ex: 10001" type='text' />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" type='text' />
                                        <CustomInput control={form.control} name="ssn" label="SSN" placeholder="ex: 1234" type='text' />
                                    </div>
                                </>

                            )
                        }
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your Email" type='text' />
                            <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" type='password' />

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className="form-btn" disabled={isLoading}>
                                    {isLoading ? (<>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                    </>) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>

                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 fonnt-normal trxt-gray-600'>
                            {
                                type === 'sign-in'
                                    ? "Don't have an account? "
                                    : "Already have an account? "
                            }
                            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className='form-link'>
                                {
                                    type === 'sign-in'
                                        ? "Sign Up"
                                        : "Sign In"}
                            </Link>
                        </p>
                    </footer>
                </>)}
        </section>
    )
}

export default AuthForm