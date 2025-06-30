import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { IPackage } from "@/interfaces/package.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import EditPackageDialog from "@/components/dialogs/package/edit";
import DeletePackageDialog from "@/components/alert/package/delete";
import { Link } from "react-router-dom";
import { Calendar, NotepadText } from "lucide-react";
import { UserType } from "@/interfaces/user.interface";
import Constants from "@/constants";
import { useAuth } from "@/providers/auth-provider";
import clsx from "clsx";

export const Columns: ColumnDef<IPackage>[] = [
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
    id: "creator",
    header: "Creator",
    cell: ({ row }) => {
      if (!row.original.creator) return;
      const { firstName, lastName, avatar } = row.original.creator;
      return (
        <div className="flex items-center gap-2 max-w-[180px] truncate">
          <Avatar>
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback>{firstName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="truncate">{`${firstName} ${lastName}`}</span>
        </div>
      );
    },
  },
  {
    id: "packageNumber",
    header: "Package no.",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.packageNumber}</span>
    ),
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="truncate block max-w-[150px]">{row.original.name}</span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const isActive = status === "ACTIVE";
      return (
        <span
          className={clsx(
            "px-2 py-1 rounded text-xs font-semibold w-fit",
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          )}
        >
          {isActive ? "ACTIVE" : "VOID"}
        </span>
      );
    },
  },
  {
    id: "createdAt",
    header: () => (
      <div className="flex items-center gap-x-2">
        <p className="whitespace-nowrap">Date Created</p>
        <Calendar color="white" size={16} />
      </div>
    ),
    cell: ({ row }) => (
      <span className="capitalize whitespace-nowrap">
        {format(new Date(row.original.createdAt), "MMMM d, h:mm a")}
      </span>
    ),
  },
  {
    id: "approver",
    header: "Approved by",
    cell: ({ row }) => {
      const approver = row.original.approver;
      if (!approver) return "-";
      return (
        <span className="truncate">
          {`${approver.firstName ?? ""} ${approver.lastName ?? ""}`}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
      const { session: { user } } = useAuth();

      return (
        <div className="flex items-center justify-center gap-4">
          <Link
            to={`/${user?.userType === UserType.ADMIN ? "admin" : "employee"
              }/packages/${row.original.id}`}
          >
            <NotepadText
              size={16}
              className="cursor-pointer hover:text-primary"
            />
          </Link>
          {user?.permission &&
            PermissionsCanEdit.includes(user.permission) && (
              <EditPackageDialog data={row.original} />
            )}
          {user?.permission &&
            PermissionsCanDelete.includes(user.permission) && (
              <DeletePackageDialog packageId={row.original.id} />
            )}
        </div>
      );
    },
  },
];
