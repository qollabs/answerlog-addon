import UnclassifiedIcon from '@Images/icons/0_unclassified.svg';
import UsIcon from '@Images/icons/1_us.svg';
import FunIcon from '@Images/icons/2_fun.svg';
import TendencyIcon from '@Images/icons/3_tendency.svg';
import RecentlyIcon from '@Images/icons/4_recently.svg';
import HeartIcon from '@Images/icons/5_heart.svg';
import UnderstandingIcon from '@Images/icons/6_understanding.svg';
import FutureIcon from '@Images/icons/7_future.svg';
import UnclassifiedImage from '@Images/0_unclassified.png';
import UsImage from '@Images/1_us.png';
import FunImage from '@Images/2_fun.png';
import TendencyImage from '@Images/3_tendency.png';
import RecentlyImage from '@Images/4_recently.png';
import HeartImage from '@Images/5_heart.png';
import UnderstandingImage from '@Images/6_understanding.png';
import FutureImage from '@Images/7_future.png';
import AlertType0 from '@Images/icons/alert_type0.svg';
import AlertType1 from '@Images/icons/alert_type1.svg';
import AlertType2 from '@Images/icons/alert_type2.svg';
import AlertType3 from '@Images/icons/alert_type3.svg';
import AlertType4 from '@Images/icons/alert_type4.svg';

class QuestionCategory {
    name: string;

    icon: JSX.Element;

    image: StaticImageData;

    constructor(name: string, icon: JSX.Element, image: StaticImageData) {
        this.name = name;
        this.icon = icon;
        this.image = image;
    }
}

export const categoryPicker = (category: number) => {
    switch (category) {
        case 0:
            return new QuestionCategory(
                '기타',
                <UnclassifiedIcon />,
                UnclassifiedImage,
            );
        case 1:
            return new QuestionCategory('우리', <UsIcon />, UsImage);
        case 2:
            return new QuestionCategory('재미', <FunIcon />, FunImage);
        case 3:
            return new QuestionCategory(
                '성향',
                <TendencyIcon />,
                TendencyImage,
            );
        case 4:
            return new QuestionCategory(
                '요즘',
                <RecentlyIcon />,
                RecentlyImage,
            );
        case 5:
            return new QuestionCategory('마음', <HeartIcon />, HeartImage);
        case 6:
            return new QuestionCategory(
                '이해',
                <UnderstandingIcon />,
                UnderstandingImage,
            );
        case 7:
            return new QuestionCategory('미래', <FutureIcon />, FutureImage);
        default:
            return new QuestionCategory(
                '기타',
                <UnclassifiedIcon />,
                UnclassifiedImage,
            );
    }
};

export const AlertTypePicker = (type: number, width: string, color: string) => {
    switch (type) {
        case 0:
            return <AlertType0 width={width} height={width} color={color} />;
        case 1:
            return <AlertType1 width={width} height={width} color={color} />;
        case 2:
            return <AlertType2 width={width} height={width} color={color} />;
        case 3:
            return <AlertType3 width={width} height={width} color={color} />;
        case 4:
            return <AlertType4 width={width} height={width} color={color} />;
    }
};
