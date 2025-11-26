import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MpesaPaymentDialogProps {
  vehicleId: number;
  vehicleName: string;
  vehiclePrice: number;
}

export const MpesaPaymentDialog = ({
  vehicleId,
  vehicleName,
  vehiclePrice,
}: MpesaPaymentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [downPayment, setDownPayment] = useState("");
  const [months, setMonths] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const minDownPayment = vehiclePrice * 0.5;

  const calculateMonthlyPayment = () => {
    const down = parseFloat(downPayment) || 0;
    const remaining = vehiclePrice - down;
    const monthsNum = parseInt(months) || 1;
    return remaining / monthsNum;
  };

  const calculateMonthlyPercentage = () => {
    const monthly = calculateMonthlyPayment();
    return (monthly / vehiclePrice) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const down = parseFloat(downPayment);
    if (down < minDownPayment) {
      toast({
        title: "Invalid down payment",
        description: `Down payment must be at least 50% (KES ${minDownPayment.toLocaleString()})`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const monthsNum = parseInt(months);
      const remaining = vehiclePrice - down;
      const monthly = remaining / monthsNum;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to continue with payment",
          variant: "destructive",
        });
        return;
      }

      // Create installment plan
      const { data: plan, error: planError } = await supabase
        .from("installment_plans")
        .insert({
          user_id: user.id,
          vehicle_id: vehicleId.toString(),
          vehicle_name: vehicleName,
          total_amount: vehiclePrice,
          down_payment: down,
          remaining_amount: remaining,
          monthly_payment: monthly,
          number_of_months: monthsNum,
        })
        .select()
        .single();

      if (planError) throw planError;

      // Create first payment (down payment)
      const { error: paymentError } = await supabase
        .from("installment_payments")
        .insert({
          user_id: user.id,
          installment_plan_id: plan.id,
          amount: down,
          phone_number: phoneNumber,
          status: "pending",
        });

      if (paymentError) throw paymentError;

      toast({
        title: "Payment initiated",
        description: "Please check your phone for the M-Pesa prompt",
      });

      setOpen(false);
      resetForm();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDownPayment("");
    setMonths("");
    setPhoneNumber("");
  };

  const monthlyPayment = calculateMonthlyPayment();
  const downPaymentNum = parseFloat(downPayment) || 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2" variant="default">
          <Smartphone className="h-5 w-5" />
          Pay with M-Pesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>M-Pesa Installment Payment</DialogTitle>
          <DialogDescription>
            Set up an installment plan for {vehicleName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="downPayment">
                Down Payment (Minimum 50% - KES {minDownPayment.toLocaleString()})
              </Label>
              <Input
                id="downPayment"
                type="number"
                placeholder="Enter down payment"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                min={minDownPayment}
                max={vehiclePrice}
                required
              />
              {downPayment && parseFloat(downPayment) < minDownPayment && (
                <p className="text-sm text-destructive">
                  Down payment must be at least 50% (KES {minDownPayment.toLocaleString()})
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="months">Installment Period</Label>
              <Select value={months} onValueChange={setMonths} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="18">18 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="254XXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {downPayment && months && (
              <Card className="bg-muted">
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vehicle Price:</span>
                      <span className="font-semibold">KES {vehiclePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Down Payment:</span>
                      <span className="font-semibold">
                        KES {downPaymentNum.toLocaleString()} ({((downPaymentNum / vehiclePrice) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="font-semibold">
                        KES {(vehiclePrice - downPaymentNum).toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Payment:</span>
                        <span className="font-bold text-primary">
                          KES {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({calculateMonthlyPercentage().toFixed(1)}% of total)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Processing..." : "Initiate Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
