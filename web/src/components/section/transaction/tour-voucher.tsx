import { useState } from "react";
import { Separator } from "../../ui/separator";
import { format } from "date-fns";
import { Button } from "../../ui/button";
import { Pencil } from "lucide-react";
import { ITourVoucher, IItinerary } from "../../../interfaces/tour.interface";
import { EditTourVoucherDialog } from "../../dialogs/transaction/tour-voucher/edit";
import { AddTourItineraryDialog } from "../../dialogs/transaction/tour-itinerary/add";
import { EditTourItineraryDialog } from "../../dialogs/transaction/tour-itinerary/edit";
import DeleteTour from "@/components/alert/transactions/tour/delete";
import DeleteItinerary from "@/components/alert/transactions/itinerary/delete-itinerary";

interface ITourVoucherProps {
  tourVoucher: ITourVoucher[];
}

export default function TourVoucher({ tourVoucher }: ITourVoucherProps) {
  const [tour, setTour] = useState<ITourVoucher>();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState<IItinerary>();
  const [openEditItineraryDialog, setOpenEditItineraryDialog] = useState(false);
  const [openAddItineraryDialog, setOpenAddItineraryDialog] = useState(false);

  function handleEditTour(selectedTour: ITourVoucher) {
    setOpenEditDialog(true);
    setTour(selectedTour);
  }

  function handleAddItinerary(selectedTour: ITourVoucher) {
    setOpenAddItineraryDialog(true);
    setTour(selectedTour);
  }

  function handleEditItinerary(itinerary: IItinerary) {
    setSelectedItinerary(itinerary);
    setOpenEditItineraryDialog(true);
  }

  return (
    <div className="flex flex-col gap-y-6 p-4 sm:p-6 lg:p-0 mt-2 bg-white rounded-lg">
      {tourVoucher.map((voucher, index) => (
        <div key={index} className="border-2 border-dotted p-4 mb-2">
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm font-semibold">Tour #{index + 1}</p>
            <div className="flex flex-row gap-x-2 items-center ">
              <Button size="icon" variant="ghost" className="text-xs gap-x-2" onClick={() => handleEditTour(voucher)}>
                <Pencil size={14} />
              </Button>
              <DeleteTour id={String(voucher?.id)} />
            </div>
          </div>

          <Separator className="my-2" />

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-xs font-medium">Tour Guide:</p>
              <p className="text-xs text-gray-700">{voucher.tourGuide}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-xs font-medium">Tour Guide Contact:</p>
              <p className="text-xs text-gray-700">{voucher.tourContact}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-xs font-medium">Driver Name:</p>
              <p className="text-xs text-gray-700">{voucher.driverName}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-xs font-medium">Driver Contact:</p>
              <p className="text-xs text-gray-700">{voucher.driverContact}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <p className="text-xs font-medium">Remarks:</p>
              <p className="text-xs text-gray-700">{voucher.remarks ?? "N/A"}</p>
            </div>
          </div>
          <Separator className="my-6" />

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold">Itineraries</h2>
              <Button variant="outline" className="text-xs" onClick={() => handleAddItinerary(voucher)}>
                Add Itinerary
              </Button>
            </div>
            {voucher.itineraries?.map((itinerary, idx) => (
              <div key={idx} className="space-y-4 border-2 rounded-xl p-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs text-primary font-semibold">Itinerary #{index + 1}</p>
                  <div className="flex flex-row gap-x-2 items-center ">
                    <Button size="icon" variant="ghost" className="text-xs gap-x-2" onClick={() => handleEditItinerary(itinerary)}>
                      <Pencil size={14} />
                    </Button>
                    <DeleteItinerary id={String(itinerary?.id)} type="tour" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <p className="text-xs font-medium">Title:</p>
                    <p className="text-xs text-gray-700">{itinerary.title ?? "N/A"}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <p className="text-xs font-medium">Description:</p>
                    <p className="text-xs text-gray-700">{itinerary.description ?? "N/A"}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <p className="text-xs font-medium">Start Date:</p>
                    <p className="text-xs text-gray-700">{format(new Date(itinerary.startDate), "MMMM d, yyyy")}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <p className="text-xs font-medium">End Date:</p>
                    <p className="text-xs text-gray-700">{format(new Date(itinerary.endDate), "MMMM d, yyyy")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {index < tourVoucher.length - 1 && <Separator className="my-6" />}
        </div>
      ))}

      {tour && (
        <EditTourVoucherDialog
          selectedTour={tour}
          setOpenDialog={setOpenEditDialog}
          openDialog={openEditDialog}
        />
      )}

      {selectedItinerary && (
        <EditTourItineraryDialog
          itinerary={selectedItinerary}
          setOpenDialog={setOpenEditItineraryDialog}
          openDialog={openEditItineraryDialog}
        />
      )}

      {openAddItineraryDialog && (
        <AddTourItineraryDialog
          setOpenDialog={setOpenAddItineraryDialog}
          openDialog={openAddItineraryDialog}
          tourId={tour?.id}
        />
      )}
    </div>
  );
}
