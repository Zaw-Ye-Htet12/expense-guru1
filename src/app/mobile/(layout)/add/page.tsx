"use client";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getMobileRoute } from "@/lib/route";
import { Route } from "@/enums/route";
import Image from "next/image";
import AddIcon from "../../../../../public/footerIcon/add-icon.svg";
import Bg from "../../../../../public/home-bg.png";
import WithSuspense from "@/components/common/withSuspense";
import { Form, Formik, FormikHelpers } from "formik";
import { useTransaction } from "@/hooks/useTransaction";
import {
  createValidation,
  TransactionType,
} from "@/validations/transaction/create";
import { FormField } from "@/components/common/formField";
import { useCategory } from "@/hooks/useCategory";
import SelectBox from "@/components/common/selectBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TransactionTab } from "@/enums/transactionTab";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SegmentedControl from "@/components/ui/segmented-control";
import { useTab } from "@/hooks/useTab";

export default function Add() {
  return (
    <div className="pt-10 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 h-auto">
        <Image src={Bg} alt="background image" className="w-screen" />
        <div className="relative bottom-[100px] w-[90%] py-5 px-3 mx-auto shadow-md rounded-3xl bg-white">
          <WithSuspense>
            <TransactionForm />
          </WithSuspense>
        </div>
      </div>
    </div>
  );
}

const TransactionForm = () => {
  const { createTransaction } = useTransaction();
  const { categories, fetchMore, hasMore } = useCategory();
  const { handleTabChange, currentParam } = useTab();

  const [initialValue, setInitialValue] = useState<TransactionType>({
    categoryId: "",
    amount: "",
  });

  const handleSubmit = async (values: TransactionType, { resetForm }: FormikHelpers<TransactionType>) => {
    await createTransaction(values);
    setInitialValue({ categoryId: "", amount: "" });
    resetForm();
  };

  const getButtonText = () => {
    return currentParam === TransactionTab.EXPENSE
      ? TransactionTab.EXPENSE
      : TransactionTab.INCOME;
  };

  return (
    <>
      <SegmentedControl
        data={[TransactionTab.INCOME, TransactionTab.EXPENSE]}
        defaultTab={currentParam !== TransactionTab.ALL ? currentParam : TransactionTab.INCOME}
        onSelectionChange={handleTabChange}
      />
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={toFormikValidationSchema(createValidation)}
      >
        <Form>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <span className="flex justify-between items-center">
              <Label htmlFor="category">
                <span>Category</span>
              </Label>
              <Link
                href={getMobileRoute(Route.CATEGORY)}
                className="p-1 rounded-full bg-[#2f7e79] w-[23px]"
              >
                <Image src={AddIcon} alt="add icon" />
              </Link>
            </span>
            <FormField
              as={SelectBox}
              name="categoryId"
              id="categoryId"
              options={categories}
              fetchMore={fetchMore}
              hasMore={hasMore}
            />
          </div>
          <div className="px-4 mt-4 w-full flex flex-col gap-3">
            <Label htmlFor="categoryId">
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
            <Button type="submit">Add {getButtonText()}</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
