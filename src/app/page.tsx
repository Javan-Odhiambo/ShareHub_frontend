"use client"
import Button from "@/components/ui/Button";
import ThemeChanger from "@/components/ui/ThemeChanger";
import Image from "next/image";

// import ToastNotification from "@/components/ui/Toast";

export default function LandingPage() {
	return (
		<main className="bg-primary-app-bg relative">
			{/* <!-- Header Section --> */}
			<header className="bg-gray-800 text-white p-4 flex justify-between items-center">
				<div>
					{/* <Image src="your-logo.png" alt="Logo" className="h-8" width={200} height={200} /> */}
				</div>
				<nav>
					<ul className="flex space-x-4">
						<li><a href="#" className="hover:underline">Home</a></li>
						<li><a href="#" className="hover:underline">Features</a></li>
						<li><a href="#" className="hover:underline">Blog</a></li>
						<li><a href="#" className="hover:underline">Contact</a></li>
					</ul>
				</nav>
			</header>

			{/* <!-- Hero Section --> */}
			<section className="hero bg-cover bg-center text-white text-center py-20" 
			// style={"background-image: url(https://source.unsplash.com/featured/1280x720/?data)"}
			>
				<h1 className="text-4xl font-bold">Unlock the Power of Data Sharing</h1>
				<p className="mt-4">Collaborate seamlessly with our data warehouse sharing platform</p>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">Get Started</button>
			</section>

			{/* <!-- Feature Section --> */}
			<section className="features py-16">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* <!-- Feature Card 1 --> */}
					<div className="feature bg-gray-100 p-4 rounded text-center">
						<i className="fas fa-database text-4xl text-blue-500"></i>
						<h2 className="text-xl font-bold mt-4">Data Collaboration</h2>
						<p className="mt-2">Effortlessly share and collaborate on data sets.</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Learn More</button>
					</div>
					{/* <!-- Feature Card 2 --> */}
					<div className="feature bg-gray-100 p-4 rounded text-center">
						<i className="fas fa-users text-4xl text-blue-500"></i>
						<h2 className="text-xl font-bold mt-4">Team Collaboration</h2>
						<p className="mt-2">Enhance team efficiency with real-time collaboration tools.</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Learn More</button>
					</div>
					{/* <!-- Feature Card 3 --> */}
					<div className="feature bg-gray-100 p-4 rounded text-center">
						<i className="fas fa-chart-line text-4xl text-blue-500"></i>
						<h2 className="text-xl font-bold mt-4">Data Insights</h2>
						<p className="mt-2">Gain valuable insights from shared data warehouses.</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Learn More</button>
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
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">Learn More</button>
				</div>
			</section>

			{/* <!-- Feature 2 Section -->

    <!-- Feature 3 Section -->

    <!-- Testimonial Section -->

    <!-- Blog Section -->

    <!-- FAQ Section -->

    <!-- Team Section -->

    <!-- Newsletter Subscription -->

    <!-- Contact Form -->

    <!-- Map Section -->

    <!-- Footer --> */}
			<footer className="bg-gray-800 text-white p-4 text-center">
				<ul className="flex justify-center space-x-4">
					<li><a href="#" className="hover:underline"><i className="fab fa-facebook"></i></a></li>
					<li><a href="#" className="hover:underline"><i className="fab fa-twitter"></i></a></li>
					<li><a href="#" className="hover:underline"><i className="fab fa-instagram"></i></a></li>
				</ul>
			</footer>
		</main>
	);
}
