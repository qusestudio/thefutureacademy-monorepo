"use client"

import React, {useState} from 'react';

import {useGetAuthProfileQuery, useGetAuthUserQuery} from "@/state/api";


import ProfilePageSkeleton from "@/components/skeletons/skeletons";
import {HugeiconsIcon} from "@hugeicons/react";
import {
  Cancel01Icon,
  Logout01Icon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons"
import { signOut } from "@aws-amplify/auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import { ThemeProvider } from "@workspace/ui/providers/theme-provider"

const ProfileSettings = () => {
    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const {data: profile, isLoading: profileLoading} = useGetAuthProfileQuery();


    const [toggleEditMode, setEditMode] = useState<boolean>(false);


    if (profileLoading || authLoading) {
        return (
            <ProfilePageSkeleton />
        )
    }

    const handleSignOut = async () => {
        await signOut();
        window.location.href = "/signin"
    }

    const initialData = {
        firstName: profile!.firstName,
        lastName: profile!.lastName || "",
        email: authUser!.userInfo.email || "",
        phoneNumber: authUser!.userInfo.phoneNumber || "",
    }

    return (
      <ThemeProvider>
        <main className="flex w-full flex-col gap-y-5 rounded-sm border p-4">
          <p className="font-medium">My Profile</p>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-x-3">
              <Avatar>
                <AvatarImage src={authUser?.userInfo?.image} />
                <AvatarFallback className="bg-sidebar-accent-foreground/50 font-medium text-sidebar-accent-foreground">
                  {authUser?.userInfo?.name[0].toUpperCase() ||
                    authUser?.userRole?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="flex flex-col text-sm font-medium">
                {profile?.firstName} {profile?.lastName}
                <span className="text-xs">{authUser?.userInfo.email}</span>
              </p>
            </div>
            <Button
              variant={toggleEditMode ? "destructive" : "outline"}
              className="rounded-sm text-xs shadow-none hover:cursor-pointer"
              onClick={() => setEditMode(!toggleEditMode)}
            >
              {toggleEditMode ? (
                <span className="flex items-center gap-0.5">
                  <HugeiconsIcon icon={Cancel01Icon} className={"size-4"} />{" "}
                  Cancel
                </span>
              ) : (
                <>
                  <HugeiconsIcon icon={PencilEdit02Icon} className={"size-3"} />{" "}
                  Edit Profile
                </>
              )}
            </Button>
          </div>
          <Separator />
          {
            !toggleEditMode ? (
              <section className="flex flex-col justify-between gap-y-5 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Personal Information</p>
                </div>
                <div className="flex flex-col gap-y-8">
                  <div className="grid grid-cols-2 items-start gap-x-3 rounded-md font-medium">
                    <div className="flex flex-col gap-y-3 rounded text-xs">
                      First Name
                      <span className="text-sm font-medium">
                        {profile?.firstName}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-3 rounded text-xs">
                      Last Name
                      <span className="text-sm font-medium">
                        {profile?.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-start gap-x-3 rounded-md font-medium">
                    <div className="flex flex-col gap-y-3 rounded text-xs">
                      Email Address
                      <span className="text-sm font-medium">
                        {authUser?.userInfo.email}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-3 rounded text-xs">
                      Phone Number
                      <span className="text-xs font-medium">
                        {authUser?.userInfo.phoneNumber || "XXX-XXX-XXXX"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <></>
            )
            // <EditProfileForm initialData={initialData}/>
          }
          <section className="flex flex-col justify-between gap-y-5 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Preferences</p>
            </div>
            <div className="flex flex-col gap-y-8">
              <div className="grid items-start gap-x-3 rounded-md font-medium">
                <div className="flex items-center gap-x-10 gap-y-3 rounded text-sm">
                  Theme: click "D"
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col justify-between gap-y-5 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Account</p>
            </div>
            <div className="flex flex-col gap-y-8">
              <Button
                variant={"outline"}
                className="flex cursor-pointer items-center gap-x-2 gap-y-3 self-start rounded text-sm font-medium hover:bg-sidebar-accent-foreground/40"
                onClick={handleSignOut}
              >
                <HugeiconsIcon icon={Logout01Icon} />
                Logout
              </Button>
            </div>
          </section>
        </main>
      </ThemeProvider>
    )
};

export default ProfileSettings;