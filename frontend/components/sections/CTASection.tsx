import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryText: string;
  primaryLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  variant?: "default" | "gradient";
}

const CTASection = ({
  title,
  description,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
  variant = "default",
}: CTASectionProps) => {
  return (
    <section
      className={`py-16 md:py-24 ${
        variant === "gradient" ? "gradient-accent" : "bg-muted"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`mb-6 ${
              variant === "gradient" ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-lg md:text-xl mb-8 ${
              variant === "gradient"
                ? "text-primary-foreground/90"
                : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant={variant === "gradient" ? "default" : "cta"}
              size="lg"
              asChild
            >
              <Link href={primaryLink}>
                {primaryText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {secondaryText && secondaryLink && (
              <Button
                variant="outline"
                size="lg"
                className={
                  variant === "gradient"
                    ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    : ""
                }
                asChild
              >
                <Link href={secondaryLink}>{secondaryText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
