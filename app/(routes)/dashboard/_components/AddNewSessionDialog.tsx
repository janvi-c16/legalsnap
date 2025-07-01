"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader, Loader2 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function AddNewSessionDialog() {
    const [isLoading, setIsLoading] = useState(false)
    const [note, setNot] = useState<string>()
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="mt-3">+ Start a Consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2>Add your Legal Issue or any other details</h2>
                            <Textarea placeholder="Drop your Query" className="h-[200px] mt-1" value={note} onChange={(e) => setNot(e.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'outline'}>
                        Cancel
                    </Button>
                    <Button disabled={isLoading || !note}>
                        {isLoading ? <Loader2 className="animate-spin" /> : "Start"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog