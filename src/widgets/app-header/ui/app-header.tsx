import Image from 'next/image';

import { AppHeaderNotificationButton } from './app-header-notification-button';
import { AppHeaderProfileButton } from './app-header-profile-button';
import FlowitLogo from 'public/images/flowit-logo.png';

export function AppHeader() {
    return (
        <header className="z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-8">
            <Image src={FlowitLogo} alt="Flowit Logo" width={100} height={100} className="h-auto w-28" />
            <div className="flex items-center gap-3">
                <AppHeaderNotificationButton />
                <div className="my-2 self-stretch border-l border-slate-200" />
                <AppHeaderProfileButton />
            </div>
        </header>
    );
}
