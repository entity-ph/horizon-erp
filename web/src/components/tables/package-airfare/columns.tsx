import { ColumnDef } from "@tanstack/react-table";
import { useAuth } from "@/providers/auth-provider";
import Constants from "@/constants";
import { IPackageAirfare } from "@/interfaces/package.interface";
import UpdatePackageAirfareDialog from "@/components/dialogs/package/edit-airfare";
import DeletePackageAirfareDialog from "@/components/alert/package/delete-airfare";

export const Columns: ColumnDef<IPackageAirfare>[] = [
  {
    id: "airline",
    header: "Airline",
    cell: ({ row }) => (
      <span className="capitalize text-[10px]">
        {row.original.airline}
      </span>
    ),
  },
  {
    id: "flightDetails",
    header: "Flight details",
    cell: ({ row }) => (
      <span className="capitalize text-[10px]">
        {row.original.flightDetails}
      </span>
    )
  },
  {
    id: "rate",
    header: "Rate",
    cell: ({ row }) => (
      <span className="capitalize text-[10px]">
        {row.original.rate}
      </span>
    )
  },
  {
    id: "baggageAllowance",
    header: "Baggage Allowance",
    cell: ({ row }) => (
      <span className="capitalize text-[10px]">
        {row.original.baggageAllowance}
      </span>
    )
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { session: { user } } = useAuth();
      const { PermissionsCanEdit, PermissionsCanDelete } = Constants;
      return (
        <div className="flex items-center gap-4">
          {(user?.permission && PermissionsCanEdit.includes(user?.permission)) && (
            <UpdatePackageAirfareDialog data={row.original} />
          )}
          {(user?.permission && PermissionsCanDelete.includes(user?.permission)) && (
            <DeletePackageAirfareDialog id={row.original.id} />
          )}
        </div>
      )
    },
  },
];
