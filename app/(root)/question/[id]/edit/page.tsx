import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestion } from "@/lib/actions/question.action";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) notFound();

  const session = await auth();
  if (!session) redirect("/sign-in");

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success) notFound();

  if (question?.author.toString() !== session?.user?.id)
    redirect(`/question/${id}`);

  return (
    <main>
      <QuestionForm question={question} isEdit />
    </main>
  );
};

export default Page;
