import styles from './ImageSvg.module.css';

interface ImageSvgProps {
    path: any;
    alt: string;
    backgroundColor: string;
    style?: React.CSSProperties;
}

function ImageSvg({path, alt, backgroundColor, style}: ImageSvgProps) {
    console.log(path);

    return (
        <div style={{
            backgroundColor: backgroundColor,
            mask: `url('${path}') no-repeat center`,
            maskSize: 'contain',
            ...style
        }}>
            <img 
                src={path}
                alt={alt}
                style={{ opacity: 0 }}
            />
        </div>
    )
}

export default ImageSvg;