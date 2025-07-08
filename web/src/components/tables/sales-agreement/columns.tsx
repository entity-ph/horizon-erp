import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { format } from "date-fns";
import { ISalesAgreement } from "../../../interfaces/sales-agreement.interface";
import ClientTypeBadge from "../../badges/client-type";
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown, Calendar, NotepadText } from "lucide-react";
import { Link } from "react-router-dom";
import EditSalesAgreementDialog from "../../dialogs/sales-agreement/edit";
import DeleteSalesAgreement from "../../alert/sales-agreement/delete";
import { useAuth } from "@/providers/auth-provider";
import { UserType } from "@/interfaces/user.interface";
import Constants from "@/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";

export const Columns: ColumnDef<ISalesAgreement>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="border-white"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client.name",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => { column.toggleSorting(column.getIsSorted() === "asc") }}
        >
          Client Name
          {isSorted === "asc" && <ArrowUpAZ className="ml-2 h-4 w-4" />}
          {isSorted === "desc" && <ArrowDownAZ className="ml-2 h-4 w-4" />}
          {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}				</Button>
      )
    },
    enableSorting: true,
  },
  {
    id: "preparedBy",
    header: "Prepared By",
    cell: ({ row }) => {
      if (!row.original.creator) return;
      const { firstName, lastName, avatar } = row.original.creator;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback>
              {firstName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      )
    }
  },
  {
    id: "serialNumber ",
    header: "Ser. No.",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.serialNumber}
      </span>
    )
  },
  {
    id: "typeOfClient",
    header: "Client type",
    cell: ({ row }) => (
      <ClientTypeBadge
        value={row.original.client.clientType}
      />
    )
  },
  {
    id: "createdAt",
    header: () => <div className="flex items-center gap-x-2">
      <p>Date Created</p>
      <Calendar color="white" size={16} />
    </div>,
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {format(new Date(row.original.createdAt), 'MMMM d, h:mm a')}
        </span>
      )
    }
  },
  {
    id: "approvedBy",
    header: "Approved By",
    cell: ({ row }) => {
      if (!row.original.approver) return;
      const { firstName, lastName, avatar } = row.original.approver;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback>
              {firstName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{`${firstName} ${lastName}`}</span>
        </div>
      )
    }
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const statusClass = clsx(
        "px-2 py-1 rounded text-xs font-semibold w-fit",
        {
          "bg-green-100 text-green-700": status === "ACTIVE",
          "bg-red-100 text-red-700": status === "VOID",
          "bg-yellow-100 text-yellow-800": status === "PAID",
        }
      );

      return (
        <span className={statusClass}>
          {status}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
      const { session: { user } } = useAuth();
      return (
        <div className="flex items-center justify-center gap-4">
          <Link to={`/${user?.userType === UserType.ADMIN ? 'admin' : 'employee'}/sales-agreements/${row.original.id}`}>
            <NotepadText
              size={16}
              className="cursor-pointer hover:text-primary"
            />
          </Link>
          {user?.permission && PermissionsCanEdit.includes(user?.permission) || !row.original.approverId && (
            <EditSalesAgreementDialog
              data={row.original}
            />
          )}
          {user?.permission && PermissionsCanDelete.includes(user?.permission) && (
            <DeleteSalesAgreement
              salesAgreementId={row.original.id}
            />
          )}
        </div>
      )
    },
  },
];
