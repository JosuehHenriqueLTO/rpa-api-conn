"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";

interface UserGreetingsProps {
  name?: string;
  email?: string;
  avatar?: string
  // userAuthority?: string;
}

const UserGreetings = ({
  name = "User",
  email,
  avatar,
  // userAuthority,
}: UserGreetingsProps) => {
  const hour = new Date().getHours();

  const getTimeData = () => {
    if (hour >= 5 && hour < 9) {
      return {
        greeting: "Good morning",
        message: "Starting early today? Have a productive one!",
      };
    }
    if (hour >= 9 && hour < 12) {
      return {
        greeting: "Good morning",
        message: "Everything ready for the morning tasks?",
      };
    }
    if (hour >= 12 && hour < 18) {
      return {
        greeting: "Good afternoon",
        message: "Keep up the momentum! You're doing great.",
      };
    }
    if (hour >= 18 && hour < 22) {
      return {
        greeting: "Good evening",
        message: "Wrapping up for today? Don't forget to rest.",
      };
    }
    return {
      greeting: "Good night",
      message: "Working late? Remember to take a break soon!",
    };
  };

  // const authority = () => {
  //   if (userAuthority === "Employee")
  //     return {
  //       job: "dassa",
  //     };
  //   if (userAuthority === "Manager")
  //     return {
  //       job: "dadsadasdasdssa",
  //     };
  //   // return null;
  // };

  const { greeting, message } = getTimeData();

  // const { job } = authority();

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary relative">
      <CardHeader className="flex flex-row items-start justify-between gap-4 py-6">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
            <AvatarImage
              // src="https://i.pinimg.com/736x/7a/00/1e/7a001e40c5dee539739eb88c7c1d7ecc.jpg"
              src={avatar}
              alt={name}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              {name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <CardTitle className="text-xl font-bold tracking-tight">
                {greeting}, {name}!
              </CardTitle>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                Employee
              </span>
            </div>
            <CardDescription className="text-sm font-medium text-primary/80 italic">
              "{message}"
            </CardDescription>
            {email && (
              <span className="text-xs text-muted-foreground">{email}</span>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <LogoutButton />
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserGreetings;
