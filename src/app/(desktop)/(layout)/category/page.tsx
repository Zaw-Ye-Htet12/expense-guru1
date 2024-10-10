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
  const [selectedCategories,setSelectedCategories] = useState<string[]>([]);
  const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState<boolean>(false);

  const columns: ColumnDef<Cateogry>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (value) {
              const allCategoryIds = categories.map((category) => category._id);
              setSelectedCategories(allCategoryIds);
            } else {
              setSelectedCategories([]);
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            handleRowSelection(row.original._id,value);
          }}
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
              onClick={() => openEditDialog(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => openDeleteDialog(row.original)}
            >
              Delete
            </Button>
          </div>
        )
      }
    },

  ];

  const handleRowSelection = (id: string, isSelected: string | boolean) => {
    setSelectedCategories((prev) => {
      if (isSelected) {
        return [...prev, id];
      } else {
        return prev.filter((categoryId) => categoryId !== id);
      }
    });
  };

  const deleteSelectedCategories = async () => {
    for (const categoryId of selectedCategories) {
      await deleteCategory(categoryId);
    }
    setSelectedCategories([]); 
  };

  const openEditDialog = (category: Cateogry) => {
    setCurrentEditCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Cateogry) => {
    setCurrentEditCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async(id: string) => {
    if(currentEditCategory){
      await deleteCategory(id);
      setIsDeleteDialogOpen(false);
      setCurrentEditCategory(null)
      setSelectedCategories((prev)=>prev.filter((categoryId)=>categoryId !== id))
    }
    setSelectedCategories([])
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
           {selectedCategories.length > 0 && (
            <Button variant="destructive" onClick={deleteSelectedCategories} className="ms-2">
              Delete Selected ({selectedCategories.length})
            </Button>
          )}

          {isDeleteDialogOpen && currentEditCategory && (
            <DeleteModal
            isOpen={isDeleteDialogOpen}
            onCancel={() => setIsDeleteDialogOpen(false)}
            onDelete={()=>handleDelete(currentEditCategory._id)}
          />
          )}
          <DataTable key={categories.length} isLoading={isFetching} columns={columns} data={categories} filterableColumns={['name']}/>

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