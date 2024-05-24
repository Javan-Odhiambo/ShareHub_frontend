"use client";
import React, { useEffect, useState } from "react";
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
import { useProfilesMeQuery, useProfilesUpdateMutation } from "@/redux/features/profile/profileApiSlice";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FileInput } from "@/components/ui/FileInput";
import { Route } from "lucide-react";
import { useRouter } from "next/navigation";

const isBrowser = typeof window !== "undefined";
const FileListType = isBrowser ? FileList : Array;

// Define the Schema for the form
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const profileFormSchema = z.object({
  profile_picture: z
    .instanceof(FileListType)
    .optional()
    .refine((file) => file == null || file?.length == 1, "File is required."),

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
      required_error: "The Email Address is required!.",
    })
    .email(),
  phone_number: z.string().min(10).max(13),
  bio: z.string().max(160).min(4),
  // Optional links
  // Transform them to empty string if they are not provided
  linked_in_url: z.string().optional().default(""),
  x_in_url: z.string().optional().default(""),
  superset_url: z.string().optional().default(""),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


export default function ProfileForm() {

  // Create a state to hold profile data
  const [myProfile, setMyProfile] = useState(null);
  const [myProfileLoading, setMyProfileLoading] = useState(true);
  const [myProfileError, setMyProfileError] = useState<FetchBaseQueryError | SerializedError | undefined>(undefined);

  let defaultValues: Partial<ProfileFormValues> = {}
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  // Fetch the profile data
  const { data: myProfileData, isLoading: myProfileLoadingData, error: myProfileErrorData } = useProfilesMeQuery(null);

  useEffect(() => {
    if (myProfileData) {
      setMyProfile(myProfileData);
      setMyProfileLoading(myProfileLoadingData);
      setMyProfileError(myProfileErrorData);

      const { first_name, last_name, email, phone_number, bio, linked_in_url, x_in_url, superset_url } = myProfileData;
      defaultValues = { first_name, last_name, bio, linked_in_url, x_in_url, superset_url, phone_number, email };
      form.reset(defaultValues);
    }
  }, [myProfileData, myProfileLoadingData, myProfileErrorData]);

  const [updateProfile] = useProfilesUpdateMutation();

  const { toast } = useToast();
  const router = useRouter();


  async function onSubmit(data: ProfileFormValues) {
    // Submit the data to your API or perform any other action
    console.log(data)
    updateProfile({ profile_id: myProfileData.id, ...data })
      .unwrap()
      .then((response) => {
        // toast created successfully
        toast({
          title: "Profile updated successfully",
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        toast({
          title: "An error occured while updating your profile",
        });
        console.log(error);
      });
  }

  return (
    <div className="mx-auto  px-5">
      <h1 className="font-semibold text-lg text-center my-5">Edit Profile</h1>
      {
        myProfileLoading ? <h1>Loading...</h1>
          :
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"
              encType="multipart/form-data"
            >
              <FormField
                control={form.control}
                name="profile_picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                    <FileInput {...form.register("profile_picture")} />
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
                        <Input className="w-80" type="text" placeholder="First Name" {...field}
                          value={field.value || ""}
                        />
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
                        <Input className="w-80" type="text" placeholder="Last Name" {...field}
                          value={field.value || ""}
                        />
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
                        <Input className="w-80" placeholder="email" {...field}
                          value={field.value || ""}
                        />
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
                        <Input className="w-80" type="tel" placeholder="Phone Number" {...field}
                          value={field.value || ""}
                        />
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
                        value={field.value || ""}

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
                        <Input {...field}
                          value={field.value || ""}
                        />
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
                        <Input {...field}
                          value={field.value || ""}
                        />
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
                        <Input {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <Button type="submit">Update profile</Button>
            </form>
          </Form>
      }
    </div>
  )

}
