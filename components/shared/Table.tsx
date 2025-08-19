import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface TableProps {
  headers: string[];
  children?: React.ReactNode;
}
const AppTable = ({ headers,  children}: TableProps) => {
  return (
    <Table className="border-separate border-spacing-x-2  border-spacing-y-2">
      <TableCaption>Latest jobs applied by you company</TableCaption>
      <TableHeader >
        <TableRow>
          {headers.map((header: string) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {children}
      </TableBody>
    </Table>
  );
};

export default AppTable;
