import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Logout01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@workspace/ui/components/button"
import { signOut } from "@aws-amplify/auth"

const LogoutDialog = () => {

  const handleLogout = async () => {
    await signOut();
  }

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer items-center gap-x-2 p-4">
        <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
        Logout
      </DialogTrigger>
      <DialogContent className="font-chillax">
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
        </DialogHeader>
        <div>
          <button
            onClick={handleLogout}
            className="w-full rounded-full cursor-pointer bg-red-700 px-5 py-2 text-lg font-normal tracking-wider"
          >
            Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutDialog
