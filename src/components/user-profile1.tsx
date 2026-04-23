"use client";

import { Mail, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  location?: string;
  email?: string;
  verified?: boolean;
}

interface UserProfile1Props {
  user?: User;
  className?: string;
  isEditing?: boolean;
  onEditToggle?: () => void;
}

const UserProfile1 = ({
  user = {
    name: "Alex Morgan",
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
    role: "Senior Product Designer",
    bio: "Demo bio",
    location: "Unknown",
    email: "demo@email.com",
    verified: true,
  },
  className,
  isEditing,
  onEditToggle,
}: UserProfile1Props) => {
  return (
    <section className={cn("py-10", className)}>
      <div className="flex justify-center">
        <Card className="w-full max-w-sm text-center">
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="size-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  {user.verified && <Badge>Verified</Badge>}
                </div>

                {user.role && (
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pt-6">
            {user.bio && (
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            )}

            {user.location && (
              <div className="flex justify-center items-center gap-1 text-sm">
                <MapPin className="size-4" />
                {user.location}
              </div>
            )}

            {user.email && (
              <div className="flex justify-center items-center gap-1 text-sm">
                <Mail className="size-4" />
                {user.email}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button className="flex-1">Message</Button>

            <Button variant="outline" className="flex-1" onClick={onEditToggle}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export { UserProfile1 };
