import { useState } from "react";
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
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { submitInquiry, resetInquiryStatus } from "@/store/slices/subscriptionSlice";
import { useEffect } from "react";

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

  const [form, setForm] = useState({
    name: user?.name || "",
    designation: "",
    company: "Stratview Research",
    email: user?.email || "",
    mobile: "",
  });

  useEffect(() => {
    if (!open) {
      dispatch(resetInquiryStatus());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (inquiryStatus === 'success' && open) {
      toast.success("Your request has been submitted. Our team will get in touch with you shortly.");
      onOpenChange(false);
      setForm({ name: user?.name || "", designation: "", company: "", email: user?.email || "", mobile: "" });
    } else if (inquiryStatus === 'failed') {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  }, [inquiryStatus, open, onOpenChange, user]);

  const submitting = inquiryStatus === 'loading';

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile) {
      toast.error("Please fill in required fields.");
      return;
    }

    if (!user?.id) {
      toast.error("You must be logged in to submit an inquiry.");
      return;
    }

    dispatch(submitInquiry({
      user_id: user.id,
      dashboard_slug: dashboardSlug,
      message: `Access Request Details for ${datasetName}: ${JSON.stringify(form)}`,
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
            <div className="space-y-2">
              <Label htmlFor="access-name">Name</Label>
              <Input
                id="access-name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-designation">Designation</Label>
              <Input
                id="access-designation"
                placeholder="Your designation"
                value={form.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-company">Company</Label>
              <Input
                id="access-company"
                placeholder="Your company name"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-email">Official Email</Label>
              <Input
                id="access-email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-mobile">Mobile Number</Label>
              <Input
                id="access-mobile"
                type="tel"
                placeholder="+1 234 567 890"
                value={form.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                maxLength={20}
              />
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
