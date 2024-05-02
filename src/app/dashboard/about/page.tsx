'use client'
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center space-y-6" >
        <h1>About page</h1>
      <div className="flex gap-3">

        <Button intent="soft" onClick={() => alert("It works!!")} >Danger button</Button>
        <Button intent="soft" btn_size="sm" onClick={() => alert("It works!!")} >Danger button</Button>
      </div>
    </main>
  );
}
