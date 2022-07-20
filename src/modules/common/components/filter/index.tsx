import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import './Filter.scss';

type Props = {};

function Filter({}: Props) {
    const [isShowHiddenFilter, setIsShowHiddenFilter] = useState(false);
    return (
        <div>
            <div className="wrapper-filter">
                <Input placeholder="Search keywords" className="filter-item filter-input" />
            </div>
            {isShowHiddenFilter && <div className="hidden-filter"></div>}

            <div className="arow-show-filter" onClick={() => setIsShowHiddenFilter(!isShowHiddenFilter)}>
                {isShowHiddenFilter ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
            </div>
        </div>
    );
}

export default Filter;
