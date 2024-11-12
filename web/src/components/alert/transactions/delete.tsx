import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { deleteTransaction } from "@/api/mutations/transaction.mutation";

interface Props {
	transactionId: string;
}

export default function DeleteTransaction(props: Props) {
	const { transactionId } = props;
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (id: string) => await deleteTransaction(id),
		onSuccess() {
			toast.success("Transaction deleted successfully", {
				position: 'top-center',
				className: 'text-primary'
			});
			queryClient.refetchQueries({ queryKey: ['transactions'] });
			setOpen(false);
		},
		onError(error) {
			toast.error(error.message, {
				position: 'top-center',
				className: 'text-destructive'
			})
		}
	});

	const handleDelete = () => {
		mutate(transactionId);
	}

	return (
		<AlertDialog open={open} onOpenChange={(value) => setOpen(value)}>
			<AlertDialogTrigger>
				<Trash2 size={16} className="cursor-pointer hover:text-destructive" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this transaction agreement from our servers.
						All vouchers associated to this transaction will also be deleted.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						disabled={isPending}
					>
						Cancel
					</AlertDialogCancel>
					<Button
						className="bg-destructive gap-2"
						onClick={handleDelete}
						disabled={isPending}
					>
						{isPending &&
							<Loader2 size={18} className="animate-spin" />
						}
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

