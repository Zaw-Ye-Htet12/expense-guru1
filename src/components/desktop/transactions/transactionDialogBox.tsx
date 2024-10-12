import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,  
  DialogFooter,
} from "@/components/ui/dialog";
import TransactionDetail from "@/app/mobile/(layout)/transactions/[id]/page";

interface Props {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  params : {id:string }
}

const TransactionDialogBox = ({isOpen, setIsOpen, params} : Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="w-[90%]">
        <TransactionDetail params={params} onClose={()=>setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialogBox;
