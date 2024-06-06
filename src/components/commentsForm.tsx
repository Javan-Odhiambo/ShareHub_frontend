import React from 'react'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useInnovationsCommentsCreateMutation } from '@/redux/features/innovations/innovationsApiSlice'


type CommentsFormProps = {
    id: string
}

const CommentsForm = ({ id }: CommentsFormProps) => {
    const CommentSchema = z.object({
        message: z.string().min(2).max(255),
    });

    type TComment = z.infer<typeof CommentSchema>;

    //initialize toast
    const { toast } = useToast();

    const form = useForm<TComment>({
        resolver: zodResolver(CommentSchema),
    });
    const [createComment, { isLoading: isCreatingComment }] =
    useInnovationsCommentsCreateMutation();

    //Function that handles submision of validated data
    const onSubmit = async (data: TComment) => {
        // useInnovationsCommentsDeleteMutation
        // useInnovationsCommentsUpdatePatchMutation
        // useInnovationsCommentsUpdatePutMutation
        // useInnovationsCommentsReadQuery

        // Submit the data to your API or perform any other action
        createComment({ id, ...data })
            .unwrap()
            .then((response) => {
                // toast created successfully
                toast({
                    title: "Comments submitted successfully",
                });
                console.log("Response: ", response);
                form.reset({ message: "" });
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <section className="px-6 pb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Comment</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Type comment here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className="rounded-full"
                        type="submit"
                        size={"lg"}
                        disabled={isCreatingComment}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default CommentsForm
