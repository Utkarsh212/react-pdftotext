import { usePackageMetadata } from "../../hooks/usePackageMetadata";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTag,
  faStar,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "../../lib/utils";

export function Stats() {
  const { downloads, version, stars, license, loading } = usePackageMetadata();

  const items = [
    {
      label: "Weekly Downloads",
      value: downloads?.toLocaleString(),
      icon: faDownload,
      delay: "delay-0",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Latest Version",
      value: version ? `v${version}` : null,
      icon: faTag,
      delay: "delay-100",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "GitHub Stars",
      value: stars?.toLocaleString(),
      icon: faStar,
      delay: "delay-200",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "License",
      value: license,
      icon: faScaleBalanced,
      delay: "delay-300",
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 max-w-screen-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <Card
            key={idx}
            className={cn(
              "border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up group bg-white",
              item.delay
            )}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className={cn("p-3 rounded-full mb-2", item.bg)}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={cn("h-6 w-6", item.color)}
                />
              </div>

              {loading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <h3 className="text-3xl font-bold tracking-tight text-slate-800">
                  {item.value || "-"}
                </h3>
              )}
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {item.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
