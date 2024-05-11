"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bookmark, EllipsisVertical, Heart, MessageCircle, Share2, SquarePen, Trash2 } from "lucide-react"
import Link from "next/link"
import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"

type InnovationDetailPageProps = {
    id: string
}

const CommentSchema = z.object({
    message: z.string().min(2).max(255),
});

type TComment = z.infer<typeof CommentSchema>;


const InnovationDetailPage = ({ id }: InnovationDetailPageProps) => {
    const form = useForm<TComment>({
        resolver: zodResolver(CommentSchema),
    });

    // const [createComment, { isLoading }] = useInnovationsCreateMutation();

    //initialize toast
    const { toast } = useToast();

    //Function that handles submision of validated data
    const onSubmit = async (data: TComment) => {
        console.log(data);

        // Submit the data to your API or perform any other action
        // createComment(data)
        // 	.unwrap()
        // 	.then((response) => {
        // 		// toast created successfully
        // 		toast({
        // 			title: "Comments submitted successfully"
        // 		});
        // 		console.log(response);
        // 	})
        // 	.catch((error) => {
        // 		console.log(error);
        // 	});
    };

    return (
        <main>
            <section className='flex flex-col'>
                <div className="w-full h-[20vh] overflow-hidden">
                    <Image alt="Dashboard Banner" className="w-full " width={"100"} height={"500"} src={"/DashboardImage.webp"} />
                </div>
                <div className="flex justify-between items-center p-4">
                    <h2 className='font-semibold text-3xl'>Innovation sample</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="hover:bg-accent rounded-full p-1">
                                <EllipsisVertical />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem >
                                <SquarePen className="mr-2 h-4 w-4" />
                                <Link href={""}> {/*TODO: Add edit page link */}
                                    <span>Edit</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-destructive active:bg-destructive focus:bg-destructive hover:text-white active:text-white focus:text-white">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <p className="px-4 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum numquam quis expedita, molestiae,
                    possimus exercitationem assumenda perspiciatis totam quia, consequuntur deleniti dolorem minus
                    ipsam illum nam odit ea. Enim, alias? Rerum laborum est hic fuga consequatur explicabo! Nostrum
                    culpa
                </p>
                <div className="flex items-center justify-between mt-5 px-4 ">
                    <div className='flex items-center gap-3'>
                        <Avatar className='h-30 w-30'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="p-2">CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>John Doe</p>
                            <p className='text-sm'>john@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex gap-2 md:gap-4">
                        <Link href={""}>
                            <Button className="rounded-full md:px-9"> Visit </Button>
                        </Link>

                        <Button className="rounded-full" variant={"outline"}> Download Datasets</Button>
                    </div>
                </div>
                <div className="flex p-4 my-2 justify-between bg-accent">
                    <div className="flex gap-3">
                        <span className="flex"><Heart className="hover:fill-red-500" /> 50</span>

                        <span className="flex"><MessageCircle /> 20 </span>
                    </div>
                    <span className="flex"> <Bookmark /> </span>
                </div>
            </section>
            <section>
                Draw Charts here
            </section>
            {/* Comments container */}
            <section className="p-7 space-y-4">

                {/* Comment component */}
                <div className="border p-3 rounded-lg shadow-md">

                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-3'>
                            <Avatar className='h-30 w-30'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="p-2">CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>John Doe</p>
                                <p className='text-sm'>john@gmail.com</p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hover:bg-accent rounded-full p-1">
                                    <EllipsisVertical />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem >
                                    <SquarePen className="mr-2 h-4 w-4" />
                                    <Link href={""}> {/*TODO: Add edit page link */}
                                        <span>Edit</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-destructive active:bg-destructive focus:bg-destructive hover:text-white active:text-white focus:text-white">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Separator className="my-3" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus maxime, sapiente qui voluptas aspernatur perspiciatis incidunt nulla accusamus quia alias deserunt doloremque est atque beatae ratione odit modi, earum sit.
                        Cupiditate alias aut necessitatibus sinto obcaecati magni? Ab,Ea ut explicabo molestias delectus illum iste, itaque voluptas, nisi atque deleniti cumque molestiae! Ut dolor ex ullam adipisci dignissimos et nisi assumenda, unde
                    </p>
                </div>
                {/* Comment component */}
                <div className="border p-3 rounded-lg shadow-md">

                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-3'>
                            <Avatar className='h-30 w-30'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="p-2">CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>John Doe</p>
                                <p className='text-sm'>john@gmail.com</p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="hover:bg-accent rounded-full p-1">
                                    <EllipsisVertical />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem >
                                    <SquarePen className="mr-2 h-4 w-4" />
                                    <Link href={""}> {/*TODO: Add edit page link */}
                                        <span>Edit</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-destructive active:bg-destructive focus:bg-destructive hover:text-white active:text-white focus:text-white">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Separator className="my-3" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus maxime, sapiente qui voluptas aspernatur perspiciatis incidunt nulla accusamus quia alias deserunt doloremque est atque beatae ratione odit modi, earum sit.
                        Cupiditate alias aut necessitatibus sinto obcaecati magni? Ab,Ea ut explicabo molestias delectus illum iste, itaque voluptas, nisi atque deleniti cumque molestiae! Ut dolor ex ullam adipisci dignissimos et nisi assumenda, unde
                    </p>
                </div>


            </section>

            <section className="px-6 pb-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type comment here..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="rounded-full"
                            type="submit"
                            size={"lg"}
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </section>

        </main>

    )
}

export default InnovationDetailPage
