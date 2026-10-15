"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface EventCardProps {
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  category?: string;
  created?: string;
}

const EventCard = ({
  title = "nothing",
  description = "nothing.",
  image,
  author = "nothing",
  category = "nothing",
  created,
}: EventCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-sm"
    >
      <Card className="group h-full gap-0 overflow-hidden rounded-2xl border-border p-0 transition-shadow hover:shadow-lg">
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-muted">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="h-full w-full object-contain p-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <BookOpen className="size-12" />
              <span>nothing</span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-col gap-3 p-5">
          <Badge className="w-fit rounded-full">{category}</Badge>

          <h2 className="text-lg font-bold leading-7">{title}</h2>

          <p className="text-sm text-muted-foreground">
            author: {author}
          </p>

          <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">
            {description}
          </p>

          {created && (
            <p className="text-xs text-muted-foreground">
              تاریخ ثبت: {created}
            </p>
          )}

          <Separator />

          <div className="flex items-center justify-between text-sm font-medium text-primary">
            <span>اطلاعات کتاب</span>
            <ArrowLeft className="size-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;