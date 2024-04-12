interface ImageCardProps {
    name?: string;
    size?: string;
    uploadDate?: string;
    src?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
    name, size, uploadDate, src
}: ImageCardProps) => {
    return (
        <div className="card relative bg-white rounded-md shadow-md">
            <img src={src} className="h-56 w-full object-cover rounded-t-md" alt="" />
            <div className="card-body p-4">
                <h5 className="text-x1 font-semibold mb-2 text-gray-600">{name}</h5>
                <p className="text-gray-600">{size}</p>
                <p className="text-gray-600">{uploadDate}</p>
            </div>
        </div>
    )
}