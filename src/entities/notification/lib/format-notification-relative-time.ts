type FormatNotificationRelativeTimeLabels = {
    justNow: string;
};

export function formatNotificationRelativeTime(
    occurredAtSeconds: number,
    locale: string,
    { justNow }: FormatNotificationRelativeTimeLabels,
) {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const nowSeconds = Math.floor(Date.now() / 1000);
    const diffSeconds = occurredAtSeconds - nowSeconds;
    const absDiffSeconds = Math.abs(diffSeconds);

    if (absDiffSeconds < 60) {
        return justNow;
    }

    if (absDiffSeconds < 3600) {
        return rtf.format(Math.round(diffSeconds / 60), 'minute');
    }

    if (absDiffSeconds < 86400) {
        return rtf.format(Math.round(diffSeconds / 3600), 'hour');
    }

    return rtf.format(Math.round(diffSeconds / 86400), 'day');
}
