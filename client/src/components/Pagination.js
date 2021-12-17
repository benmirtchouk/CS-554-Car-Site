/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Pagination = (props) => {
  const { currentPage, pageSize, goToPage, totalSize } = props;

  const totalPages = Math.ceil(totalSize / pageSize);
  const shouldShowPrevious = currentPage > 0;
  const shouldShowNext = currentPage <= totalPages;

  const makeButton = (targetPage, label, className) => (
    <button
      type="button"
      key={`pagination-${label}-${targetPage}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        goToPage(targetPage);
      }}
    >
      {label}
    </button>
  );

  const spreadAmount = 2;
  const pages = Array.from(
    { length: 5 },
    (_v, i) => currentPage - spreadAmount + i
  )
    .filter((p) => p >= 0 && p < totalPages)
    .map((p) => ({
      to: p,
      text: p + 1,
      class: `${
        p === currentPage && parseInt(p, 10) ? "text-red-700" : ""
      }`.trim(),
    }));

  // eslint-disable-next-line no-use-before-define
  appendTextLabelsToArray(pages, currentPage, spreadAmount, totalPages - 1, {
    shouldShowPrevious,
    shouldShowNext,
  });

  const links = pages.map((i) =>
    makeButton(i.to, i.text, `${i.class} px-10`.trim())
  );

  return <div className="flex content-center">{links}</div>;
};

const appendTextLabelsToArray = (
  pages,
  pageNum,
  pageSpread,
  lastPage,
  data
) => {
  const paginationTextClass = "px-10";
  if (pageNum - pageSpread > 0) {
    pages.unshift({ to: 0, text: "First", class: paginationTextClass });
  } else if (pages[0].to === 0) {
    // eslint-disable-next-line no-param-reassign
    pages[0].text = "First";
  }
  if (data.shouldShowPrevious) {
    pages.unshift({
      to: pageNum - 1,
      text: "Prev",
      class: paginationTextClass,
    });
  }

  if (pageNum + pageSpread < lastPage) {
    pages.push({ to: lastPage, text: "Last", class: paginationTextClass });
  }

  if (data.shouldShowNext) {
    pages.push({ to: pageNum + 1, text: "Next", class: paginationTextClass });
  }
};

export default Pagination;
