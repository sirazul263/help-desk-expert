import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { FaRegClock } from "react-icons/fa";
import { motion } from "framer-motion";
import CustomerMain from "./CustomerMain";
import { getCurrentTimeWithZone } from "@/lib/utils";

const CalendarMain = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const timeSlots = [
    "5:30am-6:00am",
    "6:00am-6:30am",
    "9:00am-9:30am",
    "10:00am-10:30am",
    "5:30pm-6:00pm",
    "6:00pm-6:30pm",
    "10:00pm-10:30pm",
    "11:00pm-11:30pm",
  ];

  const [loadingTime, setLoadingTime] = useState<string | null>(null);
  const handleTimeClick = (time: string) => {
    setLoadingTime(time);

    // Simulate async action (like API call)
    setTimeout(() => {
      setSelectedTime(time);
      setLoadingTime(null);
    }, 500); // replace with your actual async call
  };

  return (
    <div className="p-10 xl:px-20 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg flex  w-full overflow-hidden">
        {showCalendar ? (
          <>
            {/* Left info panel */}
            <div className="w-2/5 p-8 border-r">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold ">
                  HDX
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-600">
                    Sales Team
                  </p>
                  <h2 className="font-bold text-xl leading-6">
                    Web - HelpDeskXpert <br /> Intro Call
                  </h2>
                </div>
              </div>
              <p className="text-gray-600 flex items-center mb-3 text-sm font-semibold">
                <FaRegClock size={20} className="mr-2" /> 30 Min
              </p>
              <p className="text-gray-700 text-sm">
                Book a time to learn more about what we do here at HelpDeskXpert
                to see how we can help you with your customer service needs.
              </p>
            </div>
            {/* Right calendar panel */}
            <div className="p-8 w-3/5">
              <h3 className="font-bold text-xl mb-4">Select a Date & Time</h3>
              <div className="grid md:grid-cols-[7fr_5fr]">
                <div className="w-full">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md w-full"
                    classNames={{ root: "w-full" }}
                  />
                  <p className="mt-6 text-gray-500 text-sm">
                    Time zone:{" "}
                    <span className="font-medium">
                      {getCurrentTimeWithZone()}
                    </span>
                  </p>
                </div>
                <div className="md:ml-15 flex flex-col gap-2">
                  <p className="mb-4 font-semibold">
                    {format(selectedDate || new Date(), "EEEE, MMMM y")}
                  </p>
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      const isLoading = loadingTime === time;

                      return (
                        <motion.div
                          key={time}
                          className="flex gap-2 items-center mb-3"
                          layout
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <motion.button
                            className={`
            btn border border-primary text-primary font-bold rounded-lg py-3 px-4 hover:border-2
            ${isSelected && !isLoading ? "bg-primary text-white" : ""}
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
                            style={{ flex: isSelected ? 0.5 : 1 }} // shrink only selected
                            onClick={() => handleTimeClick(time)}
                            disabled={isLoading}
                            layout
                          >
                            {isLoading ? (
                              <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                <motion.span
                                  className="w-4 h-4 border-2 border-t-transparent border-white rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: "linear",
                                  }}
                                />
                                Loading...
                              </motion.div>
                            ) : (
                              time.split("-")[0]
                            )}
                          </motion.button>

                          {/* Next button */}
                          {isSelected && !isLoading && (
                            <motion.button
                              className="btn border border-primary text-primary font-bold rounded-lg py-3 px-2 flex-1"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              onClick={() => setShowCalendar(false)}
                            >
                              Next
                            </motion.button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <CustomerMain
            setShowCalendar={setShowCalendar}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        )}
      </div>
    </div>
  );
};
export default CalendarMain;
