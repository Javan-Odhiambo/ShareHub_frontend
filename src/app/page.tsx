"use client"
import { Button } from "@/components/ui/button";
import ThemeChanger from "@/components/ui/ThemeChanger";
import Image from "next/image";
import Link from "next/link";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function LandingPage() {
	// Declare a zod schema for the form with name, email and message fields
	const schema = z.object({
		name: z.string().min(3),
		email: z.string().email(),
		message: z.string().min(10),
	});

	// Create a type from the schema
	type FormValues = z.infer<typeof schema>;

	// Create a new form with the schema
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	//Handle form submission
	const onSubmit = async (data: FormValues) => {
		console.log(data);
	}


	return (
		<main className="relative">
			{/* <!-- Header Section --> */}
			<header className="bg-muted/40 p-4 flex justify-between items-center">
				<div>
					<Link href="/" className="font-semibold">
						<span className="">ShareHub</span>
					</Link>
				</div>
				<nav className="flex gap-6 items-center">
					<Link href="/" className="hover:underline">Home</Link>

				</nav>
			</header>

			{/* <!-- Hero Section --> */}
			<section className="text-white text-center py-20"
			// style={"background-image: url(https://source.unsplash.com/featured/1280x720/?data)"}
			>
				<h1 className="text-4xl font-bold">Unlock the Power of Data Sharing</h1>
				<p className="my-4">Collaborate seamlessly with our data warehouse sharing platform</p>
				<div className="space-x-4">

					<Button variant="outline" className="hover:bg-white hover:text-black" size="lg">
						<Link className="font-semibold" href='/auth/login'>
							Login
						</Link>
					</Button>

					<Button variant="outline" className="hover:bg-white hover:text-black" size="lg" >
						<Link className="font-semibold" href='/auth/signup'>
							Register
						</Link>
					</Button>
				</div>
			</section>

			{/* <!-- Feature Section --> */}
			<section className="features py-16">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* <!-- Feature Card 1 --> */}
					<div className="pb-8 bg-muted/30 border p-4 rounded text-center">
						<i className="fas fa-database text-4xl text-blue-500"></i>
						<h2 className="text-xl font-bold mt-4">Data Collaboration</h2>
						<p className="mt-2">Effortlessly share and collaborate on data sets.</p>
					</div>
					{/* <!-- Feature Card 2 --> */}
					<div className="pb-8 bg-muted/30 border p-4 rounded text-center">
						<i className="fas fa-users text-4xl text-blue-500"></i>
						<h2 className="text-xl font-bold mt-4">Team Collaboration</h2>
						<p className="mt-2">Enhance team efficiency with real-time collaboration tools.</p>
					</div>
					{/* <!-- Feature Card 3 --> */}
					<div className="pb-8 bg-muted/30 border p-4 rounded text-center">
						<i className="fas fa-chart-line text-4xl text-blue-500"></i>
						<h2 className="text-xl font-bold mt-4">Data Insights</h2>
						<p className="mt-2">Gain valuable insights from shared data warehouses.</p>
					</div>
				</div>
			</section>

			{/* <!-- Individual Feature Sections --> */}
			{/* <!-- Feature 1 Section --> */}
			<section className="individual-feature bg-cover bg-left text-white text-center py-20"
			//  style="background-image: url(https://source.unsplash.com/featured/1280x720/?data)"
			>
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl font-bold">Data Collaboration Made Easy</h2>
					<p className="mt-4">Effortlessly share and collaborate with team members on important data sets. Our platform provides the tools you need for seamless data sharing and collaboration.</p>
					<Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">Learn More</Button>
				</div>
			</section>

			{/* <!-- Feature 2 Section -->

    <!-- Feature 3 Section -->

    <!-- Testimonial Section -->

    <!-- Blog Section -->

    <!-- FAQ Section -->

    <!-- Team Section -->

    <!-- Newsletter Subscription -->



    <!-- Map Section -->
*/}
			{/* <!-- Contact Form -->
	//  A contact form with fields for name, email, and message
	//  use the useForm hook to handle form submission
	//  A loading state that appears when the form is submitting
	//  A submit button
	//  A success message that appears after the form is submitted
	//  A failure message that appears if there is an error submitting the form */}

			<section className="mx-auto max-w-[700px] mb-8">
				<h2 className="text-3xl text-center font-bold mb-5">Get In Touch</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
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
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Type your message here..."
											{...field}
											value={field.value || ""}

										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">
							Submit
						</Button>
					</form>
				</Form>

			</section>
			{/* <!-- Footer -->  */}
			<footer className="bg-gray-800 text-white p-4 text-center">
				<p>&copy; 2022 ShareHub. All Rights Reserved.</p>
			</footer>
		</main>
	);
}
