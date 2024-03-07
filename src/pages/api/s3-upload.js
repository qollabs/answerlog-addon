// export { APIRoute as default } from 'next-s3-upload';

import { convertTime } from '@Functions/convertTime';
import { APIRoute, sanitizeKey } from 'next-s3-upload';

export default APIRoute.configure({
    key(req, filename) {
        const now = convertTime(new Date(), 'yymmddhhmmss');
        const { myDatabaseId, type, sort } = req.body;
        return `${type}/${myDatabaseId}/${sort}/${now}_${sanitizeKey(
            filename,
        )}`;
    },
});
