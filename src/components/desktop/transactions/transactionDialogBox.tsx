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
import TransactionDetail from "@/components/common/transactionDetail";

interface Props {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const TransactionDialogBox = ({ isOpen, setIsOpen, id }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="w-[90%]">
        <TransactionDetail id={id} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialogBox;
