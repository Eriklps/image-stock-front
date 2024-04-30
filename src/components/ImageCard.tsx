'use client'

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface ImageCardProps {
    name?: string;
    size?: number;
    uploadDate?: string;
    src?: string;
    extension?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
    name, size, uploadDate, src, extension
}: ImageCardProps) => {

    function download() {
        window.open(src, '_blank')
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md">
            <img src={src} className="h-56 w-full object-cover rounded-md" alt="" />
            <div className="card-body p-4">
                <h5 className="text-x1 font-semibold mb-2 text-gray-600">{name}</h5>
                <p className="text-gray-600">{uploadDate}</p>
                <p className="text-gray-600">{extension}</p>
                <p className="text-gray-600">{formatBytes(size)}</p>
                <button onClick={download}>
                    <ArrowDownTrayIcon className='size-6 text-stone-950'/>
                </button>
            </div>
        </div>
    )
}

function formatBytes(bytes: number = 0, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
