'use client'

import { Template, RenderIf, Button, InputText, useNotification } from "@/components"
import { useState } from 'react'
import { LoginForm, formScheme, validationScheme } from "./formScheme";
import { Formik, useFormik } from "formik";
import { useAuth } from "@/resources";
import { useRouter } from 'next/navigation'
import { AccessToken, Credentials, User } from "@/resources/user/users.resources";

export default function Login(){

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm){
        if(!newUserState) {
            
            const credentials: Credentials = { email: values.email, password: values.password }
            
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.push("/gallery")
            } catch(error: any) {
                const message = error?.message;
                notification.notify(message, "error")
            }
        } else {

            const user: User = { email: values.email, name: values.name, password: values.password }
            
            try {
                await auth.save(user);
                notification.notify("Success on saving user", "success")
                resetForm();
                setNewUserState(false);
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
                            <InputText id='name'
                                    value={values.name}
                                    onChange={handleChange} />
                                <span className="text-sm">{errors.name}</span>
                            </div>
                        </RenderIf>

                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Email: </label>
                        </div>
                        <div className='mt-2'>
                        <InputText id='email'
                                value={values.email}
                                onChange={handleChange} />
                            <span className="text-sm">{errors.email}</span>
                        </div>

                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Password: </label>
                        </div>
                        <div className="mt-2">
                        <InputText id='password' 
                                type="password"
                                value={values.password}
                                onChange={handleChange} />
                            <span className="text-sm">{errors.password}</span>
                        </div>
                            
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>Confirm Password: </label>
                            </div>
                            <div className="mt-2">
                            <InputText id='passwordMatch'
                                    type="password"
                                    value={values.passwordMatch}
                                    onChange={handleChange} />
                                <span className="text-sm">{errors.passwordMatch}</span>
                            </div>
                        </RenderIf>

                        <div className="flex justify-center py-4 gap-2">
                            <RenderIf condition={newUserState}>
                                <Button type='submit'
                                        label='Save' />
                                <Button type='button' 
                                        label='Cancel' 
                                        onClick={event => setNewUserState(false)} />
                            </RenderIf>
                                
                            <RenderIf condition={!newUserState}>
                                <Button type='submit' 
                                        label='Login' />
                                <Button type='button' 
                                        label='Sign Up'
                                        onClick={event => setNewUserState(true)} />
                            </RenderIf>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}