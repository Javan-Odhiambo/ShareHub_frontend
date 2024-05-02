"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";


//Should be imported from the types file.
type Project = {
	title: string;
	description: string;
	category: string;
	co_authors: string;
    // todo use correct imagefield type assumption is that image is path to an image file
	image: string;
};

//Define the schema for the form
const ProjectSchema = z
	.object({
		title: z.string().min(2).max(50),
		description: z.string().min(2),
		category: z.string().min(2).max(50),
		co_authors: z.string().min(2).max(50),
        //image
	});

const ProjectPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Project>({
		resolver: zodResolver(ProjectSchema),
	});

	//Function that handles submision of validated data
	const onSubmit = async (data: Project) => {
		console.log(data);
		// Submit the data to your API or perform any other action

	};

	return (
		<div>
			<h1>New Project</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputField
					label="Title"
					id="title"
					register={register("title")}
					error={errors.title}
				/>
				<InputField
					label="Description"
					id="description"
					register={register("description")}
					error={errors.description}
				/>
				<InputField
					label="Category"
					id="category"
					register={register("category")}
					error={errors.category}
				/>
				<InputField
					label="Co-authors"
					id="co_authors"
					register={register("co_authors")}
					error={errors.co_authors}
				/>

                {/* todo add image input component */}
                
                <button type="submit">Create</button>
			</form>
		</div>
	);
};

export default ProjectPage;
