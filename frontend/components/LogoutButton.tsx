"use client";

import React, { useTransition } from 'react';
import { Button } from './ui/button';
import { logout } from '@/actions/auth';
import { LogOut, Loader2 } from 'lucide-react';

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors gap-2"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;