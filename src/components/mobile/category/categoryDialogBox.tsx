import { FormField } from "@/components/common/formField";
import { Loading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogHeader, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Categories } from "@/types/category";
import { CategoryType, createValidation } from "@/validations/category/create";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface Props {
    trigger?: React.ReactNode;
    isEditDialog?: boolean;
    editItem?: Categories;
    isOpen?: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmit: (category: CategoryType) => void;
    isLoading: boolean;
}

export default function CategoryDialogBox(
    { trigger,
        isEditDialog = false,
        editItem,
        isOpen,
        setIsOpen,
        handleSubmit,
        isLoading }: Props
) {
    const actionLabel = isEditDialog ? "Edit Category" : "Add Category";

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="w-[90%]">
                <DialogHeader>
                    <DialogTitle>{actionLabel}</DialogTitle>
                </DialogHeader>
                <Formik initialValues={{
                    name: editItem?.name || ""
                }}
                    validationSchema={toFormikValidationSchema(createValidation)}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div>
                            <Label htmlFor="name" className="mb-3">
                                Name
                            </Label>
                            <FormField
                                as={Input}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Eg: Gym..."
                                className="my-3"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loading /> : actionLabel}
                            </Button>
                        </DialogFooter>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>

    )
}