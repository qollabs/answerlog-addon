export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// log the pageview with their URL
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// log specific events happening.
export const event = ({ action, params }) => {
    window.gtag('event', action, params);
};

// set the user id.
export const setUserId = (userId) => {
    window.gtag('set', {
        user_id: userId,
    });
};

// set user relationship.
export const setUserRelationship = (relationship) => {
    window.gtag('set', 'user_properties', {
        user_relationship: relationship,
    });
};

// set linked user relationship.
export const setLinkedUserRelationship = (relationship) => {
    window.gtag('set', 'user_properties', {
        linked_user_relationship: relationship,
    });
};

// set linked user phone number.
export const setLinkedUserPhoneNumber = (phone) => {
    window.gtag('set', 'user_properties', {
        linked_user_phone_number: phone,
    });
};
