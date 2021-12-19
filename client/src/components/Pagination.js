/* eslint-disable no-unused-vars */
import React from "react";
import { Pagination as Pag, Form, Container, Row, Col } from "react-bootstrap";

const Pagination = (props) => {
  const { currentPage, pageSize, setPageSize, goToPage, totalSize } = props;

  const totalPages = Math.ceil(totalSize / pageSize);
  const shouldShowPrevious = currentPage > 0;
  const shouldShowNext = currentPage < totalPages - 1;

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
        p === currentPage && Number.isFinite(parseInt(p, 10))
          ? "text-red-700"
          : ""
      }`.trim(),
    }));

  // eslint-disable-next-line no-use-before-define
  appendTextLabelsToArray(pages, currentPage, spreadAmount, totalPages - 1, {
    shouldShowPrevious,
    shouldShowNext,
  });

  return (
    <Row className="pag">
      <Col>
        <Pag>
          {pages.map((i) => (
            <Pag.Item
              href="/"
              key={`pagination-${i.text}-${i.to}`}
              className={`${i.class} px-10`.trim()}
              onClick={(e) => {
                e.preventDefault();
                goToPage(i.to);
              }}
              aria-label={`go to page ${i.to}`}
            >
              {i.text}
            </Pag.Item>
          ))}
        </Pag>
      </Col>
      <Col>
        <Form.Group className="block">
          <Form.Label>Results per page</Form.Label>
          <Form.Control
            type="number"
            step="5"
            min="5"
            max="20"
            title="Results per page"
            value={pageSize}
            onChange={(e) => {
              e.preventDefault();
              setPageSize(e.target.value - 0);
            }}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

const appendTextLabelsToArray = (
  pages,
  pageNum,
  pageSpread,
  lastPage,
  data
) => {
  const paginationTextClass = "px-10";
  if (pageNum - pageSpread > 0 || pages[0].to === 0) {
    pages.unshift({ to: 0, text: "First", class: paginationTextClass });
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
