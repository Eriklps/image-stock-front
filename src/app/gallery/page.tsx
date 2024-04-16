'use client'

import { Template, ImageCard, useNotification } from '@/components';
import { Image } from '@/resources/image/image.resource';
import { useImageService } from '@/resources/image/image.service';
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
        <Template loading={loading}>
            <section className='flex flex-col items-center justify-center my-5'>
                <div className='flex space-x-4'>
                    
                    <input type='text'
                        onChange={event => setQuery(event.target.value)}
                        className='border px-5 py-2 rounded-lg text-stone-950'
                        placeholder="Search" />
                    
                    <select onChange={event => setExtension(event.target.value)} 
                            className="border px-4 py-2 rounded-lg text-stone-950">
                        <option value="">All formats</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    
                    <button className='border px-4 py-2 rounded-lg text-stone-950' onClick={searchImages}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span>
                    </button>
                    <Link href="/form">
                        <button className='border px-4 py-2 rounded-lg text-stone-950'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </span>
                        </button>
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-4">
                {
                    renderImageCards()
                }
            </section>
        </Template>
    )
}