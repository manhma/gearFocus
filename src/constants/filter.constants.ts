//USER
export const LIST_MEMBERSHIP = {
    memberships: [{ name: 'General', id: 'M_4' }],
    pendingmemberships: [{ name: 'General', id: 'P_4' }],
};
export const LIST_STATUS = [
    { name: 'Enable', id: 'E' },
    { name: 'Disable', id: 'D' },
    { name: 'Unapproved vendor', id: 'U' },
];

export const LIST_DATATYPE = [
    { name: 'Register', id: 'R' },
    { name: 'Last logged in', id: 'L' },
];

//PRODUCT
export const LIST_STOCK_STATUS = [
    { id: 'all', name: 'Any stock status' },
    { id: 'in', name: 'In stock' },
    { id: 'low', name: 'Low stock' },
    { id: 'out', name: 'SOLD' },
];
export const LIST_AVAILABILITY_STATUS = [
    { id: 'all', name: 'Any availability status' },
    { id: '1', name: 'Only enabled' },
    { id: '0', name: 'Only disabled' },
];
export const LIST_SEARCH_TYPE = [
    { id: 'name', name: 'Name' },
    { id: 'sku', name: 'SKU' },
    { id: 'description', name: 'Full description' },
];
