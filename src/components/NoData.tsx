import { SearchX, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoDataFoundProps {
  message?: string;
  subMessage?: string;
  onRefresh?: () => void;
}

const NoData = ({
  message = "No Events Found",
  subMessage = "We couldn't find any events matching your criteria",
  onRefresh,
}: NoDataFoundProps) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center bg-purple-50 rounded-lg border-2 border-dashed border-purple-200">
      <div className="relative">
        {/* Main icon with background */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
          <SearchX size={40} className="text-purple-600" />
        </div>

        {/* Decorative calendar icon */}
        <div
          className="absolute -right-4 -top-2 bg-purple-100 p-2 rounded-lg shadow-sm border border-purple-200 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <Calendar size={20} className="text-purple-700" />
        </div>
      </div>

      {/* Message */}
      <h3 className="mt-6 text-xl font-bold text-purple-900">{message}</h3>
      <p className="mt-2 text-purple-600 max-w-sm text-center">{subMessage}</p>

      {/* Action buttons */}
      <div className="mt-8 flex gap-4">
        {onRefresh && (
          <Button
            onClick={onRefresh}
            variant="outline"
            className="flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
        )}

        <Button
          variant="default"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Browse All Events
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="mt-8 w-full max-w-xs flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-purple-300" />
        ))}
      </div>

      {/* Ticket-shaped decorative elements */}
      <div className="absolute opacity-10">
        {[...Array(3)].map((_, i) => {
          const size = 80 + i * 40;
          const rotation = i * 15 - 15;
          return (
            <div
              key={i}
              className="absolute border-2 border-purple-500 rounded-lg"
              style={{
                width: `${size}px`,
                height: `${size * 0.6}px`,
                transform: `rotate(${rotation}deg)`,
                left: `calc(50% - ${size / 2}px)`,
                top: `calc(50% - ${size * 0.3}px)`,
              }}
            >
              {/* Ticket notches */}
              <div className="absolute left-1/4 w-3 h-3 bg-purple-50 rounded-full -translate-y-1/2"></div>
              <div className="absolute left-1/4 w-3 h-3 bg-purple-50 rounded-full bottom-0 translate-y-1/2"></div>
              <div className="absolute right-1/4 w-3 h-3 bg-purple-50 rounded-full -translate-y-1/2"></div>
              <div className="absolute right-1/4 w-3 h-3 bg-purple-50 rounded-full bottom-0 translate-y-1/2"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoData;
