import { fetchUsers } from "@/api/queries/user.query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  value?: string;
  onValueChange: (value: string) => void;
}
export function SelectUserPopover({value, onValueChange}: Props) {
	const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading: loadingUsers } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: async () => await fetchUsers({
      search,
    })
  });

  return (
    <Popover>
      <PopoverTrigger asChild className="bg-slate-100 border-none text-[12px]">
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {(() => {
            const selectedUser = data?.users.find((user) => user.id === value);
            return selectedUser
              ? `${selectedUser.firstName} ${selectedUser.lastName}`
              : "Select user";
          })()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <div className="px-2 pt-2">
          <div className="flex items-center gap-2 border rounded-lg px-2 h-10">
            <Search size={16}/>
            <Input
              className="text-xs border-none shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none h-fit px-1 text-[12px]"
              placeholder="Search user..." 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className="px-2 rounded-lg py-2">
          {loadingUsers ? (
            <div className="flex items-center justify-center gap-1 text-gray-500 py-2">
              <Loader2 className="animate-spin" size={14} />
              <span className="text-xs">{'Searching...'}</span>
            </div>
          ) : data?.users && data.users.length > 0 ? (
            data.users.map((user) => (
              <div
                key={user.id}
                onClick={() => onValueChange(user.id)}
                className={cn(
                  "flex items-center gap-2 p-2 h-12 text-xs cursor-pointer rounded-lg hover:bg-slate-100",
                  user.id === value
                    ? "bg-slate-100"
                    : "bg-slate-0"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                </Avatar>
                <span>
                  {`${user.firstName} ${user.lastName}`}
                </span>
                <Check
                  size={16}
                  className={cn(
                    "ml-auto",
                    user.id === value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </div>
            ))
          ) : (
            <div className="text-xs text-center text-gray-600 py-10">
              <span>Empty users</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}