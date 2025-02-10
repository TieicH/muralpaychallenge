import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export const DetailItem = ({
  title,
  value,
  copyValue,
}: {
  title: string;
  value: string;
  copyValue?: string;
}) => {
  const { toast } = useToast();

  const onCopied = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      duration: 1000,
      variant: "success",
      title: "Copied to clipboard!",
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-sm">{value}</p>
      </div>
      <Copy
        className="cursor-pointer"
        onClick={() => {
          onCopied(copyValue || value);
        }}
        size={20}
      />
    </div>
  );
};
