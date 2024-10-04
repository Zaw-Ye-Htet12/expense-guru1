import { TransactionTab } from "@/enums/transactionTab";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { createQueryString } from "@/lib/route";

export const useTab = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const currentParam = searchParams.get('tab') || TransactionTab.INCOME;
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState<string>(currentParam)

    const createQuery = useCallback((name: string, value: string) => {
        return createQueryString(name, value, searchParams.toString())
    }, [searchParams])

    const handleTabChange = (item: string, queryName: string = 'tab') => {
        router.push(`${pathName}?${createQuery(queryName, item)}`);
        setCurrentTab(currentParam)
    }

    return { currentParam, handleTabChange, currentTab }
}