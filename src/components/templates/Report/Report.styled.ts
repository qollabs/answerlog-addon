import { Container } from '@Atoms/Container';
import { RowContainer } from '@Atoms/RowContainer';
import { ABSOLUTE_COVER } from '@Styles/themes';
import styled from 'styled-components';

export const ReportContainer = styled(Container)`
    padding: 16px;
    & > div {
        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;
export const ReportCardContainer = styled(RowContainer)`
    justify-content: flex-start;
    position: relative;
`;

export const ReportCardBlockContainer = styled(Container)`
    ${ABSOLUTE_COVER}
    background-color: rgba(0, 0, 0, 0.1);
    transition:
        visibility 0s,
        opacity 0.2s cubic-bezier(0, 0, 0, 1);
    backdrop-filter: blur(10px);
    z-index: 1;

    justify-content: center;
`;

export const ReportCardTextContainer = styled(Container)`
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
`;
