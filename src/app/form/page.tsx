'use client'

import { RenderIf, Template, Button, InputText, useNotification, AuthenticatedPage } from "@/components";
import Link from 'next/link';
import { useFormik } from "formik";
import { useState } from "react";
import { useImageService } from '@/resources/image/image.service';
import { FormProps, formScheme, formValidationScheme } from "./formScheme";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export default function FormPage() {

    const [loading, setLoading] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<String>();
    const service = useImageService();
    const notification = useNotification();

    const formik = useFormik({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationScheme
    })

    async function handleSubmit(data: FormProps) {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("name", data.name);
        formData.append("tags", data.tags);

        await service.save(formData);

        formik.resetForm();
        setImagePreview('');

        setLoading(false);

        notification.notify('Upload successful', 'success');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const file = event.target.files[0]
            formik.setFieldValue("file", file)
            const imageURL = URL.createObjectURL(file)
            setImagePreview(imageURL)
        }
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <h5 className="mt-3 mb-10 text-2xl font-extrabold text-stone-950">Upload Image</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1">
                            <label className="block text-lg font-medium leading-6 text-stone-950">Name: *</label>
                            <InputText
                                id="name"
                                onChange={formik.handleChange} 
                                value={formik.values.name}
                                placeholder="Type image name" />
                                <span className="text-sm">{formik.errors.name}</span> 
                        </div>

                        <div className="mt-2 grid grid-cols-1">
                            <label className="block text-lg font-medium leading-6 text-stone-950">Tags: *</label>
                            <InputText
                                id="tags" 
                                onChange={formik.handleChange} 
                                value={formik.values.tags} 
                                placeholder="Type tags comma separated" />
                                <span className="text-sm">{formik.errors.tags}</span>
                        </div>

                        <div className="mt-2 grid grid-cols-1">
                            <label className="block text-lg font-medium leading-6 text-stone-950">Image: *</label>
                            <span className="text-sm">{formik.errors.file}</span>
                            <div className="mt-2 flex justify-center rounded-md border border-dashed border-stone-300 px-6 py-10">
                                <div className="text-center text-stone-400">
                                    <div className="mt-4 flex text-lg leading-6 text-stone-950">
                                        <label className="relative cursor-pointer rounded-md">
                                            <RenderIf condition={!imagePreview}>
                                                <ArrowUpTrayIcon className="size-6 text-stone-950" />
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
                            <Button type='submit' label='Save' />
                            <Link href="/gallery">
                                <Button type='button' label='Cancel' />
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    )
}