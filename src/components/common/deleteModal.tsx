import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { DialogClose } from "@radix-ui/react-dialog";
  import { Button } from "../ui/button";


interface Props {
    trigger?: React.ReactNode,
    closeLabel?: React.ReactNode,
    deleteLabel?: React.ReactNode,
    onCancel: () => void;
    onDelete: () => void;
    title?: string,
    asMobile?: boolean,
    isOpen?:boolean
}

const DeleteModal = ({
    trigger = "Delete",
    closeLabel = "Close",
    deleteLabel = "Delete",
    onCancel,
    onDelete,
    title="Are you sure you want to delete?",
    asMobile,
    isOpen
}: Props) => {

    const handleCancel = ()=>{
        onCancel();
    }
    const handleDelete=()=>{
        onDelete();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className={asMobile ? "w-[90%]" : "w-full"}>
                <DialogHeader className="pt-5">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex mx-auto w-[50%] gap-3 mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={handleCancel}>
                                {closeLabel}
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDelete}>
                            {deleteLabel}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteModal;