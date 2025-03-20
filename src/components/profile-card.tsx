"use client";

import { Instagram, Users, Image } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProfileCardProps {
  username: string;
  profileImageUrl: string;
  followers: number;
  following: number;
  posts: number;
}

export function ProfileCard({
  username,
  profileImageUrl,
  followers,
  following,
  posts
}: ProfileCardProps) {
  return (
    <Card className="overflow-hidden mb-6">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-5 w-5 text-pink-500" />
          <span>Instagram-Profil</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-pink-500">
            <AvatarImage src={profileImageUrl} alt={username} />
            <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">@{username}</h3>
            <p className="text-sm text-muted-foreground">Instagram-Nutzer</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted/20 rounded-md">
            <p className="text-2xl font-bold">{followers}</p>
            <p className="text-xs text-muted-foreground">Follower</p>
          </div>
          <div className="p-3 bg-muted/20 rounded-md">
            <p className="text-2xl font-bold">{following}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
          <div className="p-3 bg-muted/20 rounded-md">
            <p className="text-2xl font-bold">{posts}</p>
            <p className="text-xs text-muted-foreground">Beiträge</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}