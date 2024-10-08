
import { useCategory } from "@/hooks/useCategory"
import CategoryDialogBox from "./categoryDialogBox";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/validations/category/create";
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import DeleteModal from "@/components/common/deleteModal";
import EmptyData from "@/components/common/emptyData";
import ListSkeleton from "@/components/common/listSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CategoryList() {
  const {
    categories,
    loading,
    isFetching,
    hasMore,
    createCategory,
    editCategory,
    deleteCategory,
    fetchMore
  } = useCategory();

  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentEditCategoryId, setCurrentEditCategoryId] =
    useState<string>("");
  const handleCreate = async (category: CategoryType) => {
    await createCategory(category);
    setIsCreateDialogOpen(false)
  }

  const togglePopover = (categoryId: string) => {
    setOpenPopoverId(openPopoverId === categoryId ? null : categoryId);
    setIsDeleteDialogOpen(false)
  }

  const handleDelete = async (categoryId: string) => {
    await deleteCategory(categoryId);
    setOpenPopoverId(null)
    setIsDeleteDialogOpen(false)
  }

  const handleEdit = async (category: { name: string; _id: string }) => {
    await editCategory(category);
    setIsEditDialogOpen(false);
    setOpenPopoverId(null);
  }

  const openEditDialog = (categoryId: string) => {
    setCurrentEditCategoryId(categoryId);
    setIsEditDialogOpen(true);
  };
  return (
    <div className="h-[92%] w-full bg-slate-50 absolute bottom-0 rounded-t-[30px] px-4 py-5 flex flex-col items-center justify-start">
      <div className="flex justify-center w-[90%]">
        <CategoryDialogBox
          trigger={<Button>Add Category</Button>}
          handleSubmit={handleCreate}
          isOpen={isCreateDialogOpen}
          setIsOpen={setIsCreateDialogOpen}
          isLoading={loading}
        />
      </div>
      <div className="w-full grow whitespace-nowrap overflow-auto scrollbar-hide mt-5 pb-14"
        id="scrollableDiv">
        {isFetching && categories.length === 0 ? (
          <ListSkeleton />
        ) : (
          <>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={index}
                  className="w-full mb-3 border-b border-secondary"
                >
                  <CardContent className="flex justify-between items-center p-3">
                    <p className="font-medium">{category.name}</p>
                    <Popover
                      open={openPopoverId === category._id}
                      onOpenChange={() => togglePopover(category._id)}
                    >
                      <PopoverTrigger asChild>
                        <button>
                          <DotsVerticalIcon fontSize={30} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-24 mr-4 py-2 px-2">
                        <span className="flex items-center text-red-700 cursor-pointer" 
                                onClick={()=>setIsDeleteDialogOpen(true)}>Delete</span>
                        {isDeleteDialogOpen && (
                          <DeleteModal
                            asMobile
                            isOpen={isDeleteDialogOpen}
                            onCancel={() => togglePopover(category._id)}
                            onDelete={() => handleDelete(category._id)}
                          />
                        )}
                        <CategoryDialogBox
                          isEditDialog
                          handleSubmit={(editedCategory) =>
                            handleEdit({
                              ...editedCategory,
                              _id: currentEditCategoryId,
                            })
                          }
                          editItem={category}
                          isOpen={isEditDialogOpen}
                          setIsOpen={setIsEditDialogOpen}
                          isLoading={loading}
                          trigger={
                            <span
                              className="flex items-center font-light mt-2 text-slate-700 cursor-pointer"
                              onClick={() => openEditDialog(category._id)}
                            >
                              Edit
                            </span>
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </div>
              ))
            ) : (
              <EmptyData dataName="categories" />
            )}
          </>
        )}
      </div>
    </div>
  )
}

