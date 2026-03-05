import { Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const SOSButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    const timer = setTimeout(() => {
      setIsActive(true);
      triggerSOS();
    }, 1500);
    setHoldTimer(timer);
  };

  const handleEnd = () => {
    if (holdTimer) clearTimeout(holdTimer);
    if (!isActive) {
      toast.info("Hold for 1.5 seconds to trigger SOS");
    }
  };

  const triggerSOS = () => {
    toast.error("🚨 SOS Alert Activated!", {
      description: "Sending your location to emergency contacts...",
      duration: 5000,
    });
    // In production: send location, voice recording, alerts
  };

  const stopSOS = () => {
    setIsActive(false);
    toast.success("SOS Alert Stopped");
  };

  return (
    <>
      <motion.button
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className="fixed bottom-20 right-4 z-50 w-16 h-16 rounded-full gradient-sos shadow-sos flex items-center justify-center"
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={isActive ? { repeat: Infinity, duration: 1 } : {}}
        whileTap={{ scale: 0.9 }}
      >
        <Phone size={28} className="text-destructive-foreground" />
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-destructive/95 flex flex-col items-center justify-center gap-6 p-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-32 h-32 rounded-full bg-destructive-foreground/20 flex items-center justify-center"
            >
              <Phone size={56} className="text-destructive-foreground" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-destructive-foreground">
              SOS ACTIVE
            </h2>
            <p className="text-destructive-foreground/80 text-center text-lg">
              Sending location & alerts to emergency contacts
            </p>
            <button
              onClick={stopSOS}
              className="mt-4 px-8 py-3 bg-destructive-foreground text-destructive font-bold rounded-full text-lg"
            >
              STOP SOS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
