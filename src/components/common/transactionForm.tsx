"use client";
import { TransactionTab } from "@/enums/transactionTab";
import { useCategory } from "@/hooks/useCategory";
import { useTab } from "@/hooks/useTab";
import { useTransaction } from "@/hooks/useTransaction";
import { TransactionType } from "@/validations/transaction/create";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
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
import { Switch } from "../ui/switch";
import { DatePicker } from "./datePicker";
import {
  ScheduleTransactionType,
  scheduleValidation,
} from "@/validations/transaction/schedule";

export const TransactionForm = ({
  className,
  isDesktop = !isMobile,
}: {
  className?: string;
  isDesktop?: boolean;
}) => {
  const { createTransaction, createScheduleTransaction } = useTransaction();
  const { categories, fetchMore, hasMore } = useCategory();
  const { handleTabChange, currentTabParam } = useTab();
  const [isSchedule, setIsSchedule] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("")

  const initialValue:ScheduleTransactionType = {
    categoryId: "",
    amount: "",
    type: "",
    note: undefined,
    transactionName: "",
    frequency: "",
    startDate: new Date(),
    endDate: new Date(),
    dayOfWeek: 0,
    dayOfMonth: 0
  };

  const handleSubmit = async (
    values: ScheduleTransactionType,
    { resetForm }: FormikHelpers<ScheduleTransactionType>
  ) => {
    console.log('clicked')
    const transactionType = isDesktop
      ? values.type
      : currentTabParam.toLowerCase();
    const data: ScheduleTransactionType = {
      ...values,
      type: transactionType,
    };
    if (isSchedule) {
      await createScheduleTransaction(data);
    } else {
      await createTransaction(data);
    }
    resetForm({values: initialValue});
    setSelectedFrequency("")
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

  const FrequencyTypeOptions = [
    { value: "Once", label: "Once" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const WeeklyOptions = daysOfWeek.map((day, index) => ({ value: index.toString(), label: day }));
  const MonthlyOptions = [...Array.from({ length: 31 }, (_, i)=>({ value: (i + 1).toString(), label: `Day ${i + 1}`}))]

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
        validationSchema={toFormikValidationSchema(isSchedule ? scheduleValidation(selectedFrequency) : createValidation())}
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
          <div className="ps-4 mt-4 flex items-center space-x-2">
            <Switch
              id="schedule-transaction"
              className=""
              onClick={() => setIsSchedule((prev) => !prev)}
            />
            <Label htmlFor="schedule-transaction">Schedule</Label>
          </div>
          {isSchedule && (
            <>
              <div className="px-4 mt-4 w-full flex flex-col gap-3">
                <Label htmlFor="scheduleName">
                  <span>Schedule Name</span>
                </Label>
                <FormField
                  as={Input}
                  name="transactionName"
                  type="text"
                  id="scheduleName"
                />
              </div>
              <div className="px-4 mt-4 w-full flex flex-col gap-3">
                <span className="flex justify-between items-center">
                  <Label htmlFor="frequencyId">
                    <span>Frequency</span>
                  </Label>
                </span>
                <FormField
                  as={SelectBox}
                  name="frequency"
                  id="frequencyId"
                  options={FrequencyTypeOptions}
                  optionValue="value"
                  optionName="label"
                  className="h-65"
                  selectedItem={(item) =>setSelectedFrequency(item) }
                />
              </div>
              {(selectedFrequency && selectedFrequency === "Weekly") && (
                <div className="px-4 mt-4 flex flex-col gap-3">
                  <span className="flex justify-between items-center">
                    <Label htmlFor="weekly">
                      <span>Every</span>
                    </Label>
                  </span>
                  <FormField
                    as={SelectBox}
                    name="dayOfWeek"
                    id="weekly"
                    options={WeeklyOptions}
                    optionValue="value"
                    optionName="label"
                  />
                </div>
              )}
              {(selectedFrequency && selectedFrequency === "Monthly") && (
                <div className="px-4 mt-4 flex flex-col gap-3">
                  <span className="flex justify-between items-center">
                    <Label htmlFor="monthly">
                      <span>Every</span>
                    </Label>
                  </span>
                  <FormField
                    as={SelectBox}
                    name="dayOfMonth"
                    id="monthly"
                    options={MonthlyOptions}
                    optionValue="value"
                    optionName="label"
                  />
                </div>
              )}
              <div className="px-4 mt-4 flex flex-wrap justify-start gap-2 items-center">
                <div className="flex flex-col gap-3">
                  <span className="flex justify-between items-center">
                    <Label htmlFor="startDate">
                      <span>Start Date</span>
                    </Label>
                  </span>
                  <FormField as={DatePicker} name="startDate" id="startDate" />
                </div>
                {(selectedFrequency && selectedFrequency !== "Once") && (
                  <div className="flex flex-col gap-3">
                    <span className="flex justify-between items-center">
                      <Label htmlFor="endDate">
                        <span>End Date</span>
                      </Label>
                    </span>
                    <FormField as={DatePicker} name="endDate" id="endDate" />
                  </div>
                )}
              </div>
            </>
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
