/* eslint-disable @typescript-eslint/no-explicit-any */
interface RequestState {
    loading: boolean;
    error: boolean;
}

type RequestActionType = 'LOADING' | 'SUCCESS' | 'ERROR';

interface RequestAction {
    type: RequestActionType;
    error?: any;
}

export const asyncStateReducer = (
    _state: RequestState,
    action: RequestAction,
) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                error: false,
            };
        case 'SUCCESS':
            return {
                loading: false,
                error: false,
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
