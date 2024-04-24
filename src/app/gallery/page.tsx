'use client'

import { Template, ImageCard, Button, InputText, useNotification, AuthenticatedPage } from '@/components';
import { Image } from '@/resources/image/image.resource';
import { useImageService } from '@/resources';
import { useState } from 'react';
import Link from 'next/link';

export default function GalleryPage(){

    const useService = useImageService();
    const notification = useNotification();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('')
    const [extension, setExtension] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function searchImages() {
        setLoading(true)
        const result = await useService.search(query, extension);
        setImages(result);
        setLoading(false);

        if(!result.length){
            notification.notify('No results found!', 'warning');
        }
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard key={image.url}
                        name={image.name} 
                        src={image.url} 
                        size={image.size}
                        extension={image.extension}
                        uploadDate={image.uploadDate}  />
        )
    }

    function renderImageCards(){
        return images.map(renderImageCard)
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className='flex flex-col items-center justify-center my-5'>
                    <div className='flex space-x-4'>
                        
                        <InputText placeholder='Search'
                            onChange={event => setQuery(event.target.value)} />
                        
                        <select onChange={event => setExtension(event.target.value)} 
                                className="border px-4 py-2 rounded-lg text-stone-950">
                            <option value="">All formats</option>
                            <option value="PNG">PNG</option>
                            <option value="JPEG">JPEG</option>
                            <option value="GIF">GIF</option>
                        </select>
                        
                        <Button label='Search' onClick={searchImages} />

                        <Link href="/form">
                            <Button label='Upload Image' />
                        </Link>
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-4">
                    {
                        renderImageCards()
                    }
                </section>
            </Template>
        </AuthenticatedPage>
    )
}