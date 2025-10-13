import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ClassFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
}

const subjects = [
  "All Subjects",
  "Mathematics",
  "Science",
  "Computer Science",
  "Languages",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
];

export const ClassFilters = ({
  searchQuery,
  setSearchQuery,
  selectedSubject,
  setSelectedSubject,
}: ClassFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Label htmlFor="search" className="sr-only">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="w-full sm:w-[200px]">
        <Label htmlFor="subject" className="sr-only">Subject</Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger id="subject">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
