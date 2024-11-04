import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CurrencyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Currency</CardTitle>
        <CardDescription>
          Select your default currency for your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button>Update</Button>
      </CardContent>
    </Card>
  );
}
