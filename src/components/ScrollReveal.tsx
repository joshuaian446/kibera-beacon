import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: ReactNode;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";
    delay?: number;
    duration?: number;
    className?: string;
    threshold?: number;
    once?: boolean;
}

const ScrollReveal = ({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 600,
    className,
    threshold = 0.1,
    once = true,
}: ScrollRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (once) observer.unobserve(entry.target);
                    } else if (!once) {
                        setIsVisible(false);
                    }
                });
            },
            { threshold }
        );

        const current = domRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [threshold, once]);

    const getAnimationClass = () => {
        switch (animation) {
            case "fade-up":
                return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
            case "fade-in":
                return isVisible ? "opacity-100" : "opacity-0";
            case "slide-left":
                return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
            case "slide-right":
                return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8";
            case "scale-up":
                return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
            default:
                return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
        }
    };

    return (
        <div
            ref={domRef}
            className={cn(
                "transition-all ease-out",
                getAnimationClass(),
                className
            )}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
