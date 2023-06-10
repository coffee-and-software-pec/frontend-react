import DefaultImagePng from "../../assets/default-image.png";


interface DefaultImageProps {
    src: string;
    alt: string;
    className?: string | undefined;
    defaultImage?: string
}

function DefaultImage({ src, alt, className, defaultImage }: DefaultImageProps) {
    return (
        <img 
            className={className}
            src={src} 
            alt={alt}
            onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultImage === undefined ? DefaultImagePng : defaultImage
            }}
            referrerPolicy="no-referrer"
            height={"100%"}
        />
    )
}

export default DefaultImage;