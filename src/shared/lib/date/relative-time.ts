import { dayjs } from './dayjs';

export function formatEpochSecondsRelativeTime(epochSeconds: number, locale: string) {
    return dayjs.unix(epochSeconds).locale(locale).fromNow();
}
