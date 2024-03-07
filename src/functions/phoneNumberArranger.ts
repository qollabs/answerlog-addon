import { CountryCodeType } from '@Types/types';
import { countryCodeTranslator } from './codeTranslator';

export const phoneNumberArranger = (
    countryCode: CountryCodeType,
    phoneNumber: string,
) => {
    switch (countryCodeTranslator(countryCode)) {
        case '대한민국':
        default:
            return `${phoneNumber.slice(0, 3)} - ${phoneNumber.slice(
                3,
                7,
            )} - ${phoneNumber.slice(7)}`;
    }
};
