import { useParams } from "react-router-dom"
import TopBar from "../../../components/section/topbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "../../../components/ui/separator";
import PrintPreview from "../../../components/section/sales-agreement/print-preview";
import SalesAgreementInfo from "../../../components/section/sales-agreement/info";
import SalesAgreementItems from "../../../components/section/sales-agreement/items";
import EditSalesAgreementDialog from "../../../components/dialogs/sales-agreement/edit";
import { fetchSalesAgreement } from "@/api/queries/sales-agreements.queries";
import Loader from "@/components/animated/Loader";
import { useAuth } from "@/providers/auth-provider";
import Constants from "@/constants";
import PurchaseRequestInfo from "@/components/section/purchase-request/info";
import { updateSalesAgreementStatus } from "@/api/mutations/sales-agreement.mutation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SalesAgreementDetails() {
  const { id } = useParams();
  const { session: { user } } = useAuth();
  const { PermissionsCanEdit } = Constants;

  const { data, isLoading } = useQuery({
    queryKey: ['sales-agreement-details', id],
    queryFn: async () => {
      if (!id) return;
      return await fetchSalesAgreement(id)
    },
  });

  const queryClient = useQueryClient();

  const { mutate: updateStatusMutate, isPending: isStatusUpdating } = useMutation({
    mutationFn: updateSalesAgreementStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales-agreement-details", id] });
      toast.success("Sales agreement status updated successfully", {
        position: "top-center",
        className: "text-primary"
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: "top-center",
        className: "text-destructive"
      });
    }
  });


  return (
    <div className="space-y-2">
      <TopBar
        showBackButton={true}
        LeftSideHeader={
          <p className="text-sm">
            Sales agreement details
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">
            Manage sales agreement details here
          </p>
        }
      />
      <div className="w-full flex gap-x-2 rounded-lg">
        <Loader isLoading={isLoading} />
        {data ? (
          <>
            <section className="w-full bg-white rounded-lg">
              <div className="h-[50px] flex px-4 justify-between items-center">
                <h1 className="text-[12px] font-semibold">
                  Details
                </h1>
                {(user?.permission && PermissionsCanEdit.includes(user?.permission)) && (
                  <EditSalesAgreementDialog data={data} />
                )}
              </div>
              <Separator className="bg-slate-200" />
              {data && user?.permission && PermissionsCanEdit.includes(user.permission) && (
                <div className="flex justify-end items-center gap-2 mt-2">
                  <label className="text-xs font-medium">Status:</label>
                  <Select
                    value={data.status}
                    onValueChange={(status) => {
                      updateStatusMutate({ id: String(id), status: status as "ACTIVE" | "VOID" });
                    }}
                    disabled={isStatusUpdating}
                  >
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                      <SelectItem value="VOID">VOID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <SalesAgreementInfo data={data} />
              {data.purchaseRequestOrders.length !== 0 &&
                <div className="p-4 border rounded-lg">
                  <h1 className="text-[12px] font-semibold">Purchase Requests Attached</h1>
                  {
                    data.purchaseRequestOrders.map((po, index) => (
                      <>
                        <a
                          href={`${window.location.origin}/admin/purchase-requests/${po.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 underline hover:text-blue-800"
                        >
                          View Purchase Request ({po.serialNumber})
                        </a>
                        <PurchaseRequestInfo data={po} key={index} />
                      </>
                    ))
                  }
                </div>}
              <SalesAgreementItems
                data={data.salesAgreementItems}
                salesAgreementId={data.id}
              />
            </section>
            <PrintPreview data={data} />
          </>
        ) : (
          <div className="h-[90vh] bg-white w-full rounded-lg" />
        )}
      </div>
    </div>
  )
}
