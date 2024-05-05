import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import {
    Bookmark,
    Heart,
    MessageCircle
} from "lucide-react"

const ProjectCard = () => {
  return (
    <Card className="w-[350px]">
      <CardContent>
        <div>
          <div>
            <div>
              <Avatar>
                <AvatarImage
                  src="/dashboard-powerpoint-template.webp"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Link href="/dashboard">John Doe</Link>
            </div>
            <Image src="/Image Icon.png" width={200} height={150} alt="Dashboard image"/>
            <div>
                <span> 50 <Heart/> </span>
                <span> 20 <MessageCircle/> </span>
                <span> <Bookmark/> </span>
            </div>
          </div>
          <div>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
