"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// Define the Schema for the form
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const profileFormSchema = z.object({
  profile_picture: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB"),
  // username: z
  //   .string()
  //   .min(2, {
  //     message: "Username must be at least 2 characters.",
  //   })
  //   .max(30, {
  //     message: "Username must not be longer than 30 characters.",
  //   }),
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone_number: z.string().min(10).max(13),
  bio: z.string().max(160).min(4),
  linked_in_url: z.string().url({ message: "Please enter a valid URL." }),
  x_in_url: z.string().url({ message: "Please enter a valid URL." }),
  superset_url: z.string().url({ message: "Please enter a valid URL." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


export default function ProfileForm() {

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    bio: "Hey there I am using ShareHub.",
    phone_number: "eg +254700000000",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const fileRef = form.register("profile_picture");

  const { toast } = useToast();

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="mx-auto  px-5">
      <h1 className="font-semibold text-lg text-center my-5">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    // {...fileRef}
                    onChange={(event) => {
                      field.onChange(event.target.files?.[0] ?? undefined);
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="" placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="flex justify-between gap-x-3 flex-wrap">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="w-80" type="text" placeholder="First Name" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="w-80" type="text" placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-x-3 flex-wrap">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="w-80" placeholder="email" {...field} />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input className="w-80" type="tel" placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-3 flex-wrap">
          <FormField
              control={form.control}
              name='superset_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Superset Profile URL
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='linked_in_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    LinkedIn Profile URL
                  </FormLabel>
                  {/* <FormDescription>
                      Add links to your linkedIn and X accounts and Superset
                      dashboard.
                    </FormDescription> */}
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='x_in_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    X (Formally Twitter) Profile URL
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
