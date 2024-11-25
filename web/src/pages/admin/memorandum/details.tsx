import { useParams } from "react-router-dom"
import TopBar from "../../../components/section/topbar";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/animated/Loader";
import { fetchMemorandum } from "@/api/queries/memorandums.query";
import MemorandumPreview from "@/components/section/memorandums/details";
import { XCircle } from "lucide-react";


export default function MemorandumDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['memorandum-details', id],
    queryFn: async () => {
      if (!id) return;
      return await fetchMemorandum(id)
    },
  });

  return (
    <div className="space-y-2">
      <TopBar
        showBackButton={true}
        LeftSideHeader={
          <p className="text-sm">
            Memorandum {data?.memorandumNumber}
          </p>
        }
        LeftSideSubHeader={
          <p className="text-primary text-xs">
            Manage memorandum details here
          </p>
        }
      />
      <div className="w-full flex gap-x-2 rounded-lg justify-center items-center">
        <Loader isLoading={isLoading} />
        {data && (
          <>
            <MemorandumPreview data={data} />
          </>
        )}
        {error && (
          <div className="h-[90vh] bg-white w-full rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2">
              <XCircle className="text-destructive"/>
              <p>{error.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
