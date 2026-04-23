import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Building2, Phone, Briefcase, Pencil, Save, X, Calendar, Lock, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CountrySelector } from "@/components/CountrySelector";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import DashboardHeader from "@/components/DashboardHeader";
import AppFooter from "@/components/AppFooter";
import { activeDashboardRoutes } from "@/data/dashboardRoutes";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSubscriptions, submitInquiry, resetInquiryStatus } from "@/store/slices/subscriptionSlice";
import { fetchSubCategories } from "@/store/slices/categorySlice";
import { fetchMe, updateProfile } from "@/store/slices/authSlice";
import { useEffect, useMemo } from "react";
import { COUNTRIES } from "@/config/countries";
import { parsePhone } from "@/lib/phoneUtils";

// All available dashboards for inquiry dropdown - transformed from Redux state
const generateAvailableDashboards = (subCategories: any[], subscriptions: any[]) => {
  const list: { id: string; label: string }[] = [];
  subCategories.forEach(sub => {
    sub.dashboards.forEach((db: any) => {
      const isPurchased = subscriptions.some(s => s.dashboard_slug === db.slug);
      if (!isPurchased) {
        list.push({ id: db.slug, label: `${sub.category_name} › ${sub.name} › ${db.name}` });
      }
    });
  });
  return list;
};

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get data from Redux
  const auth = useAppSelector((state: any) => state.auth);
  const user = auth.user;
  const { subscriptions, isLoading, inquiryStatus } = useAppSelector((state: any) => state.subscriptions);
  const { subCategories, isSubCategoriesLoading } = useAppSelector((state: any) => state.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    company: user?.company || "",
    designation: user?.designation || "",
  });
  const [phoneCode, setPhoneCode] = useState("+1");
  const [phoneNum, setPhoneNum] = useState("");

  const [inquiry, setInquiry] = useState({
    dashboard: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        company: user.company || "",
        designation: user.designation || "",
      });
      const { code, number } = parsePhone(user.phone_number);
      setPhoneCode(code);
      setPhoneNum(number);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      // Refresh user profile only
      dispatch(fetchMe());
      // Subscriptions and Categories are handled globally in App.tsx
    }
    return () => {
      dispatch(resetInquiryStatus());
    };
  }, [user?.id, dispatch]);

  const allDashboards = generateAvailableDashboards(subCategories, subscriptions);

  const { isUpdatingProfile } = useAppSelector((state: any) => state.auth);


  const handleSave = async () => {
    try {
      await dispatch(updateProfile({
        ...editData,
        phone_number: `${phoneCode}${phoneNum}`.trim()
      })).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error("Update failed", { description: err || "Please try again." });
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditData({
        name: user.name || "",
        company: user.company || "",
        designation: user.designation || "",
      });
      const { code, number } = parsePhone(user.phone_number);
      setPhoneCode(code);
      setPhoneNum(number);
    }
    setIsEditing(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.dashboard || !user?.id) {
      toast.error("Validation Error", { description: "Please select a dashboard" });
      return;
    }

    const fullMessage = JSON.stringify({
      name: user.name || "",
      designation: user.designation || "",
      company: user.company || "",
      email: user.email || "",
      mobile: `${phoneCode}${phoneNum}`,
      message: inquiry.message
    });

    dispatch(submitInquiry({
      user_id: user.id,
      dashboard_slug: inquiry.dashboard,
      message: `Subscription Inquiry: ${fullMessage}`,
      type: 'subscription_inquires'
    }));
  };

  const inquirySubmitted = inquiryStatus === 'success';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />

      <main className="flex-1 container max-w-4xl px-4 md:px-6 py-8 space-y-8">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Account</h1>

        {/* ─── Personal Information ─── */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUpdatingProfile}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? (
                    <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Saving...</>
                  ) : (
                    <><Save className="h-4 w-4 mr-1" /> Save</>
                  )}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4">
              <Label className="text-muted-foreground flex items-center gap-1.5 pt-2.5">
                <User className="h-4 w-4" /> Full Name
              </Label>
              {isEditing ? (
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-foreground pt-2.5 font-medium">{user?.name}</p>
              )}
            </div>

            <Separator />

            {/* Email (read-only always) */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4">
              <Label className="text-muted-foreground flex items-center gap-1.5 pt-2.5">
                <Mail className="h-4 w-4" /> Email
              </Label>
              <div className="flex items-center gap-2 pt-2.5">
                <p className="text-foreground font-medium">{user?.email}</p>
                <span title="Email cannot be changed"><Lock className="h-3.5 w-3.5 text-muted-foreground/50" /></span>
              </div>
            </div>

            <Separator />

            {/* Company */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4">
              <Label className="text-muted-foreground flex items-center gap-1.5 pt-2.5">
                <Building2 className="h-4 w-4" /> Company
              </Label>
              {isEditing ? (
                <Input
                  value={editData.company}
                  onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-foreground pt-2.5 font-medium">{user?.company || "Not Provided"}</p>
              )}
            </div>

            <Separator />

            {/* Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4">
              <Label className="text-muted-foreground flex items-center gap-1.5 pt-2.5">
                <Briefcase className="h-4 w-4" /> Designation
              </Label>
              {isEditing ? (
                <Input
                  value={editData.designation}
                  onChange={(e) => setEditData({ ...editData, designation: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-foreground pt-2.5 font-medium">{user?.designation || "Not Provided"}</p>
              )}
            </div>

            <Separator />

            {/* Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-2 sm:gap-4">
              <Label className="text-muted-foreground flex items-center gap-1.5 pt-2.5">
                <Phone className="h-4 w-4" /> Phone
              </Label>
              {isEditing ? (
                <div className="flex gap-0">
                  <CountrySelector 
                    value={phoneCode} 
                    onValueChange={setPhoneCode} 
                    className="rounded-r-none border-r-0 bg-muted/20 focus:ring-0 focus:ring-offset-0"
                  />
                  <Input 
                    type="tel" 
                    value={phoneNum} 
                    onChange={(e) => setPhoneNum(e.target.value)} 
                    placeholder="123-456-7890" 
                    className="rounded-l-none focus-visible:ring-1 h-10 flex-1"
                  />
                </div>
              ) : (
                <p className="text-foreground pt-2.5 font-medium">{user?.phone_number || "Not Provided"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ─── Your Subscriptions ─── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Your Subscriptions
            </CardTitle>
            <CardDescription>Dashboards you currently have access to</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : subscriptions.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4">You don't have any active subscriptions yet.</p>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.dashboard_id || sub.dashboard_slug}
                      onClick={() => {
                        const route = activeDashboardRoutes[sub.dashboard_slug as keyof typeof activeDashboardRoutes];
                        if (route) navigate(route);
                        else navigate(`/dataset/${sub.subcategory_slug}`);
                      }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{sub.dashboard_name}</span>
                        <span className="text-[10px] text-muted-foreground">{sub.category_name} › {sub.subcategory_name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>
                          Valid From: <span className="font-medium text-foreground">{sub.valid_from}</span>
                        </span>
                        <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">Active</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ─── Inquiry Section ─── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Need to extend a subscription or buy a new one?
            </CardTitle>
            <CardDescription>Let us know which dashboards you're interested in and we'll get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            {inquirySubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="font-semibold text-foreground">Inquiry Sent!</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Thank you for your interest. Our team will review your request and contact you shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => { setInquiry({ dashboard: "", message: "" }); dispatch(resetInquiryStatus()); }}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Profile</p>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Name</Label>
                    <Input
                      value={user?.name || ""}
                      readOnly={!!user?.name}
                      className={user?.name ? "bg-muted/50 text-foreground cursor-default" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Designation</Label>
                    <Input
                      value={user?.designation || ""}
                      readOnly={!!user?.designation}
                      placeholder="Not provided"
                      className={user?.designation ? "bg-muted/50 text-foreground cursor-default" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs">Company</Label>
                    <Input
                      value={user?.company || ""}
                      readOnly={!!user?.company}
                      placeholder="Not provided"
                      className={user?.company ? "bg-muted/50 text-foreground cursor-default" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inq-email" className="text-sm font-medium">Email *</Label>
                  <Input
                    id="inq-email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="bg-muted/50 text-foreground cursor-default"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inq-phone" className="text-sm font-medium">Phone</Label>
                  <div className="flex gap-0">
                    <CountrySelector
                      value={phoneCode}
                      onValueChange={setPhoneCode}
                      className="rounded-r-none border-r-0 bg-muted/20 focus:ring-0 focus:ring-offset-0"
                    />
                    <Input
                      id="inq-phone"
                      type="tel"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      placeholder="123-456-7890"
                      className="rounded-l-none focus-visible:ring-1 h-10 flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Which dashboard are you interested in? *</Label>
                  <Select value={inquiry.dashboard} onValueChange={(v) => setInquiry({ ...inquiry, dashboard: v })}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a dashboard..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allDashboards.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.label}</SelectItem>
                      ))}
                      {allDashboards.length === 0 && (
                        <SelectItem value="__none" disabled>You already have access to all dashboards</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Additional Details</Label>
                  <Textarea
                    placeholder="Tell us about your requirements, number of users, preferred subscription duration, etc."
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="gradient-primary text-primary-foreground">
                  <Send className="h-4 w-4 mr-2" />
                  Send Inquiry
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};

export default MyAccount;
