import { updatePackageStatus } from '@/api/mutations/package.mutation'
import CreatePackageAccommodationDialog from '@/components/dialogs/package/create-accommodation'
import CreatePackageAirfareDialog from '@/components/dialogs/package/create-airfare'
import { Columns as AccommodationColumns } from '@/components/tables/package-accommodation/columns'
import { DataTable as AccommodationDataTable } from '@/components/tables/package-accommodation/data-table'
import { Columns as AirfareColumns } from '@/components/tables/package-airfare/columns'
import { DataTable as AirfareDataTable } from '@/components/tables/package-airfare/data-table'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import Constants from '@/constants'
import { IPackage, IUpdatePackageStatus } from '@/interfaces/package.interface'
import { useAuth } from '@/providers/auth-provider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  data: IPackage
}

export default function PackageInfo({ data }: Props) {
  const { session: { user } } = useAuth()
  const queryClient = useQueryClient()

  const { mutate: updateStatusMutate, isPending } = useMutation({
    mutationFn: async (payload: IUpdatePackageStatus) => await updatePackageStatus(payload),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['packages'] })
      queryClient.refetchQueries({ queryKey: ['package-details'] })
      toast.success('Status updated successfully', {
        position: 'top-center',
        className: 'text-primary',
      })
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: 'top-center',
        className: 'text-destructive',
      })
    },
  })
  const canEditStatus = user?.permission && Constants.PermissionsCanEdit.includes(user.permission)

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">Package name</span>
          <h3 className="text-[12px]">{data.name}</h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">Package no.</span>
          <h3 className="text-[12px]">{data.packageNumber}</h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">Remarks</span>
          <h3 className="text-[12px]">{data.remarks}</h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">Creator</span>
          <h3 className="text-[12px]">{`${data.creator?.firstName} ${data.creator?.lastName}`}</h3>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-[10px]">Approved by</span>
          <h3 className="text-[12px]">{`${data.approver?.firstName || ''} ${data.approver?.lastName || ''}`}</h3>
        </div>

        {canEditStatus && (
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-[10px]">Status</span>
            <Select
              onValueChange={(value) => {
                updateStatusMutate({ id: data.id, status: value as 'ACTIVE' | 'VOID' })
              }}
              defaultValue={data.status}
              disabled={isPending}
            >
              <SelectTrigger className="w-[120px] text-[12px] h-8">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="VOID">VOID</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Separator className="bg-slate-200" />

      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="space-y-1">
          <h1 className="text-[12px] font-semibold">Inclusions</h1>
          <div className="space-y-1 text-muted-foreground">
            {data.inclusions.map((item, index) => (
              <div key={index} className="text-[12px] flex gap-2">
                <CheckCircle size={16} color="#045C2B" />
                <span className="flex-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-[12px] font-semibold">Exclusions</h1>
          <div className="space-y-1 text-muted-foreground">
            {data.exclusions.map((item, index) => (
              <div key={index} className="text-[12px] flex gap-2">
                <XCircle size={16} />
                <span className="flex-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[12px] font-semibold">Accommodation</h1>
          {<CreatePackageAccommodationDialog packageId={data.id ?? ''} />}
        </div>
        <AccommodationDataTable columns={AccommodationColumns} data={data.accommodations ?? []} />
      </div>

      <Separator className="bg-slate-200" />

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[12px] font-semibold">Airfare</h1>
          {<CreatePackageAirfareDialog packageId={data.id ?? ''} />}
        </div>
        <AirfareDataTable columns={AirfareColumns} data={data.airfares ?? []} />
      </div>
    </>
  )
}
