import { Template, ImageCard } from '@/components';

export default function GalleryPage(){
    return (
        <Template>
            <section className="grid grid-cols-3 gap-4">
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
            </section>
        </Template>
    )
}