import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { get_fallback_name } from "@/lib/utils";

type CustomAvatarProps = {
  className?: string;
  image_url?: string;
  first_name: string;
  last_name: string;
};
const CustomAvatar = ({
  className,
  image_url,
  first_name,
  last_name,
}: CustomAvatarProps) => {
  return (
    <Avatar className={cn("h-12 w-12", className)}>
      <AvatarImage src={image_url} />
      <AvatarFallback className="p-2">
        {get_fallback_name(first_name, last_name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
