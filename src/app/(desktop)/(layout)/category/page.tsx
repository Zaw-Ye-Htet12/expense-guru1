"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { useCategory } from "@/hooks/useCategory";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import DeleteModal from "@/components/common/deleteModal";
import { useEffect, useState } from "react";
import CategoryDialogBox from "@/components/mobile/category/categoryDialogBox";
import { CategoryType } from "@/validations/category/create";

export type Cateogry = {
  _id: string,
  name: string,
}


export default function CategoryPage() {
  const { categories, isFetching, deleteCategory, editCategory, loading, createCategory } = useCategory();
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [currentEditCategory, setCurrentEditCategory] = useState<Cateogry | null>(null);

  const columns: ColumnDef<Cateogry>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "index",
      header: "No.",
      cell: (info) => info.row.index + 1
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
            Category Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {

        return (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              // Trigger edit logic
              onClick={() => openEditDialog(row.original)}
            >
              Edit
            </Button>
            {handleDelete(row.original._id)}  
          </div>
        )
      }
    },

  ];

  const openEditDialog = (category: Cateogry) => {
    setCurrentEditCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    return (
      <DeleteModal
        trigger={
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        }
        onCancel={() => setOpenPopoverId(null)}
        onDelete={async () => {
          await deleteCategory(id);
          setOpenPopoverId(null);
        }}
      />
    );
  };
  const handleEdit = async (category: { name: string; _id: string }) => {
    if (currentEditCategory) {
      await editCategory(category);
      setIsEditDialogOpen(false);
      setCurrentEditCategory(null);
    }
  };

  const handleCreate = async (category: CategoryType) => {
    await createCategory(category);
    setIsCreateDialogOpen(false);
  }

  return (
    <div className="h-full -z-10">
      <div className="w-full h-32 relative">
        <div className="z-50 absolute p-5 w-full">
          <h1 className="text-2xl font-semibold mb-5">Category</h1>
          <CategoryDialogBox trigger={<Button>Add Category</Button>}
            handleSubmit={handleCreate}
            isOpen={isCreateDialogOpen}
            setIsOpen={setIsCreateDialogOpen}
            isLoading={loading}
          />
          <DataTable isLoading={isFetching} columns={columns} data={categories} />

          {isEditDialogOpen && currentEditCategory && (
            <CategoryDialogBox
              isEditDialog
              handleSubmit={(editedCategory) =>
                handleEdit({
                  ...editedCategory,
                  _id: currentEditCategory._id,
                })
              }
              editItem={currentEditCategory}
              isOpen={isEditDialogOpen}
              setIsOpen={setIsEditDialogOpen}
              isLoading={loading}
            />
          )}

        </div>
      </div>


    </div>
  )
}