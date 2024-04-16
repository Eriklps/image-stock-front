'use client'

import { RenderIf, Template } from "@/components";
import Link from 'next/link';
import { useFormik } from "formik";
import { useState } from "react";

interface FormProps {
    name: string;
    tags: string;
    file: any;
}

const formScheme: FormProps = { name: '', tags: '', file: '' }

export default function FormPage() {

    const [imagePreview, setImagePreview] = useState<String>();

    const formik = useFormik({
        initialValues: formScheme,
        onSubmit: (data: FormProps) => {
            console.log(data)
        }
    })

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const file = event.target.files[0]
            formik.setFieldValue("file", file)
            const imageURL = URL.createObjectURL(file)
            setImagePreview(imageURL)
        }
    }

    return (
        <Template>
            <section className="flex flex-col items-center justify-center my-5">
                <h5 className="mt-3 mb-10 text-2xl font-extrabold text-stone-950">Upload Image</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1">
                        <label className="block text-lg font-medium leading-6 text-stone-950">Name: *</label>
                        <input type="text" id="name" onChange={formik.handleChange} placeholder="Type image name" className='border px-5 py-2 rounded-lg text-stone-950' />
                    </div>

                    <div className="mt-2 grid grid-cols-1">
                        <label className="block text-lg font-medium leading-6 text-stone-950">Tags: *</label>
                        <input type="text" id="tags" onChange={formik.handleChange} placeholder="Type tags comma separated" className='border px-5 py-2 rounded-md text-stone-950' />
                    </div>

                    <div className="mt-2 grid grid-cols-1">
                        <label className="block text-lg font-medium leading-6 text-stone-950">Image: *</label>
                        <div className="mt-2 flex justify-center rounded-md border border-dashed border-stone-300 px-6 py-10">
                            <div className="text-center text-stone-400">
                                <div className="mt-4 flex text-lg leading-6 text-stone-950">
                                    <label className="relative cursor-pointer rounded-md">

                                        <RenderIf condition={!imagePreview}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </span>
                                        </RenderIf>

                                        <RenderIf condition={!!imagePreview}>
                                                <img src={imagePreview} width={250} className='rounded-md' />
                                        </RenderIf>

                                        <input onChange={onFileUpload} type="file" className="sr-only"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-x-1">
                        <button className='border px-4 py-2 rounded-md text-stone-950'>
                            <Link href="/gallery">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </span>
                            </Link>
                        </button>
                        
                        <button type="submit" className='border px-4 py-2 rounded-md text-stone-950'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </section>
        </Template>
    )
}