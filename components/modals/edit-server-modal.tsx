"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog"
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage
}from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
       message: "Server name is requied." 
    }),
    imageUrl: z.string().min(1,{
        message: 'Server image is required'
    })
});

export const EditServerModal = ()=> {
    const { isOpen, onClose, type, data } = useModal();
    const router =useRouter();

    const isModalOpen = isOpen && type === "editServer";
    const { server } = data;

    const form = useForm ({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          imageUrl: "",
        }
    });

    useEffect(() => {
        if (server) {
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl)
        }
    }, [server,form]);

const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        await axios.patch(`/api/servers/${server?.id}`, values);

        form.reset();
        router.refresh();
        onClose();

    } catch (error) {
        console.log(error);
    }
}

const handleClose = ( ) => {
    form.reset();
    onClose();
}

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-neutral-950 text-zinc-300 p-0 overflow-hidden">
              <DialogHeader className="pt-8 px-6">
                <DialogTitle className='text-2xl text-center font-bold'>
                   Edit Server
                </DialogTitle>
                <DialogDescription className="text-center text-neutral-400">
                Current server image
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center text-center">
                           <FormField
                           control={form.control}
                           name="imageUrl"
                           render={({ field}) => (
                            <FormItem>
                                <FormControl>
                                <FileUpload 
                                endpoint="serverImage"
                                value={field.value}
                                onChange={field.onChange}
                                />
                                </FormControl>
                            </FormItem>
                           )}
                           />

                        </div>
                        <FormField
                         control={form.control}
                         name="name"
                         render={({ field })=> (
                            <FormItem>
                                <FormLabel>
                                    Current server name

                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    className="bg-neutral-900/50 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                                     placeholder="Enter server name"
                                     {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}
                        />
                    </div>
                    <DialogFooter className="bg-neutral-950 px-6 py-4">
                        <Button variant="primary" disabled={isLoading}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
              </Form>
            </DialogContent>
        </Dialog>
    )
}