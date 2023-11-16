import React from 'react'

export default function Pagination({ pagination, changPage }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className={`page-link
                  ${pagination.has_pre ? '' : 'disabled'}
                 `}
            onClick={(e) => {
              e.preventDefault()
              changPage(pagination.current_page - 1)
            }}
            href="/"
            aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {
          [...new Array(pagination.total_pages)].map((_, i) => (
            <li className="page-item" key={`${i}_page`}>
              <a
                className={`page-link ${pagination.current_page === i + 1 ? 'active' : ''}`}
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  changPage(i + 1)
                }}
              >
                {i + 1}
              </a>

            </li>
          ))
        }
        <li className="page-item">
          <a
            className={`page-link
                  ${pagination.has_next ? '' : 'disabled'}
                 `}
            onClick={(e) => {
              e.preventDefault()
              changPage(pagination.current_page + 1)
            }}
            href="/"
            aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
