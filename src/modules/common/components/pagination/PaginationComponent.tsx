import { Pagination } from '@mui/material';
import React from 'react';
import './Pagination.scss';

function PaginationComponent(props: any) {
    const { recordsFiltered, setFilter, filter } = props;
    return (
        <div className="pagination">
            <Pagination
                count={Math.ceil(recordsFiltered / filter.count)}
                variant="outlined"
                shape="rounded"
                onChange={(e, page) => setFilter((prev: any) => ({ ...prev, page: page }))}
            />
            <strong className="pagination-item"> {recordsFiltered} </strong>
            <span className="pagination-item">item</span>
            <select
                className="pagination-item"
                value={filter.count}
                onChange={(e) => setFilter((prev: any) => ({ ...prev, count: e.target.value }))}
            >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
            </select>
            <span className="pagination-item">per page</span>
        </div>
    );
}

export default PaginationComponent;
