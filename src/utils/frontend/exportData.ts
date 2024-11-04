
"use client"
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
import { useToastHook } from '@/hooks/useToastHook';

export type ExportFormat = 'csv' | 'xlsx';

export const exportData = async<T>(
    data: T[],
    format: ExportFormat,
    filename: string,
    dataMapper: (item: T) => Record<string, any>
)=> {
    try {
        const dataExport = data.map(dataMapper);

        const worksheet = XLSX.utils.json_to_sheet(dataExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        if (format === 'xlsx') {
            const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
            const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(dataBlob, `${filename}.xlsx`);
        } else if (format === 'csv') {
            const csv = XLSX.utils.sheet_to_csv(worksheet, { forceQuotes: true });
            const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            saveAs(csvBlob, `${filename}.csv`);
        } else {
            throw new Error("Unsupported format. Please choose either 'csv' or 'xlsx'.");
        }
    } catch (err: any) {
        console.log(err);
    }
}