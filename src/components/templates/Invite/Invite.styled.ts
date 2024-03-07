import styled, { css } from 'styled-components';

import { Container } from '@Atoms/Container';
import { GRAY1, GRAY2, GRAY3, GRAY4, ORANGE2, ORANGE3 } from '@Styles/colors';
import { RowContainer } from '@Atoms/RowContainer';
import { Box } from '@Atoms/Box';

export const InviteContainer = styled(Container)`
    justify-content: space-between;
    height: 100%;
`;

export const InviteHeadContainer = styled(Container)`
    align-items: flex-start;
    padding: 32px;
    /* gap: 12px; */
`;

export const InviteContentContainer = styled(Container)`
    justify-content: flex-start;
    /* gap: 32px; */
    flex: 1;
    padding: 16px 40px;
`;

export const InviteRelationSelectContainer = styled(Container)`
    align-items: flex-start;
    /* gap: 8px; */
`;

export const InviteRelationSelectButton = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 8px;
    border: 1px solid ${GRAY3};
    border-radius: 8px;
    color: ${GRAY2};
`;

export const InviteRelationImageContainer = styled(RowContainer)`
    justify-content: center;
`;

export const InviteRelationImageBox = styled(Box)<{ active: boolean }>`
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    ${({ active }) =>
        active
            ? css`
                  width: 100px;
                  height: 100px;
                  border: 2px solid ${ORANGE2};
                  & > span {
                      color: ${ORANGE3};
                  }
              `
            : css`
                  width: 80px;
                  height: 80px;
                  border: 2px solid ${GRAY1};
                  & > span {
                      color: ${GRAY4};
                  }
              `}
`;

export const InviteRelationTitleBox = styled(Container)`
    align-items: center;
`;

export const InviteRelationButtonContainer = styled(Container)`
    & > button {
        margin-bottom: 8px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const InviteBackButtonContainer = styled(Container)`
    padding-top: 16px;
`;
