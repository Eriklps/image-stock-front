'use client'

interface ImageCardProps {
    name?: string;
    size?: string;
    uploadDate?: string;
    src?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
    name, size, uploadDate, src
}: ImageCardProps) => {

    function download() {
        window.open(src, '_blank')
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md">
            <img src={src} className="h-56 w-full object-cover rounded-t-md" alt="" />
            <div className="card-body p-4">
                <h5 className="text-x1 font-semibold mb-2 text-gray-600">{name}</h5>
                <p className="text-gray-600">{size}</p>
                <p className="text-gray-600">{uploadDate}</p>
                <button onClick={download}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}