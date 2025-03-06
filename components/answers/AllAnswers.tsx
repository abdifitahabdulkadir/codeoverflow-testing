import React from "react";

import { AnswerFilters } from "@/constants/filters";
import { EMPTY_ANSWERS } from "@/constants/states";

import AnswerCard from "../cards/AnswerCard";
import DataRenderer from "../DataRenderer";
import CommonFilter from "../filters/CommonFilter";

interface Props extends ActionResponse<Answer[]> {
  totalAnswers: number;
}

const AllAnswers = ({ data, success, error, totalAnswers }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-36"
          containerClasses="max-xs:w-full"
        />
      </div>

      <DataRenderer
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(data) => (
          <>
            {data.map((answer) => (
              <AnswerCard key={answer._id} {...answer} />
            ))}
          </>
        )}
      />

      <p>Pagination</p>
    </div>
  );
};

export default AllAnswers;
