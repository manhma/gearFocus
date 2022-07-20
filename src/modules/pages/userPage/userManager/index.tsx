import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import { RootRouter } from '../../../../configs/router.config';
import { postRequest } from '../../../../services/apiServices';
import InputSelect from '../../../common/components/dropdown/InputSelect';
import MultiSelectPlus from '../../../common/components/dropdown/MultiSelectPlus';
import Footer from '../../../common/components/footerPage/Footer';
import DataTable from './components/tableUser/DataTable';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import './style.scss';
import { useSelector } from 'react-redux';
import { LIST_DATATYPE, LIST_MEMBERSHIP, LIST_STATUS } from '../../../../constants/filter.constants';
import PaginationComponent from '../../../common/components/pagination/PaginationComponent';
import Loading from '../../../common/components/loading/Loading';

type Props = {};

function UserPage({}: Props) {
    const navigate = useNavigate();
    const listUserType = useSelector((state: any) => state.userManage.role);
    const listCountry = useSelector((state: any) => state.userManage.country);

    const [isLoading, setIsLoading] = useState(true);
    const [recordsFiltered, setRecordsFiltered] = useState<number>(0);
    const [filter, setFilter] = useState<any>({
        address: '',
        count: 25,
        country: '',
        date_range: [],
        date_type: 'R',
        memberships: [],
        order_by: 'DESC',
        page: 1,
        phone: '',
        search: '',
        sort: 'last_login',
        state: '',
        status: [],
        types: [],
        tz: 7,
    });
    const [listUser, setListUser] = useState<any>([]);
    const [isShowHiddenFilter, setIsShowHiddenFilter] = useState(false);
    const [listState, setListState] = useState<any>([]);

    //selectUser
    const listSelectedUserAndDelete = listUser
        .filter((item: any) => item.selected === true)
        .map((item: any) => ({ id: item.profile_id, delete: 1 }));

    const handleSelectUser = (id: number) => {
        const newListUser = listUser.map((item: any) => {
            if (item.profile_id === id) {
                return {
                    ...item,
                    selected: !item.selected,
                };
            }
            return item;
        });
        setListUser(newListUser);
    };
    const handleSelectAllUser = (selectAllUser: boolean) => {
        if (selectAllUser) {
            const newListUser = listUser.map((item: any) => ({ ...item, selected: true }));
            setListUser(newListUser);
        } else {
            const newListUser = listUser.map((item: any) => ({ ...item, selected: false }));
            setListUser(newListUser);
        }
    };

    //DeleteUser
    const onDeleteUser = () => {
        const deleteUser = async () => {
            const res = await postRequest('apiAdmin/users/edit', { params: listSelectedUserAndDelete });
        };
        deleteUser();
        getUserList();
    };

    //dateRange
    const [dateRange, setDateRange] = useState<any>();

    const handleDateRange = (dates: any) => {
        setDateRange(dates);
        const newDates = dates.map((item: any) => item.toISOString().split('T')[0]);
        setFilter((prev: any) => ({ ...prev, date_range: newDates }));
    };

    //handleChangeFilter
    const handleChangeFilter = (key: string, value: any) => {
        setFilter({
            ...filter,
            [key]: value,
        });
    };

    //getUser
    const getUserList = async () => {
        const res = await postRequest('apiAdmin/users/list', filter);
        const newListUser = res.body.data.map((item: any) => {
            return { ...item, selected: false };
        });
        setListUser(newListUser);
        setRecordsFiltered(res.body.recordsFiltered);
        setIsLoading(false);
    };

    useEffect(() => {
        getUserList();
    }, [filter.count, filter.page]);

    useEffect(() => {
        const getState = async () => {
            const res = await postRequest('apiAdmin/commons/state', { code: filter.country });
            const states = res.body.data.map((item: any) => {
                return { ...item, id: item.state, name: item.state };
            });
            setListState(states);
        };
        if (filter.country) {
            getState();
        }
        //xoa state cu khi thay doi country
        if (filter.state) {
            setFilter((prev: any) => ({ ...prev, state: '' }));
        }
    }, [filter.country]);

    return (
        <div className="home-page">
            {isLoading ? <Loading isOpen={isLoading} /> : null}
            <h2>Search for users</h2>
            <div>
                <div className="wrapper-filter">
                    <Input
                        placeholder="Search keywords"
                        className="filter-item filter-input"
                        onChange={(e) => setFilter((prev: any) => ({ ...prev, search: e.target.value }))}
                    />
                    <div className="filter-item">
                        <MultiSelectPlus
                            placeholder="All membership"
                            dataSelect={LIST_MEMBERSHIP}
                            paramName="memberships"
                            handleChangeFilter={handleChangeFilter}
                        />
                    </div>
                    <div className="filter-item">
                        <MultiSelectPlus
                            placeholder="All user types"
                            dataSelect={listUserType}
                            paramName="types"
                            handleChangeFilter={handleChangeFilter}
                        />
                    </div>
                    <div className="filter-item">
                        <InputSelect
                            placeholder="Any status"
                            dataSelect={LIST_STATUS}
                            paramName="status"
                            setFilter={setFilter}
                        />
                    </div>
                    <div className="filter-item">
                        <Button className="btn-search" onClick={() => getUserList()}>
                            Search
                        </Button>
                    </div>
                </div>
                {isShowHiddenFilter && (
                    <div className="hidden-filter">
                        <div className="hidden-filter-left">
                            <div className="hidden-filter-item">
                                <label className="label-filter">Country</label>
                                <InputSelect
                                    dataSelect={listCountry}
                                    placeholder="Select Country"
                                    paramName="country"
                                    setFilter={setFilter}
                                />
                            </div>
                            <div className="hidden-filter-item">
                                <label className="label-filter">State</label>
                                {listState.length !== 0 ? (
                                    <InputSelect
                                        placeholder=""
                                        dataSelect={listState}
                                        paramName="state"
                                        setFilter={setFilter}
                                    />
                                ) : (
                                    <Input
                                        onChange={(e) => setFilter((prev: any) => ({ ...prev, state: e.target.value }))}
                                        className="filter-input"
                                    />
                                )}
                            </div>
                            <div className="hidden-filter-item">
                                <label className="label-filter">Address</label>
                                <Input
                                    onChange={(e) => setFilter((prev: any) => ({ ...prev, address: e.target.value }))}
                                    className="filter-input"
                                />
                            </div>
                            <div className="hidden-filter-item">
                                <label className="label-filter">Phone</label>
                                <Input
                                    onChange={(e) => setFilter((prev: any) => ({ ...prev, phone: e.target.value }))}
                                    className="filter-input"
                                />
                            </div>
                        </div>
                        <div className="hidden-filter-right">
                            <div className="filter-radio">
                                <label className="label-filter-right">User activity</label>
                                <div className="radio-wrapper">
                                    {LIST_DATATYPE.map((item: any) => (
                                        <div key={item.id}>
                                            <input
                                                type="radio"
                                                checked={filter.date_type === item.id}
                                                onChange={() =>
                                                    setFilter((prev: any) => ({ ...prev, date_type: item.id }))
                                                }
                                            />
                                            <label>{item.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label>Enter date range</label>
                                <DateRangePicker
                                    className="filter-input"
                                    onChange={(dates) => {
                                        console.log('dates: ', dates);
                                        handleDateRange(dates);
                                    }}
                                    value={dateRange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="arow-show-filter" onClick={() => setIsShowHiddenFilter(!isShowHiddenFilter)}>
                    {isShowHiddenFilter ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
                </div>
            </div>
            <Button className="add-btn" onClick={() => navigate(RootRouter.NEW_USER)}>
                Add User
            </Button>
            <DataTable
                listUser={listUser}
                handleSelectUser={handleSelectUser}
                handleSelectAllUser={handleSelectAllUser}
            />
            <PaginationComponent recordsFiltered={recordsFiltered} filter={filter} setFilter={setFilter} />
            <Footer>
                <Button color="warning" disabled={listSelectedUserAndDelete.length === 0} onClick={onDeleteUser}>
                    Remove selected
                </Button>
            </Footer>
        </div>
    );
}

export default UserPage;
