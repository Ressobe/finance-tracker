import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

export function CreateCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger>Create a new category</DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function CategoryForm() {
  return <div>category</div>;
}
