'use client'
import { TransactionTab } from "@/enums/transactionTab";
import { useCategory } from "@/hooks/useCategory";
import { useTab } from "@/hooks/useTab";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionType } from "@/validations/transaction/create";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import SegmentedControl from "../ui/segmented-control";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createValidation } from "@/validations/transaction/create";
import { Label } from "../ui/label";
import Link from "next/link";
import { getMobileRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import AddIcon from "../../../public/footerIcon/add-icon.svg";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { FormField } from "./formField";
import SelectBox from "@/components/common/selectBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TransactionForm = ({
  className,
  isDesktop = !isMobile,
}: {
  className?: string;
  isDesktop?: boolean;
}) => {
  const { createTransaction } = useTransaction();
  const { categories, fetchMore, hasMore } = useCategory();
  const { handleTabChange, currentTabParam } = useTab();

  const [initialValue, setInitialValue] = useState<TransactionType>({
    categoryId: "",
    amount: "",
    type: "",
    note: undefined,
  });

  const handleSubmit = async (
    values: TransactionType,
    { resetForm }: FormikHelpers<TransactionType>
  ) => {
    const transactionType = isDesktop
      ? values.type
      : currentTabParam.toLowerCase();
    await createTransaction({ ...values, type: transactionType });
    let initial_value: TransactionType = {
      categoryId: "",
      amount: "",
      type: "",
      note: undefined,
    };
    if (values.note) {
      initial_value = { ...initial_value, note: "" };
    }
    setInitialValue(initial_value);
    resetForm();
  };

  const getButtonText = () => {
    if (currentTabParam && !isDesktop) {
      return currentTabParam === TransactionTab.EXPENSE
        ? TransactionTab.EXPENSE
        : TransactionTab.INCOME;
    } else if (isDesktop) {
      return "New Transaction";
    }
  };

  const transactionTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];
  return (
    <>
      {!isDesktop && (
        <SegmentedControl
          data={[TransactionTab.INCOME, TransactionTab.EXPENSE]}
          defaultTab={
            currentTabParam !== TransactionTab.ALL
              ? currentTabParam
              : TransactionTab.INCOME
          }
          onSelectionChange={handleTabChange}
        />
      )}
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={toFormikValidationSchema(createValidation(isDesktop))}
      >
        <Form>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <span className="flex justify-between items-center">
              <Label htmlFor="categoryId">
                <span>Category</span>
              </Label>
              {!isDesktop && (
                <Link
                  href={getMobileRoute(Route.CATEGORY)}
                  className="p-1 rounded-full bg-[#2f7e79] w-[23px]"
                >
                  <Image src={AddIcon} alt="add icon" />
                </Link>
              )}
            </span>

            <FormField
              as={SelectBox}
              name="categoryId"
              id="categoryId"
              options={categories}
              fetchMore={fetchMore}
              hasMore={hasMore}
              className="h-65"
            />
          </div>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <Label htmlFor="amount">
              <span>Amount</span>
            </Label>
            <FormField
              as={Input}
              name="amount"
              type="text"
              id="amount"
              isMoneyInput={true}
              defaultValue={1000}
            />
          </div>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <Label htmlFor="note">
              <span>Note</span> (Optional)
            </Label>
            <FormField
              as={Input}
              name="note"
              type="text"
              id="note"
              placeholder="Enter a note (optional)"
            />
          </div>
          {isDesktop && (
            <div className="px-4 mt-4 w-full flex flex-col gap-3">
              <Label htmlFor="Type">
                <span>Transaction Type</span>
              </Label>
              <FormField
                as={SelectBox}
                name="type"
                id="type"
                options={transactionTypeOptions}
                optionValue="value"
                optionName="label"
              />
            </div>
          )}
          <div
            className={`px-4 mt-4 flex flex-col gap-3 ${
              isDesktop ? "w-[20%]" : "w-full"
            }`}
          >
            <Button type="submit">Add {getButtonText()}</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
