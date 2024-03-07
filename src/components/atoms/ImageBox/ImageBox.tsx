import Image from 'next/image';
import SmileOutlined from '@Images/icons/smile_outlined.svg';
import { BaseImageBox } from './ImageBox.styled';
import { BLACK } from '@Styles/colors';

interface ImageBoxProp {
    width?: string;
    height?: string;
    image: string | StaticImageData | null | undefined;
    borderRadius?: string;
    border?: boolean;
    borderThickness?: string;
    transparent?: boolean;
    backgroundColor?: string;
}

export const ImageBox = ({
    width = '100px',
    height = '100px',
    image,
    borderRadius = '50%',
    border,
    borderThickness = '2px',
    transparent,
    backgroundColor,
}: ImageBoxProp) => {
    return (
        <BaseImageBox
            width={width}
            height={height}
            borderRadius={borderRadius}
            border={border}
            borderThickness={borderThickness}
            transparent={transparent}
            backgroundColor={backgroundColor}
        >
            {image ? (
                <Image src={image} layout="fill" />
            ) : (
                <SmileOutlined width={width} height={height} color={BLACK} />
            )}
        </BaseImageBox>
    );
};
