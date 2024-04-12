'use client'

import { Template, ImageCard } from '@/components';
import { Image } from '@/resources/image/image.resource';
import { useImageService } from '@/resources/image/image.service';
import { useState } from 'react';

export default function GalleryPage(){

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);

    async function searchImages() {
        const result = await useService.search();
        setImages(result);
        console.table(result);
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard name={image.name} 
                       src={image.url} 
                       size={image.size}
                       uploadDate={image.uploadDate}  />
        )
    }

    function renderImageCards(){
        return images.map(renderImageCard)
    }

    return (
        <Template>
            <button className='bg-gray-500' onClick={searchImages}>Search</button>
            <section className="grid grid-cols-3 gap-4">
                {
                    renderImageCards()
                }
            </section>
        </Template>
    )
}