"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { formatNumber } from "@/lib/utils";

interface Params {
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
}

const Votes = ({ upvotes, hasupVoted, downvotes, hasdownVoted }: Params) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const showLoginToast = () => {
    toast({
      title: "Please log in",
      description: "You must be logged in to perform this action",
    });
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) return showLoginToast();

    setIsLoading(true);

    try {
      // call vote action

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasupVoted ? "Successful" : "Removed"}`
          : `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`;

      toast({
        title: successMessage,
        variant:
          (voteType === "upvote" && hasupVoted) ||
          (voteType === "downvote" && hasdownVoted)
            ? "destructive"
            : "default",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={hasupVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("upvote")}
          aria-label="Upvote"
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={hasdownVoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("downvote")}
          aria-label="Downvote"
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
