import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CountrySelector } from "@/components/CountrySelector";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { submitInquiry, resetInquiryStatus } from "@/store/slices/subscriptionSlice";
import { parsePhone } from "@/lib/phoneUtils";

interface AccessRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  datasetName: string;
  dashboardSlug: string;
}

const AccessRequestDialog = ({ open, onOpenChange, datasetName, dashboardSlug }: AccessRequestDialogProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state.auth);
  const { inquiryStatus } = useAppSelector((state: any) => state.subscriptions);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNum, setPhoneNum] = useState("");

  // Re-sync from profile each time the dialog opens
  useEffect(() => {
    if (open) {
      setName(user?.name || "");
      setDesignation(user?.designation || "");
      setCompany(user?.company || "");
      setEmail(user?.email || "");
      const { code, number } = parsePhone(user?.phone_number);
      setPhoneCode(code);
      setPhoneNum(number);
      dispatch(resetInquiryStatus());
    }
  }, [open, user, dispatch]);

  useEffect(() => {
    if (inquiryStatus === 'success' && open) {
      toast.success("Your request has been submitted. Our team will get in touch with you shortly.");
      onOpenChange(false);
    } else if (inquiryStatus === 'failed') {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  }, [inquiryStatus, open, onOpenChange]);

  const submitting = inquiryStatus === 'loading';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNum) {
      toast.error("Please fill in required fields.");
      return;
    }

    if (!user?.id) {
      toast.error("You must be logged in to submit an inquiry.");
      return;
    }

    const formDetails = {
      name,
      designation,
      company,
      email,
      mobile: `${phoneCode}${phoneNum}`,
    };

    dispatch(submitInquiry({
      user_id: user.id,
      dashboard_slug: dashboardSlug,
      message: `Access Request Details for ${datasetName}: ${JSON.stringify(formDetails)}`,
      type: 'access_request'
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[95vh] p-0 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 pt-8">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <DialogTitle>Access Required</DialogTitle>
            </div>
            <DialogDescription>
              You haven't purchased the <span className="font-medium text-foreground">{datasetName}</span> dataset. Please fill this form and our team will get in touch with you for providing access to the dashboard.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Profile</p>
              <div className="space-y-2">
                <Label htmlFor="access-name" className="text-muted-foreground text-xs">Name</Label>
                <Input
                  id="access-name"
                  placeholder="Your full name"
                  value={name}
                  readOnly={!!user?.name}
                  onChange={(e) => setName(e.target.value)}
                  className={user?.name ? "bg-muted/50 text-foreground cursor-default" : ""}
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="access-designation" className="text-muted-foreground text-xs">Designation</Label>
                <Input
                  id="access-designation"
                  placeholder="Your designation"
                  value={designation}
                  readOnly={!!user?.designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className={user?.designation ? "bg-muted/50 text-foreground cursor-default" : ""}
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="access-company" className="text-muted-foreground text-xs">Company</Label>
                <Input
                  id="access-company"
                  placeholder="Your company name"
                  value={company}
                  readOnly={!!user?.company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={user?.company ? "bg-muted/50 text-foreground cursor-default" : ""}
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="access-email" className="text-foreground text-sm">Official Email *</Label>
              <Input
                id="access-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-mobile" className="text-foreground text-sm">Mobile Number *</Label>
              <div className="flex gap-0">
                <CountrySelector
                  value={phoneCode}
                  onValueChange={setPhoneCode}
                  className="rounded-r-none border-r-0 bg-muted/20 focus:ring-0 focus:ring-offset-0"
                />
                <Input
                  id="access-mobile"
                  type="tel"
                  placeholder="123-456-7890"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  maxLength={20}
                  className="rounded-l-none focus-visible:ring-1"
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessRequestDialog;
