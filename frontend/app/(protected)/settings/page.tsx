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

export default function SettingsPage() {
  return (
    <section className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <span className="text-muted-foreground">
          Manage your account settings and categories
        </span>
      </div>
      <CurrencyCard />
      <CategoriesCard />
    </section>
  );
}

function CategoriesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Add, edit or remove your categories for transactions
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

function CurrencyCard() {
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
