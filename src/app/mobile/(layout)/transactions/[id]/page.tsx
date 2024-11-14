"use client";
import React, { useEffect, useState } from "react";
import { TransactionDetail } from "@/components/common/transactionDetail";


export default function TransactionDetailPage({params}:{params:{id:string}}){
    return (
        <TransactionDetail id={params.id} />
    )
}


