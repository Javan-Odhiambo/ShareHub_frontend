"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // Import Zod
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from "@/components/ui/InputField"
import { useUsersMutation } from '@/redux/features/users/usersApiSlice';

// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


//Should be imported from the types file.
type User = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string,
}


//Define the schema for the form
const userSchema = z
    .object({
        first_name: z.string().min(2).max(50),
        last_name: z.string().min(2).max(50),
        email: z.string().email(),
        password: z
            .string()
            .min(6)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                "Password must contain at least one uppercase letter and one digit"
            ),
        re_password: z.string(),
    })
    .refine((data) => data.password === data.re_password, {
        message: "Passwords don't match",
        path: ["re_password"],
    });


const SignUpPage = () => {
    //initialising useUsersMutation 
    const [registerUser, { isLoading }] = useUsersMutation()

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
    });

    //Function that handles submision of validated data
    const onSubmit = async (data: z.infer<typeof userSchema>) => {
        console.log(data);
        // Submit the data to your API or perform any other action
        registerUser(data).unwrap()
            .then(
            // todo add toast component (redirect to email for activation)
        )
            .catch(error => console.log(error))
    };

    return (
        <div className="max-w-[500px] w-[400px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border py-9 px-4 rounded-2xl">
            <h1 className="text-xl font-semibold text-center" >Sign Up</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >First Name</ FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="First Name" {...field} />
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Last Name</ FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email </ FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Password</ FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="re_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Confirm Password</ FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>

                </form>
            </Form>


        </div>
    );
};

export default SignUpPage;
