import { TransactionTab } from "@/enums/transactionTab";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { createQueryString } from "@/lib/route";

export const useTab = () => {
    const searchParams = useSearchParams();
    const currentTabParam = searchParams.get('tab') || TransactionTab.ALL;
    const currentMonthParam = searchParams.get('month');
    const pathName = usePathname();
    const router = useRouter();

    const createQuery = useCallback((name: string, value: string) => {
        return createQueryString(name, value, searchParams.toString())
    }, [searchParams])

    const handleTabChange = (item: string, queryName: string = 'tab') => {
        router.push(`${pathName}?${createQuery(queryName, item)}`);
    }

    return { currentTabParam, currentMonthParam, handleTabChange }
}