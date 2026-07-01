import dayjs from 'dayjs';

import 'dayjs/locale/en';
import 'dayjs/locale/ko';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

export { dayjs };
