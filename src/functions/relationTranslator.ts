export const relationTypeTranslator = (type: number) => {
    switch (type) {
        case 0:
            return '부모 자녀 관계';
        case 1:
            return '배우자 관계';
        case 2:
            return '형제 자매 관계';
        case 3:
            return '친구 관계';
        default:
            return '';
    }
};

export const relationArrayByType = (type: number) => {
    switch (type) {
        case 0:
            return ['엄마', '아빠', '딸', '아들'];
        case 1:
            return ['배우자'];
        case 2:
            return ['누나/언니', '형/오빠', '동생'];
        case 3:
            return ['친구'];
        default:
            return [];
    }
};

export const inverseRelationArray = (relation: string) => {
    switch (relation) {
        case '엄마':
        case '아빠':
            return ['딸', '아들'];
        case '딸':
        case '아들':
            return ['엄마', '아빠'];
        case '배우자':
            return ['배우자'];
        case '형/오빠':
        case '누나/언니':
            return ['동생'];
        case '동생':
            return ['누나/언니', '형/오빠'];
        case '친구':
            return ['친구'];
        default:
            return [];
    }
};
