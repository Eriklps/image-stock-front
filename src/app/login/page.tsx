'use client'

import { Template, RenderIf, useNotification } from "@/components"
import { useState } from 'react'
import { LoginForm, formScheme, validationScheme } from "./formScheme";
import { Formik, useFormik } from "formik";
import { useAuth } from "@/resources";
import { useRouter } from 'next/navigation'
import { AccessToken, Credentials, User } from '@/resources/user/users.resources'

export default function Login(){

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm){
        if(!newUserState){
            const credentials: Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                router.push("/gallery")
            } catch(error: any){
                const message = error?.message;
                notification.notify(message, "error")
            }
        }
    }

    return (
        <Template loading={loading}>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900'>
                        { newUserState ? 'Create a new user' : 'Login in your account' }
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>Name: </label>
                            </div>
                            <div className="mt-2">
                                <input className='border px-5 py-2 rounded-lg text-stone-950 w-full' 
                                    type="text" 
                                    id="name" 
                                    value={values.name}
                                    onChange={handleChange} />
                                    <span className="text-sm">{errors.name}</span>
                            </div>
                        </RenderIf>

                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Email: </label>
                        </div>
                        <div className='mt-2'>
                            <input className="border px-5 py-2 rounded-lg text-stone-950 w-full" 
                                    type="text" 
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange} />
                                    <span className="text-sm">{errors.email}</span>
                        </div>

                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Password: </label>
                        </div>
                        <div className="mt-2">
                            <input className='border px-5 py-2 rounded-lg text-stone-950 w-full'
                                    type="password" 
                                    id="password"
                                    value={values.password}
                                    onChange={handleChange} />
                                    <span className="text-sm">{errors.password}</span>
                        </div>
                            
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>Confirm Password: </label>
                            </div>
                            <div className="mt-2">
                                <input className='border px-5 py-2 rounded-lg text-stone-950 w-full'
                                        type="password" 
                                        id="passwordMatch" 
                                        value={values.passwordMatch}
                                        onChange={handleChange} />
                                        <span className="text-sm">{errors.passwordMatch}</span>
                            </div>
                        </RenderIf>

                        <div className="flex items-center justify-center py-4">
                            <RenderIf condition={newUserState}>
                                <button type="submit" className='border px-4 py-2 rounded-lg text-stone-950'>
                                    <span>
                                        Save
                                    </span>
                                </button>

                                <button type="button" 
                                    className='border px-4 py-2 rounded-lg text-stone-950 mx-2'
                                    onClick={event => setNewUserState(false)}>
                                    <span>
                                        Cancel
                                    </span>
                                </button>
                            </RenderIf>
                                
                            <RenderIf condition={!newUserState}>
                                <button type="submit"
                                        className='border px-4 py-2 rounded-lg text-stone-950'>
                                    <span>
                                        Login
                                    </span>
                                </button>

                                <button type="button" 
                                        className='border px-4 py-2 rounded-lg text-stone-950 mx-2'
                                        onClick={event => setNewUserState(true)}>
                                    <span>
                                        Sign Up
                                    </span>
                                </button>
                            </RenderIf>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}