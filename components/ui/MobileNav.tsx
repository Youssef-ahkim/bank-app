'use client'


import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import Link from 'next/link'
import Image from 'next/image'; // For Next.js Image
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


const MobileNav = ({ user }: MobileNavProps) => {


    const pathname = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <Image width={30} height={30} src={'/icons/hamburger.svg'} alt="menu" className='cursor-pointer' />
                </SheetTrigger>
                <SheetContent side={"left"} className="border-none bg-white">
                    <SheetHeader>
                        <Link href={'/'} className=' cursor-pointer items-center gap-2 flex'>
                            <Image src={'/icons/logo.svg'} width={34} height={34} alt='logo' />
                            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                                Horizon
                            </h1>
                        </Link>

                        <div className="mobilenav-sheet">
                            <SheetClose asChild>
                                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                    {
                                        sidebarLinks.map((item) => {
                                            const isActive = item.route === '/'
                                                ? pathname === item.route // Only match exact for root
                                                : pathname.startsWith(item.route); // Allow partial matches for other routes


                                            return (
                                                <SheetClose asChild key={item.route}>
                                                    <Link href={item.route} key={item.label} className={cn('mobilenav-sheet_close w-full', isActive && 'bg-bank-gradient')}>
                                                        <Image width={20} height={20} src={item.imgURL} alt={item.label} className={cn({ 'brightness-[3] invert-0': isActive })} />
                                                        <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>
                                                            {item.label}
                                                        </p>
                                                    </Link>
                                                </SheetClose>
                                            )
                                        })
                                    }


                                    USER
                                </nav>
                            </SheetClose>

                            FOOTER
                        </div>



                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav