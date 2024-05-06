
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const MyProfilePage = () => {
    return (
        <main className='pt-6'>
            <section className='flex flex-col sm:flex-row space-x-9 pb-7 mx-4'>
                <div>
                    <Avatar className='h-30 w-30 sm:h-36 sm:w-36 md:h-52 md:w-52 max-h-[200px] max-w-[200px] mx-auto '>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='max-w-xl'>
                    <h2 className='font-semibold text-xl'>Shad Doe</h2>
                    <p>+234 123 456 7890</p>
                    <p>john@gmail.com</p>
                    
                    <p className='mt-4'>I am a software engineer with a passion for building web applications. I have experience working with JavaScript, React, and Node.js. I am currently learning TypeScript and GraphQL.</p>
                </div>
            </section>
            <Separator className=''/>

            <section></section>
        </main>
    )
}

export default MyProfilePage
