"use client"
import Button from "@/components/ui/Button";
import ThemeChanger from "@/components/ui/ThemeChanger";

import ToastNotification from "@/components/ui/Toast";

export default function Home() {
  return (
		<main className="flex min-h-screen items-center justify-center bg-primary-app-bg relative">
			<Button onClick={() => alert("It works!!")}>Test button</Button>
			<ThemeChanger className="absolute top-1 left-2" />
			<div className="flex flex-col w-[200px] h-[200px] bg-primary-subtle-bg justify-center items-center mr-3">
				<button className="bg-primary-solid-bg text-primary-high-constrast-text rounded-md w-fit">
					Sample
				</button>
				<p className="text-primary-high-contrast-text text-center">
					Text
				</p>
			</div>
			<ToastNotification
				title="Button Clicked !!"
				description="Alert using my toast"
				triggerButtonText="Test Toast Notification"
				showCloseButton
				closeButtonText="x"
				duration={5000}
			/>
		</main>
  );
}
