import { useParams } from "react-router-dom"
import TopBar from "../../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "../../../components/ui/separator";
import { fetchPurchaseRequestOrder } from "@/api/queries/purchase-request.queries";
import PurchaseRequestInfo from "@/components/section/purchase-request/info";
import Loader from "@/components/animated/Loader";
import PrintPreview from "@/components/section/purchase-request/print-preview";
import PurchaseRequestItems from "@/components/section/purchase-request/items";

export default function PurchaseRequestDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['purchase-request-details', id],
    queryFn: async () => {
      if (!id) return;
      return await fetchPurchaseRequestOrder(id)
    },
  });

  return (
    <div className="space-y-2">
      <TopBar
        showBackButton={true}
        LeftSideHeader={
          <p className="text-sm">
            Purchase request order details
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">
            Manage purchase request order details here
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
              </div>
              <Separator className="bg-slate-200" />
              <PurchaseRequestInfo data={data} />
              <PurchaseRequestItems
                isEditable={!data.approver}
                data={data.purchaseOrderItems}
                purchaseRequestId={data.id}
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
